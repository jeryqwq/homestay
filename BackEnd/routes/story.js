const router = require('koa-router')()
const {query}=require('./../mysql/connect.js');
const {ServerSuccess,ServerFail}=require('./../tools/sqlTools')
const moment=require('moment')
router.get("/addStory",async (ctx)=>{
    if( ctx.session.user!=undefined){
        ctx.body=ServerFail("请登录");
        return;
    }
    const params=ctx.query;
    const sql=`insert into story values(0,'${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}','${params.uName}','${params.title}','${params.imgs}','${params.richText}',${params.homeId})`;
    const res=query(sql);
    if(res!==undefined){
        ctx.body=ServerSuccess(res)
    }else{
        ctx.body=ServerFail("处理异常");
    }
})


router.get("/selectStory",async (ctx)=>{
        const params =ctx.query;
        let sql;
        sql=`select * from story
        where ${params.where} 
        order by ${params.orderBy} 
        limit ${params.pageSize*(params.pageNum-1)},${params.pageSize}`
        const res=await query(sql);
        const total=await query(`select count(*) from story where ${params.where}`)
        if(res.length>0){
          ctx.body=ServerSuccess(res);
          ctx.body.total=total[0]["count(*)"];
        }else{
          ctx.body=ServerFail("查询结果为空")
        }
})

router.get("/getStoryById",async(ctx)=>{
    const params =ctx.query;
    const sql=`select * from story where id=${params.id}`;
    const res=await query(sql);
    if(res!==undefined){
        ctx.body=ServerSuccess(res)
    }else{
        ctx.body=ServerFail("处理异常");
    }


})





module.exports = router