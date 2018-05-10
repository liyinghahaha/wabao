var express=require('express');
var Map=require('../models/map.js');
var Good=require('../models/good.js');
var router=express.Router();

router.get('/index',(req,res)=>{
	isSkipLogin(req,res);
	Good.find({}).then((goodsInfo)=>{
		var arr;
		if(goodsInfo){
			arr=goodsInfo;
			console.log(goodsInfo);
		}
		else{
			arr;
			console.log(22222);
		}
		res.render('admin',{
				title:'挖宝后台页',
				goods: arr
			});
		console.log(arr);
		console.log(typeof(arr));
	});
	
});


router.get('/login',(req,res)=>{
	res.render('admin_login',{
		title:'挖宝后台登录页'
	});
});

router.get('/reg',(req,res)=>{
	
	res.render('admin_reg',{
		title:'挖宝后台注册页'
	});
});

function isSkipLogin(req,res){
	if(!req.cookies.userInfo){
		res.redirect('/admin/login');
		return;
	}
}

module.exports=router;