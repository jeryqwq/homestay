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
        const sql =`update homeinfo set status =${params.status} where id=${params.id}`
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
router.get("/adminOrders",async function(ctx){
    if( ctx.session.user!=undefined){
        if(ctx.session.user.isAdmin===1){
            const sql =`select o.id as id,title,homeId,userId,other,startTime,endTime,ostatus,img from `+"`order`"+` o,homeinfo h  where o.homeId=h.id and h.uId=${ctx.session.user.id}`
            const res=await query(sql);
            ctx.body=ServerSuccess(res);
        }else{
            ctx.body=ServerFail("您没有权限操作")
           }
    }else{
        ctx.body=ServerFail("用户未登录")
    }
})
router.get("/allowOrders",async function(ctx){
    if( ctx.session.user!=undefined){
        if(ctx.session.user.isAdmin===1){
            const params=ctx.query;
            const sql =`update `+"`order`"+` set ostatus=1 where id=${params.id} `
            const res=await query(sql);
            ctx.body=ServerSuccess(res);
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
            sql=`update homeinfo set pingpai='${params.pingpai}' title='${params.title}'`+"`"+`desc`+"`"+`='
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
  router.get("/getAllComment",async function(ctx){
    if( ctx.session.user!=undefined){
        if(ctx.session.user.isAdmin===1){
            const sql =`select title,c.id as id,homeId,`+"`starts`"+`,content,cdesc,fromName from `+"`comment`"+` c,homeinfo h  where c.homeId=h.id and h.uId=${ctx.session.user.id} `
            const res=await query(sql);
            ctx.body=ServerSuccess(res);
        }else{
            ctx.body=ServerFail("您没有权限操作")
           }
    }else{
        ctx.body=ServerFail("用户未登录")
    }
})
  module.exports = router
