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
router.get('/addOrder',async function (ctx) {
  if( ctx.session.user==undefined){
    ctx.body={data:ServerFail("未登录")}
    return;
  }
 else{
  const params=ctx.query;
  const sql =` insert into `+"`"+'order'+"`"+` values(0,'${params.homeId}','${params.userId}','${params.other}','${params.startTime}','${params.endTime}')`
  const res=await query(sql);
  ctx.body=ServerSuccess(res);
 }
})
router.get("/getOrders",async function(ctx){
  if( ctx.session.user==undefined){
    ctx.body={data:ServerFail("未登录")}
    return;
  }
  const sql ="select o.id as orderId, title,img,startTime,endTime,other from `order` o ,homeinfo h where  o.homeId=h.id  and userId= "+ctx.session.user.id
  const res=await query(sql);
  ctx.body=ServerSuccess(res);
})
router.get("/delOrder",async function(ctx){
  if( ctx.session.user==undefined){
    ctx.body={data:ServerFail("未登录")}
    return;
  }
  const params=ctx.query;
  const sql =`delete from `+"`"+'order'+"`"+ `where id= ${params.id}`
  const res=await query(sql);
  ctx.body=ServerSuccess(res);
})
module.exports = router
