const mysql = require('../../middleware/mysql.js');

exports.route = {
    async get(data) {
        const { username } = data;
        const id = await this.db.execute('SELECT * FROM LATEST WHERE USERNAME = ?', [username]);
        if (id[0][0]['ID'] === '') {
            return { result: [] };
        }
        const latest = await 
            this.db.execute('SELECT * FROM BUSINESS WHERE ID = ?', [id[0][0]['ID']]);
        const res = await 
            this.db.execute('SELECT * FROM BUSINESS WHERE USERNAME = ? AND DATE <= ?', 
            [username, latest[0][0]['DATE']]);
        // console.log(res[0][0]);
        return { result: res[0] };
    }
}