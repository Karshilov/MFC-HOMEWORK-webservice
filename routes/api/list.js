const mysql = require('../../middleware/mysql.js');

exports.route= {
    async get() {
        const all = await this.db.execute("SELECT * FROM PASSWORD WHERE USERNAME <> 'root'");
        console.log(all[0]);
        return {result: all[0]};
    }
};