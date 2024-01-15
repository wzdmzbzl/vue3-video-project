const jsonwebtoken = require("jsonwebtoken")
const secret = "xiaowu"

const JWT = {
  generate(value, expires) {
    return jsonwebtoken.sign(value, secret, {expiresIn: expires})
  },
  verify(token) {
    try {
      return jsonwebtoken.verify(token, secret)
    } catch (err) {
      return false
    }
  }
}


module.exports = JWT