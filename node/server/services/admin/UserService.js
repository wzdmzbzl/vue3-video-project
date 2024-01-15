const UserModel = require("../../models/UserModel")


const UserService = {
  login: async ({username, password}) => {
    let res = await UserModel.find({
      username,
      password
    })
    return res
  }
}


module.exports = UserService