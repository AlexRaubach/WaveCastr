class Guest < ApplicationRecord
  belongs_to :episode
  validates :name, presence: true

  after_create { AppearanceBroadcastJob.perform_later(self) }
  before_destroy { GuestCleanupJob.perform_later(self) }

end
