var mysql  = require('mysql'); 

let mysqlLink = function (json_a){

var connection = mysql.createConnection({     
host     : 'localhost',       
user     : 'root',              
password : '123456',       
port: '3306',                   
database: 'banner', 
}); 
connection.connect();
let json = json_a;
    console.log(json)

    var  addSql = 'INSERT INTO socketiotest(Id,name,sex,personal_intro) VALUES(0,?,?,?)';
    var  addSqlParams = [json.username,json.sex,json.in];
    //增
    connection.query(addSql,addSqlParams,function (err, result) {
            if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
            }   
            console.log('--------------------------INSERT----------------------------');
            //console.log('INSERT ID:',result.insertId);        
            console.log('INSERT ID:',result);        
            console.log('-----------------------------------------------------------------\n\n');  
        });

connection.end();
}

module.exports = mysqlLink;


