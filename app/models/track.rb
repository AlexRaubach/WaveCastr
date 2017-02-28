class Track < ApplicationRecord
  validates_presence_of :s3_string, :episode_id
  belongs_to :episode


  def url
    S3_BUCKET.url.to_s + s3_string.to_s
  end

  def name
    s3_string.match(/\__(.*)\__/)[1]
  end

  def audio_format
    s3_string..match(/\.([0-9a-z]+)(?=[?#])|(?:[\w]+)$/)[0]
  end


end
# all.each do |x|
#   puts x.s3_string
# end
