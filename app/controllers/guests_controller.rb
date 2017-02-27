class GuestsController < ApplicationController
  def create
    guest = Guest.new(guest_params)
    if guest.save
      puts "Setting guest id cookie..."
      cookies.signed[:guest_id] = guest.id
      ActionCable.server.broadcast 'appearances',
        guest: guest.name,
        guest_id: guest.id,
        action: 'signin'
      head :ok
    else
      head 422
    end
  end

  private
    def guest_params
      params.require(:guest).permit(:name, :episode_id)
    end
end
