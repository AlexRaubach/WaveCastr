require 'rails_helper'

RSpec.feature "New episodes", type: :feature do

  let!(:user) { create(:user) }

  before(:each) do
    visit('/users/sign_in')
    within('#new_user') do
      fill_in 'Email', with: user.email
      fill_in 'Password', with: user.password
    end
    click_on('Log in')
  end

  scenario "user clicks on new episode and is presented with a modal form" do
    click_on('New Episode')
    expect(page).to have_content('Go')
  end 
end
