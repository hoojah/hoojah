class User < ApplicationRecord
  has_many :hujahs, dependent: :destroy
  has_many :votes, dependent: :destroy

  has_secure_password
  validates :first_name, presence: true
  validates :username, presence: true
  validates :username, uniqueness: true
  validates :username, length: { minimum: 1 }
  validates :email, presence: true
  validates :email, uniqueness: true
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
end
