class TracksController < ApplicationController
  def create
    puts params
    new_track = Track.new(episode_id: params['episode_id'], s3_string: params['s3_string'])
    if new_track.save
      render json:{
       status: 200,
       message: "Track url, successfully saved.",
       track: new_track
      }.to_json
    else
      render json: {
       status: 500,
       message: "Warning, S3 link did not save to database.",
       errors: new_track.errors.full_messages
      }.to_json
    end

  end

end
