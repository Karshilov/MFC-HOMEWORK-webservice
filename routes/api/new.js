const mysql = require('../../middleware/mysql.js');

exports.route= {
    async get(data) {
        // console.log(data);
        const {id, count, type, date, clerkNumber, username} = data;
        const freezed = await this.db.execute("SELECT * FROM LATEST WHERE username = ?", [username]);
        if (freezed[0][0]['DELETED']) {
            return { result: 'freezed' };
        }
        try {
            await this.db.execute('INSERT INTO BUSINESS (ID, COUNT, TYPE, DATE, CLERK_NUMBER, USERNAME) VALUES(?, ?, ?, ?, ?, ?)'
            , [id, Number(count), type, date, clerkNumber, username]);
            const pid = await this.db.execute('SELECT * FROM LATEST WHERE USERNAME = ?', [username]);
            let past = Date.parse(new Date()) / 1000;
            if (pid[0][0]["ID"] !== '') {
                const latest = await 
                    this.db.execute('SELECT * FROM BUSINESS WHERE ID = ?', [pid[0][0]['ID']]);
                past = latest[0][0]['DATE'];
            }
            await this.db.execute('UPDATE LATEST SET ID = ? WHERE USERNAME = ?', [id, username]);
            if (type == 0) {
                const ret = await this.db.execute('SELECT * FROM PASSWORD WHERE USERNAME = ?', [username]);
                const cur = Date.parse(new Date()) / 1000;
                const newBalance = ret[0][0]['balance'] * Math.pow((1.0 + ret[0][0]['interest']), (cur - past) / (3600 * 24));
                await this.db.execute('UPDATE PASSWORD SET BALANCE = ? WHERE USERNAME = ?', [Number(count) + newBalance, username]);
            } else if (type == 1) {
                const ret = await this.db.execute('SELECT * FROM PASSWORD WHERE USERNAME = ?', [username]);
                const cur = Date.parse(new Date()) / 1000;
                const newBalance = ret[0][0]['balance'] * Math.pow((1.0 + ret[0][0]['interest']), (cur - past) / (3600 * 24));
                if (newBalance < count) return { result: 'fail' };
                await this.db.execute('UPDATE PASSWORD SET BALANCE = ? WHERE USERNAME = ?', [newBalance - Number(count), username]);
            }
        } catch (e) {
            throw e;
        }
        return { result: 'success' };
    }
};