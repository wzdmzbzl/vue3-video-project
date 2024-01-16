const UserModel = require("../../models/UserModel")


const UserService = {
  login: async ({username, password}) => {
    let res = await UserModel.find({
      username,
      password
    })
    return res
  },

  upload: async ({_id, username, introduction, gender, avatar}) => {
    if(avatar) {
      return UserModel.updateOne({
        _id
      }, {
        username, introduction, gender, avatar
      })
    }else {
      return UserModel.updateOne({
        _id
      }, {
        username, introduction, gender
      })
    }
  }
}


module.exports = UserService