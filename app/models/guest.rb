class Guest < ApplicationRecord
  belongs_to :episode
  validates :name, presence: true

  before_destroy { GuestCleanupJob.perform_later(self) }

  def appear
    AppearanceBroadcastJob.perform_later(self)
  end

end
