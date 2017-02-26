class AppearancesChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'appearances'
  end
end
