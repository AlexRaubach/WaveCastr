require 'rails_helper'

RSpec.describe Track, type: :model do
  
  let(:episode) { Episode.create(name: "My podcast", description: "My first one!") }
  let(:guest) { episode.guests.new(name: "Oliver") }
  let(:track) { Track.new(recordable_id: 1, recordable_type: "Guest", s3_string: "secret") }

  context "attributes" do
    it "has a recordable id" do
      expect(track.recordable_id).to eq 1
    end

    it "has a recordable type" do
      expect(track.recordable_type).to eq "Guest"
    end

    it "has an s3 string" do
      expect(track.s3_string).to eq "secret"
    end
  end

  context "associations" do
    it "belongs to a guest" do
      track.recordable = guest
      expect(track.recordable).to be_instance_of(Guest)
    end
  end

end
