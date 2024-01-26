import { Injectable, NotFoundException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
const bucketName = process.env.AWS_S3_BUCKET;

@Injectable()
export class S3Service {
  private s3 = new AWS.S3();

  // list of files
  async listObjects(): Promise<AWS.S3.ObjectList> {
    const params: AWS.S3.ListObjectsRequest = {
      Bucket: bucketName,
    };
    const response = await this.s3.listObjects(params).promise();
    return response.Contents;
  }

  // upload file
  async upload(file: Express.Multer.File): Promise<any> {
    const params: AWS.S3.Types.PutObjectRequest = {
      Bucket: bucketName,
      Key: file.originalname,
      Body: file.buffer,
    };
    const response = await this.s3.upload(params).promise();
    return { url: response.Location };
  }

  // rename file
  async renameObject(oldKey: string, newKey: string) {
    const copyParams: any = {
      Bucket: bucketName,
      CopySource: `/${bucketName}/${oldKey}`,
      Key: newKey,
    };
    await this.s3.copyObject(copyParams).promise();
    const deleteParams: AWS.S3.DeleteObjectRequest = {
      Bucket: bucketName,
      Key: oldKey,
    };
    await this.s3.deleteObject(deleteParams).promise();
    const newObjectUrl = `https://${bucketName}.s3.amazonaws.com/${encodeURIComponent(
      newKey,
    )}`;
    return { url: newObjectUrl };
  }
  // check file
  async fileExists(bucketName: string, key: string): Promise<boolean> {
    try {
      const headObjectParams: AWS.S3.HeadObjectRequest = {
        Bucket: bucketName,
        Key: key,
      };

      await this.s3.headObject(headObjectParams).promise();
      return true; // File exists
    } catch (error) {
      if (error.code === 'NotFound') {
        return false; // File does not exist
      }

      // Handle other errors if needed
      throw error;
    }
  }

  // url download
  async generateDownloadUrl(key: string): Promise<any> {
    if (!(await this.fileExists(bucketName, key))) {
      throw new NotFoundException(`File not found: ${key}`);
    }
    const params: AWS.S3.GetObjectRequest = {
      Bucket: bucketName,
      Key: key,
    };
    const url = await this.s3.getSignedUrlPromise('getObject', params);
    return { url };
  }
}
