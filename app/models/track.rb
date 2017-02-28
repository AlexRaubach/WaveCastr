class Track < ApplicationRecord
  validates_presence_of :s3_string, :episode_id
  belongs_to :episode


  def s3_link
    S3_BUCKET.url.to_s + s3_string.to_s
  end
end
