const NewsModel = require("../../models/NewsModel");



const NewsService = {
  add: async ({title, content, category, cover, isPublish, editTime}) => {
    // 数据库的模型处理
    return NewsModel.create({title, content, category, cover, isPublish, editTime})
  }
}

module.exports = NewsService