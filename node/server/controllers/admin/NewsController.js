const NewsService = require("../../services/admin/NewsService");

const NewsController = {
  add: async (req, res) => {
    const cover = req.file ? `/newsuploads/${req.file.filename}` : "";
    const { title, content, category, isPublish } = req.body;
    // 调用service进行添加
    await NewsService.add({
      title,
      content,
      category: Number(category),
      isPublish: Number(isPublish),
      cover,
      editTime: new Date()
    });

    res.send({
      ActionType: "OK",
    });
  },
};

module.exports = NewsController;
