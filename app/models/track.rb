class Track < ApplicationRecord
  belongs_to :recordable, polymorphic: true
  validates :recordable_type, presence: true


  def s3_link
    S3_BUCKET.url.to_s + s3_string.to_s
  end
end
