var mongoose=require('mongoose');
var managerSchema=require('../schemas/managers.js');

module.exports=mongoose.model('Manager',managerSchema);//第一个参数为数据库的表名，第二个为schema