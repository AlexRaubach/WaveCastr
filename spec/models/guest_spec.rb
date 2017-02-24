require 'rails_helper'

RSpec.describe Guest, type: :model do
  let(:episode) { Episode.new(name: "My podcast", description: "My first one!", sharable_link: "xokieEku") }
  let(:guest) { Guest.new(name: "Oliver") }
  let(:user) { User.create(email: "oliver@gmail.com", password: "password") } 
  let(:track) { Track.new(recordable_id: 1, recordable_type: "Guest", s3_string: "secret") }

  context "attributes" do
 
    it "has a name" do
      expect(guest.name).to eq "Oliver"
    end

  end

  context "associations" do

    it "belongs to episode" do
      guest.episode = episode
      expect(guest.episode).to eq episode
    end

    it "has many tracks" do
      guest.tracks << track
      expect(guest.tracks).to include track 
    end

  end

  context "validations" do

    it "must have name" do
      guest.episode = episode
      guest.name = nil
      expect(guest).to be_invalid
    end

  end
end
