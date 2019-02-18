var express = require('express');
var router = express.Router();
//引入mysql连接
var connection = require('./connect')
const jwt = require('jsonwebtoken')
//检测账号
router.post('/', (req, res) => {

    //解决跨域问题
    res.header('Access-Control-Allow-Origin', '*')
    //获取前端发过来的账号和密码
    let {
        username,
        password
    } = req.body

    //sql语句
    let sqlStr = `select * from account where username='${username}' and password='${password}'`
    //执行sql
    connection.query(sqlStr, (err, data) => {

        if (err) throw err
        if (!data.length) {
            res.send({
                'error_code': 1,
                'msg': '该用户不存在'
            })
        } else {
            //这个时候得到的不是真数组,而是RowDataPacket 需要json进行转换
            let datastr = JSON.stringify(data[0]) //得到字符串
            let usersdata = JSON.parse(datastr) //讲字符串转换为数组
            let usertoken = jwtm(usersdata.username)
            //构建一个新的对象
            let parms = {
                'username': usersdata.username,
                'password': usersdata.password,
                'usergroup': usersdata.usergroup,
                'token': usertoken
            }
            res.send(parms)
        }


    })

})

//创建token
//登录时：核对用户名和密码成功后，应用将用户的id（图中的user_id）作为JWT Payload的一个属性
let jwtm = function (username) {
    const token = jwt.sign({
        username: username
    }, 'sinner77', {
        expiresIn: '3600s' //过期时间设置为60妙。那么decode这个token的时候得到的过期时间为 : 创建token的时间 +　设置的值
    });
    return token;
};


//暴露路由
module.exports = router