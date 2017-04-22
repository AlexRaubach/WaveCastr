require 'rails_helper'

RSpec.feature "New episodes", type: :feature do

  let!(:user) { create(:user) }

  before(:each) do
    visit('/users/sign_in')
    within('#new_user') do
      fill_in 'Email', with: user.email
      fill_in 'Password', with: user.password
      click_on('Login')
    end
  end

  scenario "user clicks on new episode and is presented with a modal form" do
    click_on('New Episode')
    expect(page).to have_content('Go')
  end

  scenario "user creates a new episode and sees herself as host" do
    click_on('New Episode')
    within('#new_episode') do
      fill_in 'episode[name]', with: 'Test Episode'
    end
    within('.modal-footer') do
      click_button('Go')
    end
    expect(page).to have_content("#{user.name}")
  end
end
