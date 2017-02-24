class Track < ApplicationRecord
  belongs_to :recordable, polymorphic: true
  validates :recordable_type, presence: true
end
