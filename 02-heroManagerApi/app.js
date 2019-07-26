//英雄管理界面的API
// 初始化   npm init -y
// 创建服务器用 repress 模块  下包 npm i express
// 导包 express
const express = require('express');

// 需要传文本信息,,下包 body-parser       npm i body-parser
// 导包 body-parser
const bodyParser = require('body-parser');

// 需要传文件信息,,下包 multer      npm i multer
// 导包,,,multer
const multer = require('multer');
var upload = multer({ dest: 'uploads/' });    /* 创建一个 upload文件夹,,,把获取到的图片信息存入 upload 里面 */

// 我们使用自己的文件包,,,用地址最为导入路径
const path = require('path');
const dbpath = path.join(__dirname, 'utils', 'db.js');
const db = require(dbpath);

const app = express();

// 跨域访问,,,要使用第三方模块  cros  下包 cros 
// 导包  cors
var cors = require('cors');

//把uploads这个文件夹给暴露在外面
app.use(express.static('uploads'));


// 创建服务器

app.use(bodyParser.urlencoded({ extended: false }))  // parse application/x-www-form-urlencoded    在导包body-parser是搭配一起设置
app.use(cors());   /*  调用 cors 模块 */


// 注册路由
// 登录 post 接口  存在文本上传到后台
app.post('/login', (req, res) => {

    console.log(req.body);   /* 用户传进来的文本数据   { username: 'admin', password: '123456' } */
    // const username=req.body.username;
    // const password=req.body.password;
    const { username, password } = req.body;

    if (username == 'admin' && password == '123456') {
        res.send({
            msg: '登录成功',
            code: 200
        });
    } else {
        res.send({
            msg: '账号或密码错误',
            code: 400
        });
    }
});

// 查询英雄列表(所有英雄信息并显示)
app.get('/list', (req, res) => {

    const data = db.getHeros();   /* 返回所有英雄信息 */
    if (data) {
        res.send({
            msg: '获取成功',
            code: 200,
            data
        });
    } else {
        res.send({
            msg: '获取失败',
            code: 400
        });
    }
});


// 根据id查某个英雄信息
app.get('/search', (req, res) => {

    console.log(req.query);
    const { id } = req.query;
    const data = db.getHeroById(id);
    if (data) {
        res.send({
            code: 200,
            msg: "获取成功",
            data
        });
    } else {
        res.send({
            code: 400,
            msg: "获取失败"
        });
    }
});





// 根据id删除英雄
app.get('/delete', (req, res) => {
    // 用插件 body-parser获取文本信息

    const { id } = req.query;
    const result = db.deleteHeroById(id);
    if (result) {
        res.send({
            msg: '删除成功',
            code: 300
        });
    } else {
        res.send({
            msg: '删除失败',
            code: 500
        });
    }
});


// 编辑
app.post('/edit', upload.single('icon'), (req, res, ) => {
    console.log(req.file);
    console.log(req.body);
    let icon = req.file.filename;
    // icon = path.join('http://localhost:4000', icon);
    icon=`http://localhost:4000/${icon}`;
    const { id, name, skill } = req.body;
    const result = db.editHero({
        icon,
        name,
        skill,
        id
    });
    if (result) {
        let data={
            name,
            id,
            skill,
            icon
        };
        res.send({
            msg: '修改成功',
            code: 201,
            data
        });
    } else {
        res.send({
            msg: '修改失败',
            code: 401
        });
    }
});



// 新增英雄
app.post('/add', upload.single('icon'), (req, res, ) => {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any


    // 闯过来文本和文件图片等  用插件 multer
    console.log(req.file);    /* 返回用户的上传的图片文件 */
    console.log(req.body);     /* 返回用户上传的文本信息 */

    let icon = req.file.filename;   /* 答应出来的是icon */
    icon = path.join('http://localhost:4000', icon);

    const { id, name, skill } = req.body;
    const result = db.addHero({
        icon,
        id,
        name,
        skill
    })
    if (result) {
        res.send({
            msg: '新增成功',
            code: 200,
        });
    } else {
        res.send({
            msg: '新增失败',
            code: 400
        });
    }
});
// 开启服务器
app.listen(4000, () => {
    console.log('服务器开起了!');
});
