var mongoose=require('mongoose');
var goodSchema=require('../schemas/goods.js');

module.exports=mongoose.model('Good',goodSchema);//第一个参数为数据库的表名，第二个为schema