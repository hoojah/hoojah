class Hujah < ApplicationRecord

  belongs_to :user
  has_many :votes, dependent: :destroy
  has_many :flags, dependent: :destroy
  has_many :children, class_name: "Hujah", foreign_key: "parent_id", dependent: :destroy
  belongs_to :parent, class_name: "Hujah", optional: true
  
  validates :body, presence: true

  slug :set_slug

  def is_parent?
    self.parent == nil
  end

  def has_parent?
    self.parent != nil
  end

  def has_children?
    self.children != 0
  end

  def set_slug
    re = /<("[^"]*"|'[^']*'|[^'">])*>/
    self.slug = self.body.gsub(re, '').parameterize
  end

  def current_user_vote(logged_in: nil, current_user_id: nil)
    if logged_in
      if votes.joins(:user).find_by(user_id: current_user_id).nil?
        nil
      else
        vote = votes.joins(:user).find_by(user_id: current_user_id).vote.last
        if vote == 1
          "agree"
        elsif vote == 2
          "neutral"
        elsif vote == 3
          "disagree"
        end
      end
    else
      nil
    end
  end
end
