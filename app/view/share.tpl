<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
		<title>{{name}}</title>
		<meta http-equiv="content-type" content="text/html;charset=UTF-8">
		<meta http-equiv="content-language" content="zh-CN">
		<meta http-equiv="X-UA-Compatible" content="chrome=1">
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta name="referrer" content="never">
		<meta name="renderer" content="webkit">
		<meta name="msapplication-tap-highlight" content="no">
		<meta name="HandheldFriendly" content="true">
		<meta name="x5-page-mode" content="app">
		<meta name="Viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/dplayer/1.25.0/DPlayer.min.css" />
		<style type="text/css">
		body,html{width:100%;height:100%;background:#000;padding:0;margin:0;overflow-x:hidden;overflow-y:hidden;}
		*{margin:0;border:0;padding:0;text-decoration:none;}
		#stats{position:fixed;top:5px;left:8px;font-size:12px;color:#fdfdfd;text-shadow:1px 1px 1px #000, 1px 1px 1px #000;}
		#tcvideo{position:inherit;width: 100%; height: 100%;max-width: 100%;}
    </style>
		<script type="text/javascript" src="/public/js/ckplayer/ckplayer.js"></script>
		<script src="https://cdn.bootcss.com/hls.js/0.10.1/hls.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/dplayer/1.25.0/DPlayer.min.js"></script>
	</head>

	<body>
		<div id="tcvideo"></div>
		<script type="text/javascript">
			var videoObject = {
				container: '#tcvideo', //容器的ID或className
				variable: 'player',//播放函数名称
				{# poster: "{{surface_plot}}",//封面图片 #}
				//flashplayer:true,
				html5m3u8:true,
				video: "{{video_url}}"
			};
			var player = new ckplayer(videoObject);
		</script>
		<!--<script>
			const dp = new DPlayer({
					container: document.getElementById('tcvideo'),
					video: {
							url: 'https://moeplayer.b0.upaiyun.com/dplayer/hls/hikarunara.m3u8',
							type: 'hls'
					}
			});
		</script>-->
	</body>

</html>