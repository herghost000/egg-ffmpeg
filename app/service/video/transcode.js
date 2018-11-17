'use strict';
const Service = require('egg').Service;
const ffmpeg = require('fluent-ffmpeg');
const util = require('util');

class TransCodeService extends Service {
  async trans() {
    const ratio = '1080p';
    const watermark = '';
    const srtpath = '';
    const miaoqie = true;
    const height = +ratio.split('p')[0];
    const path = 'C:/Users/Administrator/Desktop/s.mp4';
    const des = 'C:/Users/Administrator/Desktop/dest';
    if (!util.isNumber(height)) {
      throw new Error('未知的转码比率');
    }
    let size = '',
      bv = '',
      bufsize = '',
      maxrate = '',
      vf = [];
    if (height === 480) {
      size = '720x480';
      bv = '500k';
      bufsize = '1000k';
      maxrate = '500k';
    } else if (height === 1080) {
      size = '1920x1080';
      bv = '2000k';
      bufsize = '4000k';
      maxrate = '2000k';
    } else {
      size = '1280x720';
      bv = '1000k';
      bufsize = '2000k';
      maxrate = '1000k';
    }
    if (watermark) {
      vf.push(`movie=${watermark} [watermark]; [in][watermark] overlay=main_w-overlay_w`);
    }
    if (srtpath) {
      vf.push(`,subtitles=${srtpath}`);
    }

    if (watermark || srtpath) {
      vf.push(' [out]');
      vf = vf.join('');
    }

    ffmpeg.ffprobe(path, (err, metadata) => {
      if (err) console.log(err);
      const videometa = metadata.streams[0];

      if (videometa.height <= height) {
        size = videometa.width + 'x' + videometa.height;
      }

      if (miaoqie) {
        if (videometa.height <= height && videometa.codec_name === 'h264') {
          if (watermark || srtpath) {
            transcode(path, des, size, bv, bufsize, maxrate, vf);
          } else {
            chunk(path, des);
          }
        } else {
          transcode(path, des, size, bv, bufsize, maxrate, vf);
        }
      } else {
        trans2chunk(path, des, size, bv, bufsize, maxrate, vf);
      }

    });
  }
}

function transcode(path, des, size, bv, bufsize, maxrate, vf) {
  ffmpeg(path)
    .addOptions([
      '-s ' + size,
      '-b:v ' + bv,
      '-vcodec libx264',
      '-acodec aac',
      '-ac 2',
      '-b:a 128k',
      '-bufsize ' + bufsize,
      '-maxrate ' + maxrate,
      '-q:v 6',
      '-strict -2',
    ])
    .addOption('-vf', vf)
    .output(des + '/index.mp4')
    .on('start', function() {
      console.log('start????s');
    })
    .on('error', function(err, stdout, stderr) {
      console.log('Cannot process video: ' + path + err.message);
    })
    .on('end', function() {
      chunk(des + '/index.mp4', des);
    })
    .run();
}

function chunk(path, des) {
  ffmpeg(path)
    .addOptions([
      '-start_number 0',
      '-hls_time 10',
      '-hls_list_size 0',
      '-f hls',
      '-strict -2',
    ]).output(des + '/index.m3u8')
    .on('start', function() {
      screenshots(path, des);
    })
    .on('error', function(err, stdout, stderr) {
      console.log('Cannot chunk video: ' + err.message);
    })
    .on('end', function() {
      console.log('转码完成');
    })
    .run();
}

function trans2chunk(path, des, size, bv, bufsize, maxrate, vf) {
  const fp = ffmpeg(path)
    .addOptions([
      '-s ' + size,
      '-b:v ' + bv,
      '-vcodec libx264',
      '-acodec aac',
      '-ac 2',
      '-b:a 128k',
      '-bufsize ' + bufsize,
      '-maxrate ' + maxrate,
      '-q:v 6',
      '-strict -2',
      '-start_number 0',
      '-hls_time 10',
      '-hls_list_size 0',
      '-f hls',
    ]);
  if (vf) {
    fp.addOption('-vf', vf);
  }
  fp.output(des + '/index.m3u8')
    .on('start', function() {
      screenshots(path, des);
    })
    .on('error', function(err, stdout, stderr) {
      console.log('Cannot process video: ' + path + err.message);
    })
    .on('end', function() {
      console.log('complate 6666');
    })
    .run();
}

function screenshots(path, des, count = 4) {
  ffmpeg(path).screenshots({
    count,
    filename: '%i.jpg',
    folder: des,
  });
}

module.exports = TransCodeService;
