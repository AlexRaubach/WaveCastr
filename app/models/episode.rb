class Episode < ApplicationRecord
  before_save :assign_sharable_link, on: :create
  belongs_to :host, class_name: "User"
  has_many :guests, dependent: :destroy
  has_many :tracks, dependent: :destroy
  validates :name, presence: true

  private
    def assign_sharable_link
      self.sharable_link ||= SecureRandom.hex(4)
    end
end
