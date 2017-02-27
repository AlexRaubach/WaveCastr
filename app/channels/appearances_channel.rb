class AppearancesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "appearances_#{params[:lobby]}"
  end

  def unsubscribed
    guest.destroy
  end
end
