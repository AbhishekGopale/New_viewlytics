const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

AWS.config = new AWS.Config({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.ACCESS_SECRET,
    region: process.env.AWS_REGION,
    signatureVersion: "v4",
});

const s3 = new AWS.S3();

var link;
exports.fileUploadToS3 = async function fileUploadToS3(file, folder) {
    var fileName = `${Date.now()}-${file.name}`;
    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: `${folder}/${fileName}`,
        Body: file.data,
        ACL: "public-read",
    };

    var dataLink = await s3.upload(params, function (err, data) {
        if (err) {
            console.log(err);
            throw err;
        }
        return `File uploaded successfully. ${data.Location}`;
    });
    return {
        link: `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION
            }.amazonaws.com/${folder}/${fileName.trim()}`,
    };
};

exports.deleteImage = async (link, folder) => {
    await s3.deleteObject(
        {
            Bucket: process.env.S3_BUCKET,
            Key: `${folder}/${link}`,
        },
        function (err, data) {
            if (err) {
                console.log(err, "Not Delete image");
                throw err;
            }
        }
    );
};
