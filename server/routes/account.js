var express = require('express');
var router = express.Router();
//引入mysql连接
var connection = require('./connect')

// 统一设置响应头 解决跨域问题
router.all('*', (req, res, next) => {
  // 设置响应头 解决跨域(目前最主流的方式)
  // 允许的域
  res.header('Access-Control-Allow-Origin', '*');
  // 允许的请求头
  res.header("Access-Control-Allow-Headers", "authorization");
  next();
})

//账号添加
// console.log(router)
router.post('/accountadd', (req, res) => {
  //接受前端发送的数据
  let{username,password,group} = req.body;
  console.log(username,password,group);
  let sqlStr = `insert into account(username,password,usergroup) values('${username}','${password}','${group}')`
  console.log(sqlStr)
  connection.query(sqlStr,(err,data)=>{
    if (err) throw err
    if(data.affectedRows>0){
      res.send({'error_code':0,'msg':'插入数据成功'})
    }else{res.send({'error_code':1,'msg':'插入数据失败'})}
  })
});

//账号列表 直接使用分页代码.
// router.get('/accountlist', (req, res) => {
//   //解决跨域问题
//   res.header('Access-Control-Allow-Origin', '*')
//   //sql 语句
//   var sqlStr = `select * from account`
//   //执行sql语句
//   connection.query(sqlStr, (err, data) => {
//     if (err) throw err
//     res.send(data)
//   })
  
// })

 //分页
router.get('/pages',(req,res)=>{
 //接收前端
 let page = req.query.page
 let size = req.query.size
//  console.log(page,size)
 // 默认值
  size = size ? size : 20;
  page = page ? page : 1;
 //构造sql 
 let sqlStr = `select * from account order by ctime desc`;
 
 console.log(sqlStr)
 //执行sql
 connection.query(sqlStr,(err,data)=>{
   if(err) throw err
   let total =data.length

   //构造查询公式
   let n = (page-1)*size
   // 拼接分页的sql语句
   sqlStr += ` limit ${n}, ${size}`;
   connection.query(sqlStr,(err,data)=>{
     if (err) throw err
     res.send({
       total,data
     })
   })
 })
});

// 删除账号
router.get('/accountdel',(req,res)=>{
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

// 验证旧密码是否正确
router.get('/checkOldPwd',(req,res)=>{
  // 接收旧密码 
  let {oldPwd,username}=req.query;
  console.log(req.query);
  // 构造sql
  const sqlStr = `select * from account where username='${username}' and password='${oldPwd}'`;
console.log(sqlStr);

  // 执行sql
  connection.query(sqlStr,(err,data)=>{
    if(err) throw err;
    if(data.length){
      res.send({"error_code": 0, "reason":"旧密码正确!"});
    }else{
      res.send({"error_code": 1, "reason":"旧密码错误!"});
    }
  })
})

// 保存新密码
router.post('/savenewpwd',(req,res)=>{
    // 接收参数
  let {username, Oldpwd, Newpwd} = req.body;
  // 构造sql
  const sqlStr=`update account set password='${Newpwd}' where username='${username}' and password='${Oldpwd}'`;
  // 执行sql
  connection.query(sqlStr,(err,data)=>{
    if(err)throw err;
    if(data.affectedRows>0){
       // 成功
       res.send({"error_code": 0, "reason":"密码修改成功!请重新登录!"})
    }else{
       // 成功
       res.send({"error_code": 1, "reason":"密码修改失败"})
    }
  })

})
module.exports = router;