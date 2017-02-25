class EpisodesController < ApplicationController
  before_action :set_s3_direct_post, only: [:create]
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

  def set_s3_direct_post
    @s3_direct_post = S3_BUCKET.presigned_post(
    key: "uploads/#{SecureRandom.uuid}/${filename}", success_action_status: '201', acl: 'public-read')
  end

    def episode_params
      params.require(:episode).permit(:name, :description)
    end


end
