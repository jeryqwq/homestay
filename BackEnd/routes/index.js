const router = require('koa-router')()
const {query}=require('./../mysql/connect.js');
const {ServerSuccess,ServerFail}=require('./../tools/sqlTools')
router.get('/addStatus', async (ctx) => {
  if( ctx.session.user==undefined){
    ctx.body=ServerFail("权限异常")
    return;}
  const params = ctx.query;
  const sql=`insert into status values(0,${params.uId},${params.cartId},'${params.Time}',${params.count})`
  const res=await query(sql);
  if(res!==undefined){
    ctx.body=ServerSuccess(res)
  } else{
    ctx.body=ServerFail("数据异常")
  }
})

router.get('/getStatus', async (ctx) => {
  if( ctx.session.user===undefined){
    ctx.body=ServerFail("权限异常")
    return;}
    const sql=`select * from status where uId=${ctx.session.user.id}`
    const res= await query(sql);
    if(res!==undefined){
      ctx.body=ServerSuccess(res)
    }else{
      ctx.body=ServerFail("数据异常")
    }
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
