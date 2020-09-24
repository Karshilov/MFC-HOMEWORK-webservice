const mysql = require('../../middleware/mysql.js');

exports.route= {
    async get(data) {
        // // console.log('???');
        const {username, password} = data;
        // console.log(username, password)
        const ret = 
            await this.db.execute('SELECT * FROM PASSWORD WHERE USERNAME = ?', [username]);
        if (ret[0][0] === undefined) {
            return { result: 'unregister' };
        }
        const correctPassWd = ret[0][0]['password'];
        // console.log(correctPassWd);
        const frz = await this.db.execute("SELECT * FROM LATEST WHERE USERNAME = ?", [username]);
        if (correctPassWd.toString() === password.toString()) {
            if (!!!frz[0][0]['DELETED']) return { result: 'success' };
            else return { result: 'freezed' };
        }
        else return { result: 'fail' };
    }
};