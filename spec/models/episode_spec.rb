require 'rails_helper'

RSpec.describe Episode, type: :model do
  let(:episode) { Episode.new(name: "My podcast", description: "My first one!", sharable_link: "xokieEku") }

  context "attributes" do

    it "has a name" do
      expect(episode.name).to eq "My podcast"
    end

    it "has a description" do
      expect(episode.description).to eq "My first one!"
    end 

    it "has a sharable link" do
      expect(episode.sharable_link).to eq "xokieEku"
    end

  end

  context "associations" do

    it "has many guests" do
      guest = episode.guests.build(name: "Oliver")
      expect(episode.guests).to include(guest)
    end

  end
end
