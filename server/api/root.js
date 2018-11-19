const checkRoot = function(ctx) {
  if (!ctx.session || !ctx.session.userInfo) {
    return {code: 500, message: '请先登陆'}
  } else {
    return {code: 200}
  }
}

module.exports = checkRoot