class HujahSerializer
  include FastJsonapi::ObjectSerializer

  attributes :body, :agree_count, :neutral_count, :disagree_count, :vote, :slug

  attribute :children_count do |hujah|
    hujah.children.count
  end

  # this is the owner of the hujah, not the current user
  attribute :user do |hujah| 
    {
      "id": hujah.user.id,
      "type": "user",
      "attributes": {
        "username": hujah.user.username,
        "full_name": hujah.user.full_name,
        "photo": hujah.user.photo
      }
    }
  end

  attribute :parent, if: Proc.new { |hujah| hujah.parent_id != nil } do |hujah| {
      "id": hujah.parent.id,
      "type": "hujah",
      "attributes": {
        "body": hujah.parent.body,
        "user": {
          "attributes": {
            "username": hujah.parent.user.username,
            "full_name": hujah.parent.user.full_name,
            "photo": hujah.parent.user.photo
          }
        }
      }
    }
  end

  attributes :children, if: Proc.new { |hujah| hujah.children.length != 0 } do |hujah| 

    newChildren = []
  
    hujah.children.each do |child|
      newChild = {
        "id": child.id,
        "type": "hujah",
        "attributes": {
          "body": child.body,
          "vote": child.vote,
          "agree_count": child.agree_count,
          "neutral_count": child.neutral_count,
          "disagree_count": child.disagree_count,
          "user": {
            "attributes": {
              "username": child.user.username,
              "full_name": child.user.full_name,
              "photo": child.user.photo
            }
          }
        }
      }
      newChildren << newChild
    end

    newChildren
  end

  attribute :current_user_vote do |hujah, params|
    hujah.current_user_vote(logged_in: params[:logged_in], current_user_id: params[:current_user_id])
  end
end
