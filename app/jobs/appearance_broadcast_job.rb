class AppearanceBroadcastJob < ApplicationJob
  queue_as :default

  def perform(guest)
    puts "Rendering guest to page"
    ActionCable.server.broadcast "appearances_#{guest.episode.sharable_link}",
      is_host: guest.is_host,
      status: 'signin',
      template: render_guest(guest)
  end

  private
    def render_guest(guest)
      ApplicationController.renderer.render(partial: 'guests/guest', locals: { guest: guest })
    end
end
