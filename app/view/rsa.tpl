<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>rsa生成</title>
  <script></script>  
</style>
<script src="https://cdn.bootcss.com/jsencrypt/3.0.0-beta.1/jsencrypt.min.js"></script>
</head>
<body>
<div>
  <span>公钥</span>
  <input type="textarea" value="{{public}}"/>
</div>
<div>
  <span>私钥</span>
  <input type="textarea" value="{{private}}"/>
</div>
<script>
  let encrypt = new JSEncrypt();
  encrypt.setPublicKey("{{public}}") 
  const userInfo = 'username@password'  //需要加密的账号密码
  const encryptKey =  encrypt.encrypt(userInfo); //使用公钥加密，得到密文
  console.log(encryptKey)
</script>
</body>
</html>