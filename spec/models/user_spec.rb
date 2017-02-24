require 'rails_helper'

RSpec.describe User, type: :model do
  let!(:episode) { Episode.new(name: "My podcast", description: "My first one!") }
  let!(:user) { User.create!(email: "oliver@gmail.com", password: "password") }

  context "associations" do
    it "has many episodes" do
      user.episodes << episode
      expect(user.episodes).to include(episode)
    end
  end
end
