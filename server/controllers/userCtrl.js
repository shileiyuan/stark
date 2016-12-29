import userDao from '../dao/userDao'
import auth from '../middlewares/auth'
import STATUS from '../utils/status'

async function getUserData(ctx, next){
  const username = auth.getUserName(ctx)
  const user = await userDao.getUserByName(username)
  if(!user){
    ctx.response.body = {status: STATUS}
  } else {
    ctx.response.body = {
      status: STATUS.OK,
      data: user
    }
  }
}

module.exports = {
  'GET /getUserData': getUserData
}