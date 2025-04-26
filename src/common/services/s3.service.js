const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, AWS_ENDPOINT, AWS_FORCE_PATH_STYLE, AWS_BUCKET_NAME } = require('../../config/env');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const s3Client = new S3Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
    endpoint: AWS_ENDPOINT,
    forcePathStyle: AWS_FORCE_PATH_STYLE === 'true',
});

async function uploadFile(buffer, originalName, mimetype) {
    const fileExt = path.extname(originalName);
    const fileName = `${uuidv4()}${fileExt}`;

    const uploadParams = {
        Bucket: AWS_BUCKET_NAME,
        Key: fileName,
        Body: buffer,
        ContentType: mimetype,
        // ACL: 'public-read', // щоб можна було дивитися файл напряму по URL
    };

    await s3Client.send(new PutObjectCommand(uploadParams));

    // Повертаємо повний URL
    const fileUrl = `${AWS_ENDPOINT}/${AWS_BUCKET_NAME}/${fileName}`;
    return fileUrl;
}

module.exports = {
    uploadFile,
};
