class TracksChannel < ApplicationCable::Channel
  def subscribed
    stream_from "tracks_#{params[:lobby]}"
  end

  def receive(data)
    ActionCable.server.broadcast("tracks_#{params[:lobby]}", data)
  end
end

