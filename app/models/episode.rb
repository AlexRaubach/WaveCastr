class Episode < ApplicationRecord
  before_save :assign_sharable_link, on: :create
  has_many :guests
  validates :name, presence: true

  private
    def assign_sharable_link
      self.sharable_link = SecureRandom.hex(4)
    end
end
