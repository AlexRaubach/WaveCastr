class UsersController < ApplicationController
  before_action :authenticate_user!

  def show
    @episode = Episode.new
  end


end
