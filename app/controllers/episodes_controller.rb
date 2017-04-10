class EpisodesController < ApplicationController

  before_action :find_episode, only: [:show]
  before_action :authenticate_user!, only: [:create, :destroy]

  def show
    @guest = Guest.new
    set_s3_direct_post(@episode)
    @chat_keys = [ENV['CHAT_SUBSCRIBE_KEY'], ENV['CHAT_PUBLISH_KEY']]
    if !current_user || !current_user.host?(@episode)
      render(partial: 'episodes/guest_page', layout: false)
    end
  end

  def create
    @episode = current_user.episodes.build(episode_params)
    if @episode.save
      redirect_to episode_path(sharable_link: @episode.sharable_link)
    else
      flash[:error] = @episode.errors.full_messages.first
      redirect_to user_path(current_user)
    end
  end

  def destroy
    episode = find_episode
    delete_s3_objects(episode)
    episode.destroy
    redirect_to user_path(current_user)
  end

  private
    def find_episode
      @episode = Episode.find_by(sharable_link: params[:sharable_link]) 
      @episode ? @episode : not_found
    end

    def set_s3_direct_post(episode)
      @s3_direct_post = S3_BUCKET.presigned_post(
        key: "wavecastr/#{episode.host.name}/episode_#{episode.sharable_link}/#{SecureRandom.uuid}/${filename}", success_action_status: '201', acl: 'public-read')
    end

    def delete_s3_objects(episode)
      prefix = "wavecastr/#{current_user.name}/episode_#{episode.sharable_link}"
      S3_BUCKET.objects(prefix: prefix).each do |obj|
        obj.delete
      end 
    end

    def episode_params
      params.require(:episode).permit(:name, :description)
    end
end
