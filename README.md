### webpack 多页面应用模板项目
当前项目为 多页面应用模板项目

* 当前项目只可以使用 `pug` 作为html模板,如果需要新增页面,直接在 `src` 目录下新增 `文件名.pug`,并在`src/js`文件夹下添加同名js文件即可,无需在 `pug` 中主动引入
* 当前项目已做 `css` 预处理解析(`scss` `less` `stylus`)

* 当前项目为模板项目,若要完善项目,可以提交到当前项目,若要作为模板使用,请单独建立远程仓库,不要在当前项目上提交业务代码

* 当前项目已加入 `px2rem` 支持, 触发开关 在 `package.json` 里 的 `NEED_REM` 配置,并在`/build/customConf.js` 中的`px2remLoader`选项中修改对应的 `options`

* 当前项目已封装 通用请求方法 ,在 `src/utils/api/request.js` 中

* 当前项目已添加 `commit-msg` 限制,具体配置详见 `src/commitlint.config.js`

* 当前项目已添加 `eslint` 配置,具体配置详见 `.eslintrc`

* 当前项目并未引入第三方UI库,如需使用,请自行引入

* 当前项目已内置 `jquery` `lodash`
