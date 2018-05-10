var express=require('express');
var Manager=require('../models/manager.js');
var Map=require('../models/map.js');
var Good=require('../models/good.js');
var router=express.Router();

//注册
router.post('/reg',(req,res)=>{

	//如果是get请求传递过来的数据
	//req.query
	//如果是post请求传递过来的数据
	//req.body（需要第三方中间件body-parser）
	//console.log(req.body);
	var username=req.body.username;
	var password=req.body.password;
	var password2=req.body.password2;

	if(username===''){
		res.send('<script>alert("用户名不能为空");history.back();</script>');
		return;
		//history.back()在js中代表返回前一页
	}else if(password===''||password2===''){
			res.send('<script>alert("密码不能为空");history.back();</script>');
			return;
	}else if(password!==password2){
			res.send('<script>alert("两次密码不一样");history.back();</script>');
			return;
	}

	//findOne从数据库中查询一条满足条件的信息
	Manager.findOne({
		username:username
	}).then((userinfo)=>{//userinfo查询到的内容
				if(userinfo){//用户注册过了
			res.send('<script>alert("用户名已注册");history.back();</script>');
		}else{//用户没有注册过
			new Manager({
				username:username,
				password:password
			}).save().then((userinfo)=>{
				res.send('<script>alert("注册成功");window.location.href="/admin/login";</script>');
			})
		}
	});

});


//登陆
router.post('/login',(req,res)=>{
	var username=req.body.username;
	var password=req.body.password;

	if(username===''){
		res.send('<script>alert("用户名不能为空");history.back();</script>');
	}else if(password===''){
		res.send('<script>alert("密码不能为空");history.back();</script>');
	}

	Manager.findOne({
		username:username,
		password:password
	}).then((userInfo)=>{
		if(userInfo){
			var date=new Date();
			date.setDate(date.getDate()+5);//cookie的过期时间

			res.cookie('userInfo',JSON.stringify({
				_id:userInfo._id
			}),{expires:date});
			res.send('<script>alert("登陆成功");window.location.href="/admin/index";</script>');
		}else{
			res.send('<script>alert("用户名或密码不正确");history.back();</script>');
		}
	})
});


//创建宝箱
router.get('/createMap',(req,res)=>{
	var number=req.query.number;
	//console.log(number);
	Map.remove({}).then(()=>{
		for(var i=0;i<number;i++){
			new Map({
				isCheck:false
			}).save().then();
		}
		res.send(JSON.stringify({
			code:0
		}));
	});
	
	
});


//添加奖品
router.get('/addGoods',(req,res)=>{
	var good=req.query.good;
	var chance=req.query.chance;
	//console.log(number);
	
	Good.findOne({}).then((goodsInfo)=>{
		
			new Good({
				good:good,
				chance:chance
			}).save().then((goodsInfo)=>{
				if(goodsInfo){
					res.send(JSON.stringify({
						code:0
					}));
				}

			})
		

	})
	
});


//删除奖品
router.get('/removeGoods',(req,res)=>{
	var good=req.query.good;
	//console.log(number);
	Good.findOne({}).then((goodsInfo)=>{
		var good=goodsInfo.good;
		Good.remove({goods:good});
		
		Good.update({},{$set:{goods:good}}).then((goodsInfo)=>{
			if(goodsInfo){
				res.send(JSON.stringify({
					code:0
				}));
			}

		});;
			
		
		
	});
	
	
});


module.exports=router;