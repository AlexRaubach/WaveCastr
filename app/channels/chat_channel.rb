class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "appearances_#{params[:lobby]}"
  end

  def unsubscribed
    puts "Leaving"
  end

  def send(data)
    puts data
    if guest
      ActionCable.server.broadcast "chat_#{params[:lobby]}",
        message: "#{guest.name}: #{data['message']}"
    end
  end
end
