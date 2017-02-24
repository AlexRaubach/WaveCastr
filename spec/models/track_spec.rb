require 'rails_helper'

RSpec.describe Track, type: :model do
  let(:track) { Track.new(recordable_id: 1, recordable_type: "User", s3_string: "secret") }

  context "attributes" do
    it "has a recordable id" do
      expect(track.recordable_id).to eq 1
    end

    it "has a recordable type" do
      expect(track.recordable_type).to eq "User"
    end

    it "has an s3 string" do
      expect(track.s3_string).to eq "secret"
    end
  end
end
