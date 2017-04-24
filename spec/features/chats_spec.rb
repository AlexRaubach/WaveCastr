require 'rails_helper'

RSpec.feature "Chats", type: :feature do
  let!(:user) { create(:user) }
  let!(:episode) { build(:episode) }

  before(:each) do
    user.episodes << episode
    user.save
    login(user)
    at_dashboard?

    click_on("#{episode.name}")
    at_lobby?
  end

  scenario "user can post message in chat box", js: true do
    chat_input = find('#chat-input')
    chat_input.set("Testing one two")
    click_on('Send')

    expect(chat_input).to_not have_content("Testing one two")
    expect(page).to have_content("#{user.name}: Testing one two")
  end

end
