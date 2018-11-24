<p align="center">
  <img width="320" src="https://raw.githubusercontent.com/herghost000/egg-ffmpeg/master/app/public/image/logo.png">
</p>

<p align="center">
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.5.10-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/ElemeFE/element">
    <img src="https://img.shields.io/badge/element--ui-2.3.2-brightgreen.svg" alt="element-ui">
  </a>
  <a href="https://github.com/herghost000/egg-ffmpeg/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
  </a>
</p>

简体中文 | [English](./README.md)

## 简介

[egg-video-admin](https://github.com/herghost000/egg-ffmpeg) 是一个视频点播后台集成解决方案

## 前序准备

##### 官方文档
watting

##### 安装node
https://nodejs.org/

##### 安装ffmpeg
http://ffmpeg.org/

##### 安装mysql
https://www.mysql.com/

**如有问题请先看上述使用文档和文章，若不能满足，欢迎 issue 和 pr**

## 功能

```
1）在线上传视频并转码为mp4，同时切片为m3u8
2）分享视频链接、iframe链接
3）支持ts加密
4）支持水印烧录
5）支持防盗链
```

## 开发

```bash
# 克隆项目
git clone https://github.com/herghost000/egg-ffmpeg.git

# 配置数据库
database/config.json
config/config.default.js

# 安装服务端依赖
npm install

# 建议不要用 cnpm 安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务端，默认7001端口
npm run dev

# 修改客户端代理端口
client/config/index.js
修改proxyTable target的端口为服务端启动端口

# 启动客户端
cd client & npm install & npm run dev

```

## 发布

```
waiting
```

## 其它

```
waiting
```

## Changelog

waiting

## Online Demo

waiting

## Donate

waiting

## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE10, IE11, Edge                                                                                                                                                                                                | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               |

## License

[MIT](https://github.com/herghost000/egg-ffmpeg/blob/master/LICENSE)

Copyright (c) 2017-present 乄ZackAddy
