var koa = require('koa');
var router = require('koa-router')();
var serve = require('koa-serve');
var path = require('path');
var fs = require('fs');

var app = koa();
var port = '18080';

app.name = 'util';

var calendarFile = path.resolve(__dirname,'./views/calendar.html');

app.use(serve('libs'));
app.use(serve('static'));  //---设置静态文件目录
app.use(router.routes(),router.allowedMethods());  //---设置路由

//---路由
router.get('/calendar',function* (next){  //---首页
	this.type = 'text/html; charset=utf-8';
	this.body = fs.readFileSync(calendarFile)
});

app.listen(port)