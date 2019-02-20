var mysql      = require('mysql');
var pool  = mysql.createPool({
    host      : 'localhost',
    user      : 'root', 
    password  : 'root',
    port      : 3333,//家用笔记本
    // port      : 3306,//单位
    // password  : '123456',
    database  : 'zidan',
});
var query=function(sql){
  console.log(sql)
    return new Promise((res)=>{
        pool.getConnection(function(err,conn){
            if(err){
                callback(err,null,null);
            }else{
                conn.query(sql,function(qerr,vals,fields){
                    //释放连接
                    // console.log(vals)
                    conn.release();
                    res(vals)
                });
            }
        });
    })  
};

// query("SELECT * FROM user").then((result) => {
//     console.log(result);
// })
// async function wait(){
//     const v1 =await query("SELECT * FROM user");
//     console.log(v1)
// }
// wait();
// connection.connect();
// function queryData(sql,fn){
//   connection.query('SELECT * FROM mmall_user', function (error, results) {
//     if (error) throw error;
//     fn(results);
//   });
// }

module.exports={
  query
}
