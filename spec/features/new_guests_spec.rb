require 'rails_helper'

RSpec.feature "New guests", type: :feature do

  let!(:user) { create(:user) }
  let!(:episode) { build(:episode) }

  before(:each) do
    user.episodes << episode
    user.save
  end

  scenario "guest visits episode and sees modal to register" do
    visit episode_url(sharable_link: episode.sharable_link)
    within "#register-guest-modal" do
      expect(page).to have_content "Register"
    end
  end

  # xscenario "guest registers name and sees host name and episode name", js: true do
  #   visit episode_url(sharable_link: episode.sharable_link)
  #   within "#register-guest-modal" do
  #     fill_in 'guest[name]', with: 'Alex'
  #     click_button 'Register'
  #   end
  #   expect(page).to have_content("Host: #{user.name}")
  #   expect(page).to have_content('Alex')
  # end
end
