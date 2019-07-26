//  怎么导入自定义的包  
// 通过这个包所在的路径来导入
// 要拼接路径
const path=require('path');
// 要导入utils这个包,,是我们自己定义,通过路径导入,下面这句是相当于 拼接路径
const dbPath=path.join(__dirname,'utils','db.js');
// 是引入db.js这个文件,
const db=require(dbPath);

// 创建服务器的用express
const express=require('express');

// 创建服务器
const app=express();

app.get('/',(req,res)=>{







});


// 开启服务器
app.listen(4000,()=>{
    console.log('成功开启');
});
