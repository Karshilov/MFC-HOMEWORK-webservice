const mysql = require('../../middleware/mysql.js');

exports.route= {
    async get(data) {
        // // console.log(data);
        const {username, password, address, balance, interest, type, lost, lostTime, clerkNumber} = data;
        const rep = await this.db.execute("SELECT * FROM PASSWORD WHERE USERNAME = ?", [username]);
        // console.log(rep[0].length);
        if (rep[0].length != 0) {
            // // console.log("???");
            return { result: 'repeat' };
        }
        await this.db.execute('INSERT INTO PASSWORD (username, password, address, balance, interest, type, lost, lost_time, clerk_number) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)'
        , [username, password, address, balance, interest, type, lost, lostTime, clerkNumber]);
        await this.db.execute('INSERT INTO LATEST (USERNAME, ID, DELETED) VALUES(?, ?, ?)', 
        [username, '', 0]);
        const check = await this.db.execute('SELECT * FROM PASSWORD WHERE USERNAME = ?', [username]);
        if (check[0][0]['password'] === password) return { result: 'success' };
        else return { result: 'fail' };
    }
};