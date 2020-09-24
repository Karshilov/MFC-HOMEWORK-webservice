const mysql = require('../../middleware/mysql.js');

exports.route= {
    async get(data) {
        const { username, status } = data;
        // console.log(data);
        const cur = await this.db.execute("SELECT * FROM LATEST WHERE username = ?", [username]);
        // console.log(cur[0][0]['DELETED']);
        if (cur[0][0]['DELETED'].toString() === status.toString()) {
            return { result: 'repeat' };
        }
        const res = await this.db.execute("UPDATE LATEST SET DELETED = ? WHERE USERNAME = ?", [status, username]);
        const lost = await this.db.execute("UPDATE PASSWORD SET lost = ?, lost_time = ? WHERE username = ?", [status, (Date.parse(new Date()) / 1000), username]);
        return { result: 'success' };
    }
};