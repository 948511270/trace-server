let mongoose = require('mongoose')
let db = require('../config/db')
let Schema = mongoose.Schema

// 场景表
let SchemaScene = new Schema({
    longitude:{type:String},// 经度
    latitude:{type:String},// 纬度
    country:{type:String,default:'defaultCountry'},// 国家
    capital:{type:String,default:'defaultCapital'},// 首都
    placename:{type:String,default:'defaultPlace'},// 地名
    buffer:{type:Buffer},// 图片
})
let ModelScene = db.model('scene',SchemaScene)//根据Schema创建Model
module.exports = ModelScene//将Model暴露出去