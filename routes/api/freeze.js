const mysql = require('../../middleware/mysql.js');

exports.route= {
    async get(data) {
        const { username, state } = data;
        const res = await this.db.execute("UPDATE LATEST SET DELETED = ? WHERE USERNAME = ?", [state, username]);
        return { result: 'success' };
    }
};