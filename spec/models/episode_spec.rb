require 'rails_helper'

RSpec.describe Episode, type: :model do
  let!(:episode) { Episode.new(name: "My podcast", description: "My first one!") }

  context "attributes" do

    it "has a name" do
      expect(episode.name).to eq "My podcast"
    end

    it "has a description" do
      expect(episode.description).to eq "My first one!"
    end 

    it "creates sharable_link on save" do
      episode.save
      expect(episode.sharable_link).to be_instance_of(String)
    end

  end

  context "associations" do

    it "has many guests" do
      guest = episode.guests.build(name: "Oliver")
      expect(episode.guests).to include(guest)
    end

  end

  context "validations" do

    it "must have a name" do
      episode.name = nil
      expect(episode).to be_invalid
    end

  end
end
