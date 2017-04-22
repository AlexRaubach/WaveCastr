module LoginHelper
  def login(user)
    visit('/users/sign_in')
    within('#new_user') do
      fill_in 'Email', with: user.email
      fill_in 'Password', with: user.password
      click_on('Login')
    end
  end
end

RSpec.configure do |config|
  config.include LoginHelper, :type => :feature
end