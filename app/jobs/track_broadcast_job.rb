class TrackBroadcastJob < ApplicationJob
  queue_as :default

  def perform(track)
    ActionCable.server.broadcast "tracks_#{track.episode.sharable_link}",
      template: render_track(track)
  end

  private
    def render_track(track)
      ApplicationController.renderer.render(partial: 'tracks/track', locals: { track: track })
    end
end
