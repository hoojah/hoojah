class HujahSerializer
  include FastJsonapi::ObjectSerializer

  attributes :body, :agree_count, :neutral_count, :disagree_count

  # has_many :children, record_type: :hujah, serializer: HujahSerializer
  # belongs_to :parent, record_type: :hujah, serializer: HujahSerializer
  # belongs_to :user

  attribute :parent, if: Proc.new { |hujah|
    hujah.parent_id != nil
  } do |hujah| {
      "id": hujah.parent.id,
      "body": hujah.parent.body,
      "username": hujah.parent.user.username,
      "full_name": hujah.parent.user.full_name
    }
  end

  attribute :user do |hujah| 
    {
      "id": hujah.user.id,
      "username": hujah.user.username,
      "full_name": hujah.user.full_name
    }
  end

  attributes :children, if: Proc.new { |hujah|
    hujah.children.length != 0
  } do |hujah| 

    newChildren = []
  
    hujah.children.each do |child|
      newChild = {
        "id": child.id,
        "body": child.body,
        "username": child.user.username,
        "full_name": child.user.full_name
      }
      newChildren << newChild
    end

    newChildren
  end
end
