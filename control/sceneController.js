let dbserver = require('../dao/dbDao')

// 添加场景
exports.addScene = function(req,res){
    dbserver.addScene(req)
}

// 获取场景
exports.getScene = function(req,res){
    dbserver.getScene(req)
}