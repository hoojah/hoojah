class Notification < ApplicationRecord
  belongs_to :user

  enum model_type: {
    system: 0,
    announcement: 1,
    flag: 2,
    new_hoojah_response: 3,
    new_vote: 4
  }

  scope :unread, -> { where(read: false) }
end
