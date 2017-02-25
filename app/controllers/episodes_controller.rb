class EpisodesController < ApplicationController
  before_action :authenticate_user!

  def show
    @episode = Episode.find_by(sharable_link: params[:sharable_link])
  end

  def create
    @episode = current_user.episodes.build(episode_params)
    if @episode.save
      redirect_to episode_path(@episode, sharable_link: @episode.sharable_link)
    else
      flash[:error] = @episode.errors.full_messages.first
      redirect_to user_path(current_user)
    end
  end

  def destroy
    Episode.find(params[:id]).destroy
    redirect_to user_path(current_user)
  end

  private
    def episode_params
      params.require(:episode).permit(:name, :description)
    end

end
