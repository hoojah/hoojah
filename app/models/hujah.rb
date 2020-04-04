class Hujah < ApplicationRecord
  validates :body, presence: true

  has_many :children, class_name: "Hujah", foreign_key: "parent_id"
  belongs_to :parent, class_name: "Hujah", optional: true

  def is_parent?
    self.parent == nil
  end

  def has_children?
    self.children != 0
  end
end
