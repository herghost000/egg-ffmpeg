'use strict';
const Controller = require('egg').Controller;
const NodeRSA = require('node-rsa');
const sharp = require('sharp');

class HomeController extends Controller {
  async index() {
    const {
      ctx,
      app,
    } = this;
    // set
    // await app.redis.set('foo', 'bar');
    // await app.redis.set('user.herghost.token', 6666);
    // app.redis.expire('user.herghost.token', 10);
    // console.log(await app.redis.ttl('user.herghost.token'));
    // get
    // ctx.body = await app.redis.get('foo');

    // 左上角开始，截取为宽300，高200的图片
    // sharp('sharp/input.jpg')
    //   .resize(300, 200)
    //   .toFile('sharp/output.jpg', function(err) {
    //     console.log(err);
    //   });

    // const image = sharp('sharp/input.jpg');
    // const meta = await image.metadata();
    // image
    //   .resize(Math.round(metadata.width / 2))
    //   .webp()
    //   .toBuffer();

    // const stats = await sharp('sharp/input.jpg').stats();

    // sharp('sharp/input.jpg')
    //   .resize(200, 300, {
    //     kernel: sharp.kernel.nearest,
    //     fit: 'cover',
    //     position: 'center',
    //     background: {
    //       r: 255,
    //       g: 255,
    //       b: 255,
    //       alpha: 0.5,
    //     },
    //   })
    //   .toFile('sharp/output.png');
    // 600 800 480000
    // const imgList = [
    //   {
    //     url: 'sharp/input.jpg',
    //     ratio: 6 288000
    //   },
    //   {
    //     url: 'sharp/input.jpg',
    //     ratio: 2 96000
    //   },
    //   {
    //     url: 'sharp/input.jpg',
    //     ratio: 2 96000
    //   },

    // ];
    // const bgw = 600
    // const bgh = 800


    // const pic1bf = await sharp('sharp/input.jpg').resize(300, 400)
    //   .toBuffer();
    // const pic2bf = await sharp('sharp/input2.jpg').resize(300, 200)
    //   .toBuffer();
    // const bgbf = await sharp({
    //   create: {
    //     width: 600,
    //     height: 800,
    //     channels: 4,
    //     background: {
    //       r: 255,
    //       g: 0,
    //       b: 0,
    //       alpha: 0.5,
    //     },
    //   },
    // }).png().toBuffer();

    // const cpbf1 = await sharp(bgbf)
    //   .overlayWith(pic1bf, {
    //     top: 0,
    //     left: 0,
    //   })
    //   .sharpen()
    //   .png()
    //   .toBuffer();

    // sharp(cpbf1)
    //   .overlayWith(pic2bf, {
    //     top: 0,
    //     left: 300,
    //   })
    //   .sharpen()
    //   .png()
    //   .toFile('sharp/output.jpg');
    return this.ctx.render('home.tpl');
  }
  async rsa() {
    const newkey = new NodeRSA({
      b: 1024,
    });
    newkey.setOptions({
      encryptionScheme: 'pkcs1',
    });
    const public_key = newkey.exportKey('pkcs8-public'),
      private_key = newkey.exportKey('pkcs8-private');

    return this.ctx.render('rsa.tpl', {
      public: public_key,
      private: private_key,
    });
  }
}
module.exports = HomeController;
// INSERT INTO `users` (`id`,`name`,`created_at`,`updated_at`) VALUES (DEFAULT,'kkk','2018-11-26 05:31:37','2018-11-26 05:31:37');
// SELECT `created_at`, `updated_at`, `user_id`, `user_group_id` FROM `user_group_refs` AS `user_group_refs` WHERE
// `user_group_refs`.`user_id` = 8;
// INSERT INTO `user_group_refs` (`created_at`,`updated_at`,`user_id`,`user_group_id`) VALUES ('2018-11-26 05:31:37','2018-11-26 05:31:37',8,1);

