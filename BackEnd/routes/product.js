const router = require('koa-router')()
const {query}=require('./../mysql/connect.js');
const {ServerSuccess,ServerFail}=require('./../tools/sqlTools')
var moment = require('moment');

router.get('/addProduct', async (ctx, next) => {
  const params = ctx.query;
  const sql=`insert into cartinfo values(0,
${params.cateId},'${params.pingpai}','${params.title}','${params.desc}',${params.status},${params.price},'${params.img}','${params.subImgs}','${params.richText}',0,'${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}')`
  const res=await query(sql);
  if(res){
    ctx.body=ServerSuccess(res)
  }else{
    ctx.body=ServerFail("数据插入失败！！！")
  }
})
//参数:where:查询条件 pageSize:页面大小  pageNum:第几页 orderBy排序方式
router.get('/getProduct',async(ctx)=>{
  const params =ctx.query;
  let sql;
  sql=`select id,pingpai,title,`+"`desc`"+`,status,price,img,review from cartinfo
  where ${params.where} ${ctx.session.user===undefined||ctx.session.user.isAdmin===0?'and status = 1':''}
  order by ${params.orderBy} 
  limit ${params.pageSize*(params.pageNum-1)},${params.pageSize}`
  const res=await query(sql);
  const total=await query(`select count(*) from cartinfo where ${params.where} 
  ${ctx.session.user===undefined||ctx.session.user.isAdmin===0?'and status = 1':''}
  order by ${params.orderBy} `)
  if(res.length>0){
    ctx.body=ServerSuccess(res);
    ctx.body.total=total[0]["count(*)"];
  }else{
    ctx.body=ServerFail("查询结果为空")
  }
})


router.get("/getProductById",async(ctx)=>{
  const params=ctx.query;
  const sql=`select *  from cartinfo where id=${params.id}`;
  const res=await query(sql)
  if(res!==undefined){
    ctx.body=ServerSuccess(res[0])
  }else{
    ctx.body=ServerFail("查询结果为空")
  }
})
router.get("/addReview",async(ctx)=>{
  const params=ctx.query;
  const sql=`update cartinfo set review=review+1  where id=${params.id}`;
  const res=await query(sql)
  if(res!==undefined){
    ctx.body=ServerSuccess(res[0])
  }else{
    ctx.body=ServerFail("执行失败")
  }
})

module.exports = router
