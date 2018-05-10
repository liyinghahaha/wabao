var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var goodSchema=new Schema({
	good:String,
	chance:String
});

module.exports=goodSchema;