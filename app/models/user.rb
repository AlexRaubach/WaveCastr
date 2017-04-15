class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :episodes, foreign_key: :host_id
  has_many :tracks, as: :recordable
  validates :name, uniqueness: true

  def host?(episode)
    episode.host_id == id
  end
end
