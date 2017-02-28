class AppearancesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "appearances_#{params[:lobby]}"
  end

  def unsubscribed
    guest.destroy if guest
  end

  def receive(data)
    puts "AppearancesChannel is receiving data..."
    ActionCable.server.broadcast("appearances_#{params[:lobby]}", data)
  end
end
