export default async function cookieParser(ctx, next){
  const cookieStr = ctx.request.req.headers.cookie
  ctx.request.cookies = parseCookie(cookieStr)
  await next()
}

function parseCookie(cookie){
  const cookies = {}
  if(!cookie){
    return cookies
  }
  let list = cookie.split('; ')
  for(let item of list){
    let pair = item.split('=')
    cookies[pair[0].trim()] = pair[1]
  }
  return cookies
}