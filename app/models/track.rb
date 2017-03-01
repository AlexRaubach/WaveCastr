class Track < ApplicationRecord
  validates_presence_of :s3_string, :episode_id
  belongs_to :episode

  after_create { TrackBroadcastJob.perform_later(self) }
  
  def url
    S3_BUCKET.url.to_s + s3_string.to_s
  end

  def name
    s3_string.slice(/\__(.*)\__/)
  end

  def audio_format
    s3_string.slice(/\.[0-9a-z]+$/i)
  end


end
