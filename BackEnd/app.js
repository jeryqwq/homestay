const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-session');
const koaBody = require("koa-body")
const static = require('koa-static')
const path = require('path')

const story=require('./routes/story')
const index = require('./routes/index')
const users = require('./routes/users')
const category=require('./routes/category')
const fileupload=require('./routes/fileupload')
const product=require('./routes/product')
const admin=require('./routes/admin')
// session配置
app.keys = ['zidan'];
const CONFIG = {
   key: 'koa:sess',   //cookie key (default is koa:sess)
   maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
   overwrite: true,  //是否可以overwrite    (默认default true)
   httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
   signed: true,   //签名默认true
   rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
   renew: false,  //(boolean) renew session when session is nearly expired,
};
// 文件上传配置
app.use(koaBody({
  multipart:true,
  formidable:{
  maxFileSize:2000*1024*1024
  }
})
)
app.use(static(
  path.join( __dirname,  './upload')
))

app.use(session(CONFIG, app));
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(category.routes(), category.allowedMethods())
app.use(fileupload.routes(), fileupload.allowedMethods())
app.use(product.routes(), product.allowedMethods())
app.use(admin.routes(),admin.allowedMethods())
app.use(story.routes(),story.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
