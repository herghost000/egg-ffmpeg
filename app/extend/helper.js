'use strict';
const crypto = require('crypto');
const path = require('path');
const sendToWormhole = require('stream-wormhole');
const { write } = require('await-stream-ready');
const fs = require('fs');
const uuidv1 = require('uuid/v1');
const NodeRSA = require('node-rsa');
function duplicates(arr) {
  const same = [];
  const diff = [];
  arr.sort();
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === arr[i + 1] && same.indexOf(arr[i]) === -1) {
      same.push(arr[i]);
      i++;
    } else {
      diff.push(arr[i]);
    }
  }

  return {
    same,
    diff,
  };
}

function host(ctx) {
  ctx = ctx || this.ctx;
  return ctx.helper.urlFor().slice(0, ctx.helper.urlFor().length - 1);
}

function randomkey() {
  const data = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
  ];
  for (let j = 0; j < 500; j++) {
    let result = '',
      r = '';
    for (let i = 0; i < 16; i++) {
      r = Math.floor(Math.random() * data.length);

      result += data[r];
    }
    return result;
  }
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
  if (!tempDir) {
    throw new Error('该路径最少有一个存在的目录');
  }
  // 递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
  const status = await mkdirs(tempDir);
  let mkdirStatus;
  if (status) {
    mkdirStatus = await mkdir(dir);
  }
  return mkdirStatus;
}

function readFile(path) {
  return new Promise(resolve => {
    fs.readFile(path, 'utf-8', function(err, data) {
      if (err) {
        resolve(false);
      } else {
        resolve(data);
      }
    });
  });
}

function writeFile(path, data) {
  return new Promise(resolve => {
    fs.writeFile(path, data, 'utf8', function(error) {
      if (error) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

async function copyFile(src, dest) {
  await mkdirs(path.dirname(dest));
  const data = await readFile(src);
  return await writeFile(dest, data);
}

function uniqueFileName(filename) {
  return (
    uuidv1()
      .split('-')
      .join('') + path.extname(filename)
  );
}

function covertSep(_path) {
  return _path.replace(/\\/gim, '/');
}

module.exports = {
  async save(baseDir, uploadPath, stream) {
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
    const target = covertSep(path.join(realPath, filename));
    const writeStream = fs.createWriteStream(target);
    try {
      await write(stream.pipe(writeStream));
    } catch (err) {
      await sendToWormhole(stream);
      throw err;
    }
    writeStream.close();
    return {
      filename: `${filename}`,
      dirname: `${dateDir}`,
      path: `${realPath}${filename}`,
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
      source = covertSep(path.join(realPath, `${name}`));
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
      source = covertSep(path.join(realPath, `${name}`));
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
        dirname: `${dirName}`,
        path: `${source}`,
        filename: name,
        key,
        complate: true,
      };
    }

    return {
      key,
      complate: false,
    };
  },
  host,
  mkdirs,
  toInt,
  copyFile,
  randomkey,
  covertSep,
  aesEncrypt,
  aesDecrypt,
  duplicates,
  rsaEncrypt() {
    const pu =
      '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCoRSxPqDLxsdbM9Q4D4sujWBKHCAEcMHD19fkRigMbVMROCrvuETSCBE9Yefz+bwu09Gt8gIM3uA78ZZpY1P0ugkrZUNtNLeXPSjDd4HCaSiQsP2dhUPkhLpO0yVh+HJT2ducfVJpTU+cTk39TQOpSEAyQoq0L7Zhqa2D/uTKo+wIDAQAB-----END PUBLIC KEY-----';
    const pubkey = new NodeRSA(pu);

    pubkey.setOptions({ encryptionScheme: 'pkcs1' });
    return pubkey.encrypt('666', 'base64');
  },
  rsaDecrypt(encrypted) {
    const pr =
      '-----BEGIN PRIVATE KEY-----MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAKhFLE+oMvGx1sz1DgPiy6NYEocIARwwcPX1+RGKAxtUxE4Ku+4RNIIET1h5/P5vC7T0a3yAgze4DvxlmljU/S6CStlQ200t5c9KMN3gcJpKJCw/Z2FQ+SEuk7TJWH4clPZ25x9UmlNT5xOTf1NA6lIQDJCirQvtmGprYP+5Mqj7AgMBAAECgYBZ9lGQbN5/tZKflUxe63vv4oBVTQQ66/MYrN7yb5TlodYp2zdKOkyWTnOVW/LUnM3net2UfKiqu27XpgJ1B7orqXSe0xRSlR4dqlKDSr4Q/Cq5ftmgKzdA13TlwyDJyO1B9Ru7VIvjhk9PBsb3gb4fLh13A8xUvgVwQlZpoOt3AQJBAO1PYp0pjwHfMAJRTw7OjzBFD8oPE2n/Jw8vpUFmWviDja3tDk+7MlY6tRfqbXkor3GS9rxRuf2EhUpVSK8Ko0ECQQC1hdCSgB7eS7hPIm2uxZGfud2n9IV0H/R91a4fX5CuCJdlnNlMesSuVbh3l6hFLhHC9U3YmKkG5sTZ67pgUck7AkEAzeig1190/5nJzWkBoQZnxelWrutv2/wRxyJ/UITgkFuNdomHbnUuUxWzhmHZxVQhDvoG7xY2vJvdD8d6Pq+LQQJADMedBZNrmO7vzPJ5kmJqfDpTtq1qb+CIEAvpNGBACWCleAvw6IeELVnvoMvWlvhFW9p1Xphw3gGFPmpwNrPLXQJAE6Vy+BkepP6KfSD/rwbsQcTMrPOP6jGtp+6VBuUca6s/mbKWabgd7/GxveTpNnIUwv6kh2O7kZV5c8+4AGRNBQ==-----END PRIVATE KEY-----';
    const prikey = new NodeRSA(pr);
    prikey.setOptions({ encryptionScheme: 'pkcs1' });
    return prikey.decrypt(encrypted, 'utf8');
  },
};
