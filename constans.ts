let baseUrl
switch (process.env.VUE_APP_TITLE) {
  case 'alpha': // 注意这里的名字要和步骤二中设置的环境名字对应起来
    baseUrl = 'http://www.cnblogs.com/XHappyness/' //这里是测试环境中的url
    break
  case 'production':
    baseUrl = 'https://www.cnblogs.com/XHappyness/p/7686267.html' //生产环境url
    break
  default:
    baseUrl = 'http://localhost:57156/' //这里是本地的请求url
}

export default baseUrl
