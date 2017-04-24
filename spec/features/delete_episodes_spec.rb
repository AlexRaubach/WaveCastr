require 'rails_helper'

RSpec.feature "DeleteEpisodes", type: :feature do

  let!(:user) { create(:user) }
  let!(:episode) { build(:episode) }

  before(:each) do
    user.episodes << episode
    user.save
    login(user)
  end

  scenario "user can delete episodes from dashboard" do
    expect(page).to have_content("My test podcast")
    within(first('.episode')) do
      click_on("Delete")
    end
      expect(page).not_to have_content("My test podcast")
  end

end
