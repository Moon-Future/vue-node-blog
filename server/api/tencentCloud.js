// 引入模块
const COS = require('cos-nodejs-sdk-v5')
const { tencentCloud } = require('../secret.js')

// 创建实例
const cos = new COS({
    SecretId: tencentCloud.SecretId,
    SecretKey: tencentCloud.SecretKey
});


const cosUpload = function(fileName, filePath) {
  // 分片上传
  return new Promise((resolve, reject) => {
    cos.sliceUploadFile({
      Bucket: tencentCloud.Bucket,
      Region: 'ap-guangzhou',
      Key: fileName,
      FilePath: filePath
    }, function (err, data) {
        resolve(data);
    });
  })
}

module.exports = cosUpload
