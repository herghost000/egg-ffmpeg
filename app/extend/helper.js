'use strict';
const crypto = require('crypto');
const path = require('path');
const sendToWormhole = require('stream-wormhole');
const {
  write,
} = require('await-stream-ready');
const fs = require('fs');

function getStat(path) {
  return new Promise(resolve => {
    fs.stat(path, (err, stats) => {
      if (err) {
        resolve(false);
      } else {
        resolve(stats);
      }
    });
  });
}

function mkdir(dir) {
  return new Promise(resolve => {
    fs.mkdir(dir, err => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

async function mkdirs(dir) {
  const isExists = await getStat(dir);
  // 如果该路径且不是文件，返回true
  if (isExists && isExists.isDirectory()) {
    return true;
  } else if (isExists) { // 如果该路径存在但是文件，返回false
    return false;
  }
  // 如果该路径不存在
  const tempDir = path.parse(dir).dir; // 拿到上级路径
  // 递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
  const status = await mkdirs(tempDir);
  let mkdirStatus;
  if (status) {
    mkdirStatus = await mkdir(dir);
  }
  return mkdirStatus;
}

module.exports = {
  async save(baseDir, uploadPath, salty, stream) {
    const dateDir = new Date().toLocaleDateString() + '/';
    const realPath = baseDir + uploadPath + dateDir;
    if (!fs.existsSync(realPath)) {
      await mkdirs(realPath);
    }
    // 生成文件名 (时间 + 盐 + 10000以内的随机数 + 文件名后缀的MD5格式hash)
    const filename = crypto.createHash('md5').update(Date.now() + ':' + salty + Number.parseInt(Math.random() * 10000) + path.extname(stream.filename)).digest('hex') + path.extname(stream.filename);
    // const filename = Date.now() + '' + Number.parseInt(Math.random() * 10000) + path.extname(stream.filename);
    const target = path.join(realPath, filename);
    // 写入流
    const writeStream = fs.createWriteStream(target);
    try {
      // 写入文件
      await write(stream.pipe(writeStream));
    } catch (err) {
      // 必须将上传的文件流消费掉
      await sendToWormhole(stream);
      throw err;
    }
    return `${this.ctx.helper.urlFor()}public/${uploadPath}${dateDir}${filename}`;
  },
  mkdirs,
};
