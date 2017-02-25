require 'rails_helper'

RSpec.describe Track, type: :model do

  let(:user) { User.create(email: "oliver@gmail.com", password: "password") } 
  let(:episode) { Episode.create(name: "My podcast", description: "My first one!") }
  let(:guest) { episode.guests.new(name: "Oliver") }
  let(:track) { Track.new(s3_string: "secret") }

  context "attributes" do
    it "has an s3 string" do
      expect(track.s3_string).to eq "secret"
    end
  end

  context "associations" do

    it "belongs to an episode" do
      episode.tracks << track 
      expect(episode.tracks).to include track
    end

    it "can belong to a guest" do
      track.recordable = guest
      expect(track.recordable).to be_instance_of(Guest)
    end

    it "can belong to a user" do
      track.recordable = user
      expect(track.recordable).to be_instance_of(User)
    end
  end

end
