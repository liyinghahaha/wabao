var express=require('express');
var User=require('../models/user.js');
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
	User.findOne({
		username:username
	}).then((userinfo)=>{//userinfo查询到的内容
				if(userinfo){//用户注册过了
			res.send('<script>alert("用户名已注册");history.back();</script>');
		}else{//用户没有注册过
			new User({
				username:username,
				password:password
			}).save().then((userinfo)=>{
				res.send('<script>alert("注册成功");window.location.href="/login";</script>');
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

	User.findOne({
		username:username,
		password:password
	}).then((userInfo)=>{
		if(userInfo){
			var date=new Date();
			date.setDate(date.getDate()+5);//cookie的过期时间

			res.cookie('userInfo',JSON.stringify({
				_id:userInfo._id
			}),{expires:date});
			res.send('<script>alert("登陆成功");window.location.href="/index";</script>');
		}else{
			res.send('<script>alert("用户名或密码不正确");history.back();</script>');
		}
	})
});


//抽奖功能
router.get('/winning',(req,res)=>{
	var _id=req.query._id;

	Map.update({
		_id:_id
	},{$set:{isCheck:true}}).then((mapInfo)=>{
		if(mapInfo){
			Good.find({}).then((goodsInfo)=>{
				//console.log(typeof goodsInfo);
				var arr=[];
				var obj={};
				var randomGood;
				goodsInfo.forEach((item)=>{
					//console.log(item);
					//var good=item.good;
					//var chance=item.chance;

					//obj.good=good;
					//obj.chance=chance;

					arr.push(item);

					console.log(arr);

					
				});

				getWinning(arr);
				function getWinning(arr){

						var result = [];
						var count = 0;
						var nowNumber = Math.random();
						for(var i=0;i<arr.length;i++){
							count += (arr[i].chance)/100;
							result.push(count);
						}

						console.log( result );

						for(var i=0;i<result.length;i++){
							console.log( 111 );
							if(i==0){
								if(nowNumber <= result[i]){
									randomGood=arr[i].good;
									console.log(randomGood);
								}
							}
							else{
								if( nowNumber > result[i-1] && nowNumber <= result[i] ){
									randomGood=arr[i].good;
									console.log(randomGood);
								}
							}
						}

					

				}
				
				
				


			res.send(JSON.stringify({
				code:0,
				good:randomGood
			}));
		});
			
		}
	});
});


module.exports=router;