class NotificationSerializer
  include FastJsonapi::ObjectSerializer

  attributes :body, :category, :read

  attribute :hujah do |notification|
    if notification.hujah_id
      hujah = Hujah.find(notification.hujah_id)
      {
        "id": hujah.id,
        "body": hujah.body
      }
    end
  end

  attribute :subject_user do |notification|
    if notification.subject_user_id
      subject_user = User.find(notification.subject_user_id)
      {
        "id": subject_user.id,
        "username": subject_user.username
      }
    end
  end
end
