require 'rails_helper'

RSpec.feature "Appearances", type: :feature, js: true do
  let!(:user) { create(:user) }

  before(:each) do
    login(user)
    create_episode
    @episode_url = page.current_url
  end

  scenario "A new guest appears" do
    new_window = new_incognito_window
    within_window new_window do
      create_guest(@episode_url)
    end

    expect(page).to have_content "Alex"
    expect(page).to have_content user.name

    new_window.close
  end

  scenario "A guest leaves" do
    new_window = new_incognito_window
    within_window new_window do
      create_guest(@episode_url)
    end

    # I shouldn't need sleep!!
    sleep(2)
    new_window.close

    expect(page).to have_content user.name
    expect(page).to_not have_content "Alex"
  end
end
