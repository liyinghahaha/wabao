var  express=require('express');
var mongoose=require('mongoose');

//引用中间件
var bodyParser=require('body-parser');
var cookieParser=require('cookie-parser');

var pageRouter=require('./routers/pageRouter.js');
var apiRouter=require('./routers/apiRouter.js');
var adminRouter=require('./routers/adminRouter.js');
var adminapiRouter=require('./routers/adminapiRouter.js');

var port=3000;
var hostname='localhost';
var hostDB='mongodb://localhost:27017/wabao';


var app=express();


app.set('views','views');
app.set('view engine','ejs');//会识别ejs文件

app.use(express.static('public'));//让静态资源生效

//设置post数据的操作
app.use(bodyParser.json());//post接收到json格式的数据
app.use(bodyParser.urlencoded({extended:false}));//传输数据的类型，为false时代表传输的数据只能为字符串，true时代表数据格式为数组或对象等复杂格式

app.use(cookieParser());//引用cookie,cookie生效

//路由的调用
app.use('/',pageRouter);
app.use('/api',apiRouter);
app.use('/admin',adminRouter);
app.use('/admin/api',adminapiRouter);

//重定向，没有对应路由时，重定向到首页(路由的兼容处理)
app.use((req,res)=>{
	res.redirect('/index');
});


mongoose.connect(hostDB,(err)=>{
	if(err){
		console.log('数据库连接失败！');
	}else{
		console.log('数据库连接成功！')
		app.listen(port,hostname,(err)=>{
			if(err){
				console.log('服务器开启失败！');
			}else{
				console.log('服务器开启成功！');
			}
		});
	}
});


