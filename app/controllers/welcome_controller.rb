class WelcomeController < ApplicationController
  def index
  end

  def show

  end

  def create

  end

  private

  def set_s3_direct_post
    @s3_direct_post = Rails.application.secrets.S3_BUCKET.presigned_post(
    key: "uploads/#{SecureRandom.uuid}/${filename}", success_action_status: '201', acl: 'public-read')
  end

end
