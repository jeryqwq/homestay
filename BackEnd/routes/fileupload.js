const router = require('koa-router')()
const fs = require('fs');
const path=require('path')



router.post('/fileupload', async (ctx) => {
        const file =ctx.request.files.file;//获取上传文件
        const reader = fs.createReadStream(file.path);//创建可读流
        const ext = file.name.split('.').pop();//获取上传文件扩展名
        const randomStr=Math.random().toString();
        let filePath = path.join('upload/') + `/${randomStr+"."+ext}`;
        // 创建可写流
        const upStream = fs.createWriteStream(filePath);
        // 可读流通过管道写入可写流
        reader.pipe(upStream);
        return ctx.body = randomStr+"."+ext;
})
module.exports = router
