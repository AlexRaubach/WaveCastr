class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_#{params[:lobby]}"
  end

  def unsubscribed
  end

  def chat(data)
    ActionCable.server.broadcast "chat_#{params[:lobby]}",
      message: "#{data['guest']}: #{data['message']}"
  end
end
