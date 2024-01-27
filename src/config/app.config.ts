export default () => ({
  database: {
    url:
      process.env.DATABASE_URL ||
      'postgres://postgres:pass123@localhost:5432/mydb',
  },
  awsKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
  awsBucket: process.env.AWS_S3_BUCKET,
  uApiKey: process.env.UNSPLASH_ACCESS_KEY || 'defaultapikey',
});
