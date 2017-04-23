module EpisodesHelper
  def create_episode
    click_on("New Episode")
    within('#new_episode') do
      fill_in("episode[name]", with: "Test")
    end
    click_on("Go")
    at_lobby?
  end
end

RSpec.configure do |config|
  config.include EpisodesHelper, :type => :feature
end