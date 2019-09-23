require('dotenv').config()
// Load AWS SDK, file system for Node.js
const AWS = require('aws-sdk')
// Set the region
AWS.config.update({ region: 'us-east-1' })

// Create S3 service object
const s3 = new AWS.S3({ apiVersion: '2006-03-01' })

const fileUploadApi = (key, file, filetype) => {
  return new Promise((resolve, reject) => {
    // call S3 to retrieve upload file to specified bucket
    const uploadParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: key,
      Body: file,
      ACL: 'public-read',
      ContentType: filetype
    }
    // call S3 to retrieve upload file to specified bucket
    s3.upload(uploadParams, function (err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

module.exports = fileUploadApi
