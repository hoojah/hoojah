class Hujah < ApplicationRecord

  belongs_to :user
  has_many :votes, dependent: :destroy
  has_many :children, class_name: "Hujah", foreign_key: "parent_id", dependent: :destroy
  belongs_to :parent, class_name: "Hujah", optional: true
  
  validates :body, presence: true

  def is_parent?
    self.parent == nil
  end

  def has_children?
    self.children != 0
  end
end
