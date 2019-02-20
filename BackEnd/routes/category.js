const router = require('koa-router')()
const {query}=require('./../mysql/connect.js');
const {ServerSuccess,ServerFail}=require('./../tools/sqlTools')

router.get('/getCategory', async (ctx, next) => {
  const res= await query(`select * from category`);
  if(res.length>0){
      ctx.body=ServerSuccess(res);
  } else{
    ctx.body=ServerFail('数据异常');
  }
})
router.get('/delCategory',async function(ctx){
  if( ctx.session.user!=undefined){
    if(ctx.session.user.isAdmin!==1){
        ctx.body=ServerFail("您没有权限!");
        return;
    }
  }
  const params=ctx.query;
  const sql=`delete from category where id=${params.id}`
  const res=await query(sql);
  if(res!==undefined){
    ctx.body=ServerSuccess(res)
  }else{
    ctx.body=ServerFail("数据异常")
  }
})
router.get('/addCategory',async function(ctx){
  if( ctx.session.user!=undefined){
    if(ctx.session.user.isAdmin!==1){
        ctx.body=ServerFail("您没有权限!");
        return;
    }
  }
  const params=ctx.query;
  const sql=`insert into category values(0,'${params.cateName}','${params.cateDesc}')`
  const res=await query(sql);
  if(res!==undefined){
    ctx.body=ServerSuccess(res)
  }else{
    ctx.body=ServerFail("数据异常")
  }
})
module.exports = router
