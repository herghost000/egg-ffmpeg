<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>rsa生成</title>
<script src="https://cdn.bootcss.com/jsencrypt/3.0.0-beta.1/jsencrypt.min.js"></script>
</head>
<body>
<ul>
  <li>替换后端config/config.default.js config.rsa = {public:'',private:''}的公钥与私钥</li>
  <li>替换前端私钥</li>
</ul>
<div>
  <span>公钥:</span>
  <textarea id="public" rows="10" cols="100">{{public}}</textarea>
</div>
<div>
  <span>私钥:</span>
  <textarea id="private" rows="10" cols="100">{{private}}</textarea>
</div>
<div>
  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
  <button id="public_download">公钥下载</button>
  <button id="private_download">私钥下载</button>
</div>
<script>

  var public_key = document.getElementById('public').value.split('\n').filter(_=>_).join('\\n')
  var private_key = document.getElementById('private').value.split('\n').filter(_=>_).join('\\n')

  document.getElementById('public').value = public_key
  document.getElementById('private').value = private_key

  function download(blobUrl, filename) {
        var a = document.createElement('a');
        if(a.click) {
            a.href = blobUrl;
            a.target = '_parent';
            if('download' in a) {
                a.download = filename;
            }
            (document.body || document.documentElement).appendChild(a);
            a.click();
            a.parentNode.removeChild(a);
        } else {
            window.open(blobUrl, '_parent');
        }
    }

  function createDownloadFn(data, filename, type) {
    return function() {
      var blob = new Blob([data], { type: type })
      download(URL.createObjectURL(blob), filename)
    } 
  }
  
  document.getElementById('public_download').addEventListener('click', createDownloadFn(public_key, 'public.txt', 'text/plain'), false)

  document.getElementById('private_download').addEventListener('click', createDownloadFn(private_key, 'private.txt', 'text/plain'), false)

  {# let encrypt = new JSEncrypt();
  encrypt.setPublicKey("{{public}}") 
  const userInfo = 'username@password'  //需要加密的账号密码
  const encryptKey =  encrypt.encrypt(userInfo); //使用公钥加密，得到密文
  console.log(encryptKey) #}
</script>
</body>
</html>