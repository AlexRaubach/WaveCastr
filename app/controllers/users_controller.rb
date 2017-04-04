class UsersController < ApplicationController
  # before_action :authenticate_user!
  before_action :signin_test_user

  def show
    @episode = Episode.new
  end

  protected

  def signin_test_user
    user = User.find_by(email: "oliverduncan@icloud.com")
    sign_in(:user, user)
  end

end
