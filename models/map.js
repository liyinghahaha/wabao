var mongoose=require('mongoose');
var mapSchema=require('../schemas/maps.js');

module.exports=mongoose.model('Map',mapSchema);//第一个参数为数据库的表名，第二个为schema