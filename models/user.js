var mongoose=require('mongoose');
var userSchema=require('../schemas/users.js');

module.exports=mongoose.model('User',userSchema);//第一个参数为数据库的表名，第二个为schema