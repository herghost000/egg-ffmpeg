'use strict';
const Service = require('egg').Service;
const ffmpeg = require('fluent-ffmpeg');
const util = require('util');
const path = require('path');
const fs = require('fs');

class TransCodeService extends Service {
  async trans(id) {
    const ctx = this.ctx;
    const {
      data: {
        host,
        ratio,
        miaoqie,
        watermark,
        tsencry,
        screenshots,
      },
    } = await ctx.service.video.setting.find();
    const listItem = await ctx.service.video.list.find(id);
    if (!listItem.data) {
      return {
        code: 404,
        data: null,
        message: '未找到相关视频信息',
      };
    }
    const {
      video_path,
      decode_id,
      video_decode,
    } = listItem.data;
    if (!decode_id || (decode_id && !video_decode)) {
      return {
        code: 404,
        data: null,
        message: '未找到转码信息，未生成或被删除',
      };
    }
    const {
      trans_path,
      chunk_path,
      status_id,
    } = video_decode;
    if (!video_path) {
      return {
        code: 404,
        data: null,
        message: '未找到视频路径',
      };
    }
    if (!trans_path) {
      return {
        code: 404,
        data: null,
        message: '未找到转码路径',
      };
    }
    if (!chunk_path) {
      return {
        code: 404,
        data: null,
        message: '未找到切片路径',
      };
    }
    if (!status_id) {
      return {
        code: 404,
        data: null,
        message: '未初始化视频转切状态',
      };
    }
    if (status_id === 5) {
      return {
        code: 200,
        data: null,
        message: '转切已完成，请勿重复处理',
      };
    }
    if (status_id !== 1 && status_id < 6) {
      return {
        code: 404,
        data: null,
        message: '视频转切进行中',
      };
    }
    const srtpath = '';
    const height = +ratio.split('p')[0];
    if (!util.isNumber(height)) {
      throw new Error('unknow ratio');
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
      vf.push(
        `movie=${this.config.upload.staticPrefix}${watermark} [watermark]; [in][watermark] overlay=main_w-overlay_w`
      );
    }
    if (srtpath) {
      vf.push(`,subtitles=${srtpath}`);
    }

    if (watermark || srtpath) {
      vf.push(' [out]');
      vf = vf.join('');
    }

    await ctx.helper.mkdirs(path.dirname(trans_path));
    await ctx.helper.mkdirs(path.dirname(chunk_path));

    if (tsencry) {
      const dest = path.dirname(chunk_path);
      const filename = path.parse(chunk_path).name;
      const dirname = path.parse(path.dirname(chunk_path)).name;
      await ctx.helper.mkdirs(dest);
      fs.writeFileSync(
        `${dest}/key.info`,
        // `${host}/video/link/${dirname}/ts.key\n${dest}/ts.key`
        `ts.key\n${dest}/ts.key`
      );
      const key = ctx.helper.randomkey();
      fs.writeFileSync(`${dest}/ts.key`, key);
    }
    const cbs = {
      transStart() {
        video_decode.update({
          status_id: 2,
        });
      },
      transEnd() {
        video_decode.update({
          status_id: 3,
        });
      },
      transError() {
        video_decode.update({
          status_id: 6,
        });
      },
      chunkStart() {
        video_decode.update({
          status_id: 4,
        });
      },
      chunkEnd() {
        video_decode.update({
          status_id: 5,
        });
      },
      chunkError() {
        video_decode.update({
          status_id: 7,
        });
      },
    };

    ffmpeg.ffprobe(video_path, (err, metadata) => {
      if (err) console.log(err);
      const videometa = metadata.streams[0];

      if (videometa.height <= height) {
        size = videometa.width + 'x' + videometa.height;
      }

      if (miaoqie) {
        if (videometa.height <= height && videometa.codec_name === 'h264') {
          if (watermark || srtpath) {
            transcode(
              video_path,
              trans_path,
              chunk_path,
              size,
              bv,
              bufsize,
              maxrate,
              vf,
              tsencry,
              cbs
            );
          } else {
            ctx.helper.copyFile(video_path, trans_path);
            chunk(video_path, chunk_path, tsencry, cbs);
          }
        } else {
          transcode(
            video_path,
            trans_path,
            chunk_path,
            size,
            bv,
            bufsize,
            maxrate,
            vf,
            tsencry,
            cbs
          );
        }
      } else {
        transcode(
          video_path,
          trans_path,
          chunk_path,
          size,
          bv,
          bufsize,
          maxrate,
          vf,
          tsencry,
          cbs
        );
      }
    });
    return {
      code: 200,
      data: true,
      message: '开始转码、切片',
    };
  }
}

function transcode(
  video_path,
  trans_path,
  chunk_path,
  size,
  bv,
  bufsize,
  maxrate,
  vf,
  tsencry,
  cbs
) {
  const fp = ffmpeg(video_path).addOptions([
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
  ]);
  if (vf && !util.isArray(vf)) {
    console.log('vf::', vf);
    fp.addOption('-vf', vf);
  }
  fp.output(trans_path)
    .on('start', function() {
      cbs.transStart();
    })
    .on('error', function(err) {
      cbs.transError();
      console.log('Cannot process video: ' + video_path + err.message);
    })
    .on('end', function() {
      cbs.transEnd();
      chunk(trans_path, chunk_path, tsencry, cbs);
    })
    .run();
}

function chunk(trans_path, chunk_path, tsencry, cbs) {
  const fp = ffmpeg(trans_path).addOptions([
    '-start_number 0',
    '-hls_time 10',
    '-hls_list_size 0',
    '-f hls',
    '-strict -2',
  ]);
  if (tsencry) {
    fp.addOption('-hls_key_info_file', path.dirname(chunk_path) + '/key.info');
  }
  fp.output(chunk_path)
    .on('start', function() {
      cbs.chunkStart();
      screenshots(trans_path, chunk_path);
    })
    .on('error', function(err) {
      cbs.chunkError();
      console.log('Cannot chunk video: ' + err.message);
    })
    .on('end', function() {
      cbs.chunkEnd();
    })
    .run();
}

function trans2chunk(video_path, chunk_path, size, bv, bufsize, maxrate, vf) {
  const fp = ffmpeg(video_path).addOptions([
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
  fp.output(chunk_path)
    .on('start', function() {
      screenshots(video_path, chunk_path);
    })
    .on('error', function(err) {
      console.log('Cannot process video: ' + video_path + err.message);
    })
    .on('end', function() {
      console.log('complate 6666');
    })
    .run();
}

function screenshots(video_path, chunk_path, count = 4) {
  ffmpeg(video_path).screenshots({
    count,
    filename: '%i.jpg',
    folder: path.dirname(chunk_path),
  });
}

module.exports = TransCodeService;
