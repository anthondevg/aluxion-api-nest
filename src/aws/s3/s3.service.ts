import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  private s3 = new AWS.S3();
  async listObjects(bucketName: string): Promise<AWS.S3.ObjectList> {
    const params: AWS.S3.ListObjectsRequest = {
      Bucket: bucketName,
    };

    const response = await this.s3.listObjects(params).promise();
    return response.Contents;
  }
  async upload(file: Express.Multer.File, bucketName: string): Promise<string> {
    const params: AWS.S3.Types.PutObjectRequest = {
      Bucket: bucketName,
      Key: file.originalname,
      Body: file.buffer,
    };
    const response = await this.s3.upload(params).promise();

    return response.Location;
  }

  async getFileUrl(key: string, bucketName: string): Promise<string> {
    const params: AWS.S3.Types.GetObjectRequest = {
      Bucket: bucketName,
      Key: key,
    };

    const signedUrl = await this.s3.getSignedUrlPromise('getObject', params);

    return signedUrl;
  }
}
