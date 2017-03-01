class GuestCleanupJob < ApplicationJob
  queue_as :default

  def perform(guest)
    ActionCable.server.broadcast "appearances_#{guest.episode.sharable_link}",
      guest: guest.name,
      guest_id: guest.id,
      status: 'signout'
  end
end
