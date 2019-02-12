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

// 通过字面量方式实现的函数each
var each =  function(object, callback){
    var type = (function(){
            switch (object.constructor){
              case Object:
                  return 'Object';
                  break;
              case Array:
                  return 'Array';
                  break;
              case NodeList:
                  return 'NodeList';
                  break;
              default:
                  return 'null';
                  break;
          }
      })();
      // 为数组或类数组时, 返回: index, value
      if(type === 'Array' || type === 'NodeList'){
          // 由于存在类数组NodeList, 所以不能直接调用every方法
          [].every.call(object, function(v, i){
              return callback.call(v, i, v) === false ? false : true;
          });
      }
      // 为对象格式时,返回:key, value
      else if(type === 'Object'){
          for(var i in object){
              if(callback.call(object[i], i, object[i]) === false){
                  break;
              }
          }
      }
  }

  each(json,function(i,n){
    var  addSql = 'INSERT INTO index2(Id,mainColor,url) VALUES(0,?,?)';
    var  addSqlParams = [n.mainColor,n.add];
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

  });
connection.end();
}

module.exports = mysqlLink;


