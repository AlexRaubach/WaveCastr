class RecorderChannel < ApplicationCable::Channel
  def subscribed
    stream_from "recorder_#{params[:lobby]}"
  end

  def start(data)
    ActionCable.server.broadcast("recorder_#{params[:lobby]}", data)
  end
end
