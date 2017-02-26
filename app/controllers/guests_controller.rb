class GuestsController < ApplicationController
  def create
    guest = Guest.new(guest_params)
    if guest.save
      session[:guest_id] = guest.id
      redirect_to episode_path(sharable_link: guest.episode.sharable_link)
    end
  end

  private
    def guest_params
      params.require(:guest).permit(:name, :episode_id)
    end
end
