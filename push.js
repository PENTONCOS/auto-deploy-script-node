const fs = require('fs');
const { execSync } = require('child_process');

const SERVER_IP = 'xx.xx.xx.xx';
const SERVER_PORT = 'xx';
const USERNAME = 'root';
const PASSWORD_FILE = './password.txt';
const REMOTE_DIR = '/home/nginx/www/xxx';
const SOURCE_DIR = './dist';
const REMOTE_FILE = `${REMOTE_DIR}/dist`;
const BACKUP_FILE = `${REMOTE_DIR}/dist_back`;

let PASSWORD = '';

const args = process.argv.slice(2); // 从第三个元素开始截取，忽略前两个默认参数

// 处理命令行参数
for (let i = 0; i < args.length; i += 2) {
  const paramName = args[i].replace('--', '');
  if (paramName === 'PASSWORD') {
    PASSWORD = args[i + 1];
  }
}

// 从密码文件中读取密码
// 检查文件是否存在
if (fs.existsSync(PASSWORD_FILE)) {
  // 如果文件存在，读取并进行处理
  PASSWORD = fs.readFileSync(PASSWORD_FILE, 'utf8').trim();
}

console.log(`账号：${USERNAME}\n获取服务器密码：${PASSWORD}`)

// 连接到远程服务器并检查路径是否存在
execSync(`sshpass -p "${PASSWORD}" ssh root@${SERVER_IP} "mkdir -p ${REMOTE_DIR}"`);

// 连接到远程服务器并执行重命名以及删除操作
execSync(`sshpass -p "${PASSWORD}" ssh root@${SERVER_IP} "
if [ -e ${REMOTE_FILE} ]; then
    if [ -e ${BACKUP_FILE} ]; then
        rm -rf ${BACKUP_FILE}
    fi
   fuser -s ${REMOTE_FILE} || mv ${REMOTE_FILE} ${BACKUP_FILE} || rm -rf ${REMOTE_FILE}
fi
"`);

// 使用 sshpass 命令执行 scp 命令并自动输入密码，将文件复制到远程服务器上
execSync(`sshpass -p "${PASSWORD}" scp -P ${SERVER_PORT} -r ${SOURCE_DIR} ${USERNAME}@${SERVER_IP}:${REMOTE_DIR}`);

console.log(`===部署成功！===`)