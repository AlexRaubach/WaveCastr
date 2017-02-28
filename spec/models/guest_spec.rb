require 'rails_helper'

RSpec.describe Guest, type: :model do

  let(:user) { create(:user) } 
  let(:guest) { build(:guest) }
  let(:episode) { build(:episode) } 
  let(:track) { Track.new }

  context "attributes" do
 
    it "has a name" do
      expect(guest.name).to eq "Alex"
    end

  end

  context "associations" do

    it "belongs to episode" do
      guest.episode = episode
      expect(guest.episode).to eq episode
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
