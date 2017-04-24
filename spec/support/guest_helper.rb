module GuestHelper
  def new_incognito_window
    new_window = open_new_window
    within_window new_window do
      Capybara.current_session.driver.clear_cookies
    end
    new_window
  end

  def create_guest(episode_url)
    visit episode_url
    within("#new_guest") do
      fill_in('guest[name]', with: "Alex")
    end
    click_on("Go")
  end
end

RSpec.configure do |config|
  config.include GuestHelper, :type => :feature
end
