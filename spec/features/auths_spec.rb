require 'rails_helper'

RSpec.feature "Auths", type: :feature do
  let!(:valid_user) { create(:user) }
  let!(:invalid_user) { User.new(name: "test", email: "test@test.com", password: "password") }

  scenario "I log in with an invalid email" do
    visit "/"
    login(invalid_user)
    expect(page).to have_content "Invalid Email or password"
  end

  scenario "I log in with a valid email" do
    visit "/"
    login(valid_user)
    at_dashboard?
  end
end
