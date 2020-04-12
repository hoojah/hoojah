class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :username, :full_name, :photo, :location, :headline, :link

  attribute :hujah_count do |user|
    user.hujahs.length
  end

  attributes :hujahs, if: Proc.new { |user| user.hujahs.length != 0 } do |user| 

    all_hujah = []
  
    user.hujahs.each do |child_hujah|
      temp_child_hujah = {
        "id": child_hujah.id,
        "type": "hujah",
        "attributes": {
          "body": child_hujah.body,
          "vote": child_hujah.vote,
          "agree_count": child_hujah.agree_count,
          "neutral_count": child_hujah.neutral_count,
          "disagree_count": child_hujah.disagree_count,
          "user": {
            "attributes": {
              "username": child_hujah.user.username,
              "full_name": child_hujah.user.full_name
            }
          }
        }
      }
      all_hujah << temp_child_hujah
    end

    all_hujah
  end
end
