var express = require('express');
var router = express.Router();
//引入mysql连接
var connection = require('./connect')

/* GET home page. */
router.post('/accountadd',(req,res)=> {
  //解决跨域问题
  res.header('Access-Control-Allow-Origin','*')
  //接受前端发送的数据
  let{username,password,group} = req.body;
  console.log(username,password,group);
  sqlStr = `insert into account(username,password,usergroup) values('${username}','${password}','${group}')`

  connection.query(sqlStr,(err,data)=>{
    if(data.affectedRows>0){
      res.send({'error_code':0,'msg':'插入数据成功'})
    }else{res.send({'error_code':1,'msg':'插入数据失败'})}
  })
});
module.exports = router;