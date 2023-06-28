# auto-deploy-script-node

这是一个自动部署脚本，将构建产物上传至服务器。

优点：免密、支持node环境。

使用方法：
1. 首先全局安装 `sshpass`，一个免交互 `ssh` 登录工具。
2. 将脚本复制到项目根路径下。
3. 按需修改服务器地址等参数。提供三种密码导入方式：
   - 直接在 `push.js` 中将 `PASSWORD` 写死。
   - 将存储在本地记录密码的文件写到 `PASSWORD_FILE` 中。
   - 配合 `build` 指令，添加 `"build": "vite build && node ./push.js --PASSWORD xxxx"`。
4. 可以直接在根目录下执行 `node push.js`；也可以使用上面第三种密码导入方式，通过 `npm run build` 自动执行部署脚本。
