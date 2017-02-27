class Guest < ApplicationRecord
  belongs_to :episode
  has_many :tracks, as: :recordable
  validates :name, presence: true

  before_destroy :sign_out_guest

  private
    def sign_out_guest
      puts "Signing out guest..."
      ActionCable.server.broadcast 'appearances',
        guest: self.name,
        guest_id: self.id,
        action: 'signout'
    end
end
