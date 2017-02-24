class Guest < ApplicationRecord
  belongs_to :episode
  has_many :tracks, as: :recordable
  validates :name, presence: true
end
