const router = require('koa-router')();
const {query}=require('./../mysql/connect.js');
const {ServerSuccess,ServerFail}=require('./../tools/sqlTools')

router.get('/login',async function (ctx) {
  const res=await  query(`SELECT * FROM user where name='${ctx.query.name}' and pwd='${ctx.query.pwd}'`)
  if(res.length>0){
    ctx.session.user=res[0];
    ctx.body={data:ServerSuccess(res)};
  }else{
    ctx.body={data:ServerFail("登录失败，请尝试重新登录")}
  }
  })
  
router.get('/register',async function (ctx) {
  const params=ctx.query
  const res=await query(`insert into user values(0,'${params.name}','${params.pwd}','${params.phone}','${params.email}',0)`)
  ctx.body = res;
})

router.get('/autoLogin', function (ctx) {
  if( ctx.session.user!=undefined){
    
    ctx.body={data:ServerSuccess(ctx.session.user)};
  }else{
    ctx.body={data:ServerFail("session过期或者不存在")}
  }
})
router.get('/logout', function (ctx) {
  if( ctx.session.user!=undefined){
    ctx.session.user=undefined;
    ctx.body={data:ServerSuccess("注销成功")};
  }else{
    ctx.body={data:ServerFail("注销失败")}
  }
})
router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
