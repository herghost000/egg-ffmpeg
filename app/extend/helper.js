'use strict';
const crypto = require('crypto');
const path = require('path');
const sendToWormhole = require('stream-wormhole');
const { write } = require('await-stream-ready');
const fs = require('fs');
const uuidv1 = require('uuid/v1');

function host(ctx) {
  ctx = ctx || this.ctx;
  return ctx.helper.urlFor().slice(0, ctx.helper.urlFor().length - 1);
}

function md5(data) {
  const hash = crypto.createHash('md5');
  hash.update(data);
  return hash.digest('hex');
}

function aesEncrypt(data, key) {
  const cipher = crypto.createCipher('aes192', key);
  let crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function aesDecrypt(encrypted, key) {
  const decipher = crypto.createDecipher('aes192', key);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

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
  } else if (isExists) {
    // 如果该路径存在但是文件，返回false
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

function uniqueFileName(filename) {
  return (
    uuidv1()
      .split('-')
      .join('') + path.extname(filename)
  );
}

module.exports = {
  async save(baseDir, uploadPath, salty, stream) {
    const datestr = new Date()
      .toLocaleDateString()
      .split('/')
      .reverse()
      .join('-');

    const dateDir = datestr + '/';
    const realPath = baseDir + uploadPath + dateDir;
    if (!fs.existsSync(realPath)) {
      await mkdirs(realPath);
    }

    const filename = uniqueFileName(stream.filename);
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
    writeStream.close();
    return {
      host: this.ctx.helper
        .urlFor()
        .slice(0, this.ctx.helper.urlFor().length - 1),
      staticDir: this.config.static.prefix,
      path: `${uploadPath}${dateDir}${filename}`,
      url: `${this.ctx.helper.urlFor()}public/${uploadPath}${dateDir}${filename}`,
    };
  },
  async chunkSave(baseDir, uploadPath, stream) {
    let { name, total, index, key } = stream.fields;
    name = name || '';
    name = encodeURIComponent(name);
    name = `${md5(path.parse(name).name)}${path.parse(name).ext}`;

    let realPath = '';
    let source = '';
    let target = '';
    let dirName = '';
    if (key) {
      dirName = JSON.parse(aesDecrypt(key, 'fuck-you-video')).key;
      realPath = baseDir + uploadPath + dirName;
      source = path.join(realPath, `${name}`);
      target = `${source}${index}`;
    } else {
      dirName =
        uuidv1()
          .split('-')
          .join('') + '/';
      realPath = baseDir + uploadPath + dirName;
      if (!fs.existsSync(realPath)) {
        await mkdirs(realPath);
      }
      source = path.join(realPath, `${name}`);
      target = `${source}${index}`;
      key = aesEncrypt(
        JSON.stringify({
          key: dirName,
        }),
        'fuck-you-video'
      );
    }
    let writeStream = fs.createWriteStream(target);
    try {
      await write(stream.pipe(writeStream));
    } catch (err) {
      await sendToWormhole(stream);
      throw err;
    }

    if (index === total) {
      writeStream = fs.createWriteStream(source);
      for (let i = 1; i <= total; i++) {
        const url = `${source}${i}`;
        const data = await new Promise(function(resolve, reject) {
          fs.readFile(url, function(error, data) {
            if (error) reject(error);
            resolve(data);
          });
        });
        writeStream.write(data);
        fs.unlink(url, () => {});
      }
      writeStream.end();
      return {
        code: 200,
        data: {
          host: host(this.ctx),
          staticDir: this.config.static.prefix,
          path: `${uploadPath}${dirName}${name}`,
          url: `${host(this.ctx)}${
            this.config.static.prefix
          }${uploadPath}${dirName}${name}`,
          key,
          complate: true,
        },
        message: '文件碎片合并成功',
      };
    }

    return {
      code: 200,
      data: {
        key,
        complate: false,
      },
      message: '文件碎片上传成功',
    };
  },
  host,
  mkdirs,
  toInt,
};
