class Guest < ApplicationRecord
  belongs_to :episode
  validates :name, presence: true

  before_destroy :sign_out_guest

  private
    def sign_out_guest
      puts "Signing out guest..."
      ActionCable.server.broadcast "appearances_#{self.episode.sharable_link}",
        guest: self.name,
        guest_id: self.id,
        action: 'signout'
    end
end
