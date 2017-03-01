class TracksController < ApplicationController
  def create
    episode = Episode.find_by(sharable_link: params['sharable_link'])
    new_track = episode.tracks.build(track_params)
    new_track.save ? head(:ok) : head(422)
  end

  private
    def track_params
      params.require('track').permit('s3_string')
    end
end
