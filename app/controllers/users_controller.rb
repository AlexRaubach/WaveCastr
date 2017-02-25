class UsersController < ApplicationController
    def show
      @user = current_user
      @episode = Episode.new
    end
end
