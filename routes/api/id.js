const mysql = require('../../middleware/mysql.js');

exports.route = {
    async get (data) {
        const { username } = data;
        const res = await this.db.execute('SELECT * FROM LATEST WHERE USERNAME = ?', [username]);
        return { id: res[0][0]['ID'] };
    }
};