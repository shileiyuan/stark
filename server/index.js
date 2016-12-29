import koa from 'koa'
import bodyParser from 'koa-body-parser'
import router from './middlewares/controller'
import cookieParser from './middlewares/cookieParser'
import auth from './middlewares/auth'

const app = new koa()
app.use(bodyParser())
app.use(cookieParser)
app.use(auth.authorise)
app.use(router())
app.listen(8085)
console.log('app started at port 8085')




