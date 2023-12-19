// 集合：mysql表，js数组；文档：mysql一行数据，js对象
let mongoose = require('mongoose')

let db = mongoose.createConnection('mongodb://localhost:27017/trace')

db.on('error', console.error.bind(console,'connection error:'))
db.once('open',function(){
    console.info('数据库打开成功！');
})

module.exports = db;