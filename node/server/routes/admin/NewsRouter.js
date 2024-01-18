var express = require('express');
const NewsController = require('../../controllers/admin/NewsController');

var NewsRouter = express.Router();

// 图片上传插件,解析form表单数据
const multer  = require('multer')
const upload = multer({ dest: 'public/newsuploads/' })

// 涉及文件上传, 普通的post不行,需要加上multer中间件
NewsRouter.post("/adminapi/news/add", upload.single("file"), NewsController.add)

module.exports = NewsRouter