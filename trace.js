const express = require('express')
const app = express()
const port = 3000

//设置跨域请求
app.all('*', function (req, res, next) {
    //设置请求头
    //允许所有来源访问
    res.header('Access-Control-Allow-Origin', '*')
    //用于判断request来自ajax还是传统请求
    res.header("Access-Control-Allow-Headers", " Origin, X-Requested-With, Content-Type, Accept");
    //允许访问的方式
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    //修改程序信息与版本
    res.header('X-Powered-By', ' 3.2.1')
    //内容类型：如果是post请求必须指定这个属性
    res.header('Content-Type', 'application/json;charset=utf-8')
    next()
  })

require('./routes/sceneRoute')(app)
app.get('/',(req,res) => {
    res.send('hello express')
})

app.use((req, res, next) => {
    let err = new Error('404 Not Found');
    err.status = 404;
    next(err.status);
});

app.listen(port, ()=>{
    console.log(`服务已启动，端口 ${port} 正在监听中`);
})