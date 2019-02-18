var express = require('express');
var router = express.Router();
//引入mysql连接
var connection = require('./connect')

//账号添加

router.post('/accountadd', (req, res) => {
  //解决跨域问题
  res.header('Access-Control-Allow-Origin', '*')
  //接受前端发送的数据
  let {
    username,
    password,
    group
  } = req.body;
  console.log(username, password, group);
  sqlStr = `insert into account(username,password,usergroup) values('${username}','${password}','${group}')`

  connection.query(sqlStr,(err,data)=>{
    if (err) throw err
    if(data.affectedRows>0){
      res.send({'error_code':0,'msg':'插入数据成功'})
    }else{res.send({'error_code':1,'msg':'插入数据失败'})}
  })
});

//账号列表
router.get('/accountlist', (req, res) => {
  //解决跨域问题
  res.header('Access-Control-Allow-Origin', '*')
  //sql 语句
  var sqlStr = `select * from account`
  //执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err
    res.send(data)
  })
});

// 删除账号
router.get('/accountdel',(req,res)=>{
 //解决跨域问题
 res.header('Access-Control-Allow-Origin', '*')
//  接收id
 let {id} = req.query;
 // 根据id 执行删除
  // 构造删除数据的sql语句
  const sqlStr= `delete from account where id=${id}`;
  connection.query(sqlStr,(err,data)=>{
    if(err)throw err;
    // 根据删除结果判断
    if(data.affectedRows>0){
      res.send({
        'error_code': 0,
        'msg': '删除数据成功'
      })
    }else{
      res.send({
        'error_code': 1,
        'msg': '删除数据失败'
      });
    }
  })
})

//账号回显
router.get('/accountedit',(req,res)=>{
  res.header('Access-Control-Allow-Origin','*')
  let currentid = req.query.id
  //根据id 去数据库查询
  let sqlStr = `select * from account where id=${currentid}`
  //执行sql语句
  connection.query(sqlStr,(err,data)=>{
    if(err) throw err
    res.send(data[0])
  })
})

//账号编辑确认
router.post('/accounteditconfirm',(req,res)=>{
  res.header('Access-Control-Allow-Origin','*')
  let{id,username,usergroup} = req.body
  //sql 语句
  let sqlStr = `update account set username='${username}',usergroup='${usergroup}' where id=${id}`
  console.log(sqlStr)
  connection.query(sqlStr,(err,data)=>{
    if (err) throw err
    if (data.affectedRows>0){
      res.send({'error_code':0,'msg':'修改账号成功'})
    }else{
      res.send({'error_code':1,'msg':'修改账号失败'})
    }
  })
})


//删除账号
router.get('/accountdel',(req,res)=>{
  //解决跨域问题
  res.header('Access-Control-Allow-Origin', '*')
 //  接收id
  let {id} = req.query;
  // 根据id 执行删除
   // 构造删除数据的sql语句
   const sqlStr= `delete from account where id=${id}`;
   connection.query(sqlStr,(err,data)=>{
     if(err)throw err;
     // 根据删除结果判断
     if(data.affectedRows>0){
       res.send({
         'error_code': 0,
         'msg': '删除数据成功'
       })
     }else{
       res.send({
         'error_code': 1,
         'msg': '删除数据失败'
       });
     }
   })
 })

//  批量删除
router.get('/batchDelete',(req,res)=>{
  //解决跨域问题
  res.header('Access-Control-Allow-Origin', '*')
  let {selectedId} =req.query;
  // 构造sql语句
  const sqlStr = `delete from account where id in (${selectedId})`;
  connection.query(sqlStr,(err,data)=>{
    if(err) throw err;
    if(data.affectedRows>0){
      res.send({"error_code": 0, "reason":"批量删除成功"})
    }else{
      res.send({"error_code": 1, "reason":"批量删除失败"})
    }
  })
})
module.exports = router;