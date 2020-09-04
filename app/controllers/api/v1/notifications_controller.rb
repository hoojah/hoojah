class Api::V1::NotificationsController < ApplicationController
  before_action :find_user

  def index
    notifications = @user.notifications.order(created_at: :asc)

    serialized_notifications = NotificationSerializer.new(notifications, params: {logged_in: logged_in?, current_user_id: current_user&.id }).serializable_hash

    render json: serialized_notifications
  end

  private

  def find_user
    @user ||= User.find(params[:user_id])
  end
end
