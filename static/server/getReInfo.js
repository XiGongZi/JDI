var mysql  = require('mysql'); 

let mysqlLinkSea = function (a){
let kda = '';
var connection = mysql.createConnection({     
host     : 'localhost',       
user     : 'root',              
password : '123456',       
port: '3306',                   
database: 'banner', 
}); 
connection.connect();

connection.query('SELECT * from index2 where mainColor="'+a.data+'"', function(err, result) {
    if (err) throw err;
    var dataString = JSON.stringify(result);
    var data = JSON.parse(dataString);
    a.fun(data);
})
connection.end();

return kda;
}
module.exports = mysqlLinkSea;
