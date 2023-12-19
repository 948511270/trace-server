let multer = require('multer')
const upload = multer()

let addSceneController = require('../control/sceneController')
module.exports = function (app) {
    // 处理 FormData 中的所有字段
    app.post('/addScene',upload.any(), function(req, res, next) {
        // 处理上传的文件     
        let buffer = req.files[0].buffer; // 获取buffer 
        req.body.buffer = buffer//将buffer添加到req.body中作为一个新对象
        try {
            addSceneController.addScene(req.body)
        } catch (error) {
            console.log("addScene error",error);
        }

        res.send('Files uploaded successfully.');
        
    })

    // 处理 FormData 中的所有字段
    app.get('/getScene',function(req, res, next) {  
        try {
            addSceneController.getScene(res)
        } catch (error) {
            console.log("addScene error",error);
        }

        
        
    })
    
}

