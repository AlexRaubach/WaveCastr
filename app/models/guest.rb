class Guest < ApplicationRecord
  belongs_to :episode
  validates :name, presence: true
end
