const mysql = require('../../middleware/mysql.js');

exports.route= {
    async get(data) {
        // console.log('???');
        const {username, password} = data;
        console.log(username, password)
        const ret = 
            await this.db.execute('SELECT * FROM PASSWORD WHERE USERNAME = ?', [username]);
        const correctPassWd = ret[0][0]['password'];
        console.log(correctPassWd);
        if (correctPassWd.toString() === password.toString())
            return { result: 'success' };
        else return { result: 'fail' };
    }
};