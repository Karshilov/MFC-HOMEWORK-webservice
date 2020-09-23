const mysql = require('../../../middleware/mysql.js');

exports.route= {
    async get(data) {
        console.log(data);
        const {username, password, address, balance, interest, type, lost, lostTime, clerkNumber} = data;
        await this.db.execute('INSERT INTO PASSWORD (username, password, address, balance, interest, type, lost, lost_time, clerk_number) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)'
        , [username, password, address, balance, interest, type, lost, lostTime, clerkNumber]);
        const check = await this.db.execute('SELECT * FROM PASSWORD WHERE USERNAME = ?', [username]);
        if (check[0][0]['password'] === password) return { result: 'success' };
        else return { result: 'fail' };
    }
};