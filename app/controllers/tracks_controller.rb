class TracksController < ApplicationController
  def create
    episode = Episode.find_by(sharable_link: params['sharable_link'])
    new_track = episode.tracks.build(track_params)
    if new_track.save
      render(partial: '/layouts/notice', locals: { msg: "Recording was successfully saved.", name: "notice" }, status: 200)
    else
      render(partial: '/layouts/notice', locals: { msg: "Sorry, something went wrong. Please try again.", name: "alert" }, status: 422)
    end
  end

  private
    def track_params
      params.require('track').permit('s3_string')
    end
end
