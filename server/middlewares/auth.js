import userDao from '../dao/userDao'
import STATUS from '../utils/status'

const KEY = 'session_id'
const sessions = {}

function generateSession() {
  const session = {
    id: new Date().getTime() + Math.random(),
    cookie: {},
    username: null
  }
  sessions[session.id] = session
  return session
}

function getUserName(ctx){
  const sessionId = ctx.request.cookies[KEY]
  return sessions[sessionId].username
}

async function login(ctx) {
  const {username, password} = ctx.request.body
  const user = await userDao.getUserByName(username)
  if (!user) {
    ctx.response.body = { status: STATUS.LoginFailed }
  } else {
    const session = generateSession()
    session.username = username
    sessions[session.id] = session
    ctx.response.res.setHeader('Set-Cookie', [`${KEY}=${session.id}`])
    ctx.response.body = { status: STATUS.OK }
  }
}

function logout(ctx) {
  const sessionId = ctx.request.cookies[KEY]
  if(sessionId) {
    delete sessions[sessionId]
    ctx.response.res.setHeader('Set-Cookie', `${KEY}=${sessionId}; Max-Age=-1`)
  }
  ctx.response.body = { status: STATUS.OK }
}

async function authorise(ctx, next) {
  const request = ctx.request
  if (request.originalUrl === '/login') {
    await login(ctx)
  } else if (request.originalUrl === '/logout') {
    logout(ctx)
  } else {
    const sessionId = request.cookies[KEY]
    if (!sessionId) {
      ctx.response.body = { status: STATUS.NoAuth }
    } else {
      const session = sessions[sessionId]
      if (session) {
        await next()
      } else {
        ctx.response.body = { status: STATUS.NoAuth }
      }
    }
  }
}

const exportObj = {
  authorise,
  getUserName
}

export default exportObj