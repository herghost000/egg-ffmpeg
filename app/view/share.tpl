<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
		<title>{{name}}</title>
		
		<style type="text/css">
    html,body{height:100%;}
    body{margin:0;padding:0px;font-family:"Microsoft YaHei",YaHei,"微软雅黑",SimHei,"黑体";font-size:14px}
    #video{width:100%;height:100%;}
    </style>

	</head>

	<body>
		<script type="text/javascript" src="/public/js/ckplayer/ckplayer.js"></script>
		<div id="video" style="width: 100%"></div>
		<script type="text/javascript">
			var videoObject = {
				container: '#video', //容器的ID或className
				variable: 'player',//播放函数名称
				{# poster: "{{surface_plot}}",//封面图片 #}
				//flashplayer:true,
				video: "{{video_url}}"
			};
			var player = new ckplayer(videoObject);
		</script>
	</body>

</html>