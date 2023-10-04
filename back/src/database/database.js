const mysql = require('mysql2/promise');
const {databaseSecret} = require('../secretkey');
exports.pool = mysql.createPool(databaseSecret);