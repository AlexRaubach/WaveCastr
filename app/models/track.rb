require 'nokogiri'
class Track < ApplicationRecord
  validates_presence_of :s3_string
  belongs_to :episode

  after_create { TrackBroadcastJob.perform_later(self) }
  
  def download_url
    location
  end

  def name
    key.sub(/.*__(.+)__.*/, '\1')
  end

  private
    def key
      xml_doc.xpath('//Key').text
    end

    def location
      xml_doc.xpath('//Location').text
    end

    def xml_doc
      Nokogiri::XML(s3_string)
    end
end
