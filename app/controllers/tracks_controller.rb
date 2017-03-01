class TracksController < ApplicationController
  def create
    puts params
    new_track = Track.new(episode_id: params['episode_id'], s3_string: params['s3_string'])
    new_track.save ? head(:ok) : head(422)
  end
end
