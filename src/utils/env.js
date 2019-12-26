/* eslint-disable */
/**
 * 配置编译环境和线上环境之间的切换
 * apiCommonUrl: 域名地址
 */
let targetConfig = {
  xDomain: ''
}
const commonURL = {
  co: 'https://s.fubt.co/',
  com: 'https://s.fubt.com/'
};
const devTestConfig = {
  apiCommonUrl: 'http://192.168.2.200:8888/',
  xDomain: 'new.dev.com'
}

const testingConfig = {
  apiCommonUrl: 'https://web.rest.test.com/',
  xDomain: 'web.test.com'
}

// const prodConfig = migrateConfig
const prodConfig = {
  apiCommonUrl: commonURL.co,
  xDomain: 'fubt.co'
}
switch (process.env.ENV_CONFIG) {
  case 'dev':
    // 本地开发
    targetConfig = {...targetConfig, ...devTestConfig, xDomain: 'new.dev.com'}
    // targetConfig = {...targetConfig, ...testingConfig, xDomain: 'web.test.com'}
    // targetConfig = {...prodConfig, xDomain: 'new.bzu.com'}
    // targetConfig = {...prodConfig, xDomain: 'fubt.com'}
    break
  // 外网测试环境
  case 'test':
    targetConfig = {...targetConfig, ...testingConfig}
    break
  // 生产环境
  case 'prod':
    targetConfig = {...targetConfig, ...prodConfig}
    break
}

const {
  apiCommonUrl,
  xDomain
} = targetConfig
export {
  apiCommonUrl,
  xDomain
}
