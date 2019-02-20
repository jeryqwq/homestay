const router = require('koa-router')();
const {query}=require('./../mysql/connect.js');
const {ServerSuccess,ServerFail}=require('./../tools/sqlTools')

router.get('/getUsers',async function (ctx) {
    const res=await query("select * from user")
    if( ctx.session.user!=undefined){
       if(ctx.session.user.isAdmin===1){
            if(res.length>0){
                ctx.body=ServerSuccess(res)
            }else{
                ctx.body=ServerFail("数据为空")
            }
       }else{
        ctx.body=ServerFail("您没有权限操作")
       }
    }else{
        ctx.body=ServerFail("用户未登录")
    }
  })
router.get("/changeAdmin",async function(ctx){
    if( ctx.session.user!=undefined){
        if(ctx.session.user.isAdmin===1){
            const params=ctx.query;
            const sql=`update user set isAdmin = ${params.isAdmin} where id=${params.id}`
            const res=await query(sql);
            ctx.body=ServerSuccess(res);
        }else{
         ctx.body=ServerFail("您没有权限操作")
        }
     }else{
         ctx.body=ServerFail("用户未登录")
     }
    
})
// if( ctx.session.user!=undefined){
//     if(ctx.session.user.isAdmin===1){
//         const params=ctx.query;
//     }
// }
router.get('/tabStatus',async function(ctx){
    if( ctx.session.user!=undefined){
    if(ctx.session.user.isAdmin===1){
        const params=ctx.query;
        const sql =`update cartinfo set status =${params.status} where id=${params.id}`
        const res=await query(sql);
        if(res){
            ctx.body=ServerSuccess(res)
        }else{
            ctx.body=ServerFail("处理异常或者参数不正确")
        }
    }else{
        ctx.body=ServerFail("您没有权限操作")
       }
}else{
    ctx.body=ServerFail("用户未登录")
}
})
router.get("/delUser",async function(ctx){
    if( ctx.session.user!=undefined){
        if(ctx.session.user.isAdmin===1){
            const params=ctx.query;
            const sql =`delete  from user where id=${params.id}`
            const res=await query(sql);
            ctx.body=ServerSuccess(res);
        }else{
            ctx.body=ServerFail("您没有权限操作")
           }
    }else{
        ctx.body=ServerFail("用户未登录")
    }
})
router.get('/updateProduct',async(ctx)=>{
    if( ctx.session.user!=undefined){
        if(ctx.session.user.isAdmin===1){
            const params =ctx.query;
            let sql;
            sql=`update cartinfo set pingpai='${params.pingpai}' title='${params.title}'`+"`"+`desc`+"`"+`='
            ${params.desc}' status=${params.status} price=${params.price} img='
            ${params.img}' subImgs= '${params.subImgs}' richText='${params.richText}'
            cateId=${params.cateId}
            where id=${params.id}
            `
            const res = await query(sql);
            if(res!==undefined){
                ctx.body=ServerSuccess(res);
            }else{
                ctx.body=ServerFail("查询数据为空");
            }
        }else{
            ctx.body=ServerFail("您没有权限操作");
           }
    }else{
        ctx.body=ServerFail("用户未登录");
    }
  })
  module.exports = router
