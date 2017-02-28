class Track < ApplicationRecord
  validates_presence_of :s3_string, :episode_id
  belongs_to :episode


  def url
    S3_BUCKET.url.to_s + s3_string.to_s
  end

  def method_name

  end
end
# all.each do |x|
#   puts x.s3_string
# end
