class AppearancesChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'appearances'
  end

  def unsubscribed
    guest.destroy
  end
end
