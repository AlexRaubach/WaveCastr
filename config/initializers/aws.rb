Aws.config.update({
  region: 'us-west-1',

  credentials: Aws::Credentials.new(
    Rails.application.secrets.AWS_ACCESS_KEY_ID,
    Rails.application.secrets.AWS_SECRET_ACCESS_KEY),
})

S3_BUCKET = Aws::S3::Resource.new.bucket(Rails.application.secrets.S3_BUCKET)
