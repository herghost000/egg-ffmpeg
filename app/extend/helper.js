'use strict';
const crypto = require('crypto');
const path = require('path');
const sendToWormhole = require('stream-wormhole');
const {
  write,
} = require('await-stream-ready');
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
  if (isExists && isExists.isDirectory()) {
    return true;
  } else if (isExists) {
    return false;
  }
  const tempDir = path.parse(dir).dir;
  if (!tempDir) {
    throw new Error('该路径最少有一个存在的目录');
  }
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
    let {
      name,
      total,
      index,
      key,
    } = stream.fields;
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
  md5,
  rsaEncrypt(origin) {
    const pu = this.config.rsa.public;
    const pubkey = new NodeRSA(pu);

    pubkey.setOptions({
      encryptionScheme: 'pkcs1',
    });
    return pubkey.encrypt(origin, 'base64');
  },
  rsaDecrypt(encrypted) {
    const pr = this.config.rsa.private;
    const prikey = new NodeRSA(pr);
    prikey.setOptions({
      encryptionScheme: 'pkcs1',
    });
    return prikey.decrypt(encrypted, 'utf8');
  },
};
