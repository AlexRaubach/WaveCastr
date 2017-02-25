class EpisodesController < ApplicationController
  before_action :authenticate_user!

  def show
    @episode = Episode.find_by(sharable_link: params[:sharable_link]) 
  end

  def create
    @episode = Episode.new(episode_params)
    if @episode.save
      redirect_to episode_path(episode)
    else
      flash[:error] = @episode.errors.full_messages.first
      redirect_to episode_path(episode)
    end
  end

  def destroy
    Episode.find(params[:id]).destroy
    redirect_to user_path(current_user)
  end
end
