class Flag < ApplicationRecord
  belongs_to :user
  belongs_to :hujah

  enum subject: {
    spam: 0,
    abusive: 1,
    irrelevant: 2
  }
end
