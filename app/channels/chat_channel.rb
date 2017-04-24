class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_#{params[:lobby]}"
  end

  def unsubscribed
  end

  def chat(data)
    ActionCable.server.broadcast "chat_#{params[:lobby]}",
      message: "<i>#{data['guest']}:</i> #{data['message']}"
  end
end