// INSERT INTO `users` (`id`,`name`,`created_at`,`updated_at`) VALUES (DEFAULT,'kkk','2018-11-26 05:34:42','2018-11-26 05:34:42');
// SELECT `created_at`, `updated_at`, `user_id`, `user_group_id` FROM `user_group_refs` AS `user_group_refs` WHERE
// `user_group_refs`.`user_id` = 10 AND `user_group_refs`.`user_group_id` IN (1);
// INSERT INTO `user_group_refs` (`created_at`,`updated_at`,`user_id`,`user_group_id`) VALUES ('2018-11-26 05:34:42','2018-11-26 05:34:42',10,1);
// dataValues
// _previousDataValues
// _changed
// _modelOptions
// _options
// __eagerlyLoadedAssociations
// isNewRecord
// _customGetters
// _customSetters
// validators
// _hasCustomGetters
// _hasCustomSetters
// rawAttributes
// attributes
// _isAttribute
// pathName
// fullPath
// getUser_roles
// countUser_roles
// hasUser_role
// hasUser_roles
// setUser_roles
// addUser_role
// addUser_roles
// removeUser_role
// removeUser_roles
// createUser_role
// getUser_groups
// countUser_groups
// hasUser_group
// hasUser_groups
// setUser_groups
// addUser_group
// addUser_groups
// removeUser_group
// removeUser_groups
// createUser_group
// getUser_auths
// countUser_auths
// hasUser_auth
// hasUser_auths
// setUser_auths
// addUser_auth
// addUser_auths
// removeUser_auth
// removeUser_auths
// createUser_auth
// updateAttributes
// _setupHooks
// runHooks
// hook
// addHook
// removeHook
// hasHook
// hasHooks

/**
 * 拼接图片
 * @param  { Array<Sharp> } imgList
 * @param  { String } mode 拼接模式：horizontal(水平)/vertical(垂直)
 * @param  { Object } background 背景颜色 格式为 {r: 0-255, g: 0-255, b: 0-255, alpha: 0-1} 默认 {r: 255, g: 255, b: 255, alpha: 1}
 */
// async joinImage(imgList, { mode, background }) {
//   let totalWidth = 0
//   let totalHeight = 0
//   let maxWidth = 0
//   let maxHeight = 0
//   const imgMetadataList = []
//   // 获取所有图片的宽和高，计算和及最大值
//   for (let i = 0, j = imgList.length; i < j; i += i) {
//       const { width, height } = await imgList[i].metadata()
//       imgMetadataList.push({ width, height })
//       totalHeight += height
//       totalWidth += width
//       maxHeight = Math.max(maxHeight, height)
//       maxWidth = Math.max(maxWidth, width)
//   }

//   const baseOpt = {
//       width: mode === 'horizontal' ? totalWidth : maxWidth,
//       height: mode === 'vertical' ? totalHeight : maxHeight,
//       channels: 4,
//       background: background || {
//           r: 255, g: 255, b: 255, alpha: 1,
//       },
//   }

//   const base = sharp({
//       create: baseOpt,
//   }).jpeg().toBuffer()

//   // 获取图片的原始尺寸用于偏移
//   imgMetadataList.unshift({ width: 0, height: 0 })
//   let imgIndex = 0
//   const result = await imgList.reduce(async (input, overlay) => {
//       const offsetOpt = {}
//       if (mode === 'horizontal') {
//           offsetOpt.left = imgMetadataList[imgIndex++].width
//           offsetOpt.top = (maxHeight - imgMetadataList[imgIndex].height) / 2
//       } else {
//           offsetOpt.top = imgMetadataList[imgIndex++].height
//           offsetOpt.left = (maxWidth - imgMetadataList[imgIndex].width) / 2
//       }
//       overlay = await overlay.toBuffer()
//       return input.then(data => sharp(data).overlayWith(overlay, offsetOpt).jpeg().toBuffer())
//   }, base)
//   return result
// },
