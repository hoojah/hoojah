class User < ApplicationRecord
  has_many :hujahs, dependent: :destroy
  has_many :votes, dependent: :destroy

  has_secure_password
  validates :full_name, presence: true
  validates :username, presence: true
  validates :username, uniqueness: true
  validates :username, length: { minimum: 1 }
  validates :email, presence: true
  validates :email, uniqueness: true
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i

  def self.random_photo
    [
      "https://res.cloudinary.com/hoojah/image/upload/v1586909321/user_photo_2.gif",
      "https://res.cloudinary.com/hoojah/image/upload/v1586909320/user_photo_4.gif",
      "https://res.cloudinary.com/hoojah/image/upload/v1586909321/user_photo_6.gif",
      "https://res.cloudinary.com/hoojah/image/upload/v1586909320/user_photo_7.gif"
    ].sample
  end
end
