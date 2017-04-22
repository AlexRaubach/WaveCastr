module PageHelper
  def at_lobby?
    expect(page).to have_content("Activate Mics")
  end

  def at_dashboard?
    expect(page).to have_content("New Episode")
  end
end

RSpec.configure do |config|
  config.include PageHelper, :type => :feature
end