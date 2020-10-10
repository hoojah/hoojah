class Api::V1::NotificationsController < ApplicationController
  before_action :find_user

  def index
    notifications = @user.notifications.order(created_at: :asc)

    serialized_notifications = NotificationSerializer.new(notifications, params: {logged_in: logged_in?, current_user_id: current_user&.id }).serializable_hash

    render json: serialized_notifications
  end

  def update
    if notification.update!(read: notification_params[:read])
      render json: {
        status: 200
      }
    else
      render json: notification.errors
    end
  end

  def destroy
    notification&.destroy
    render json: { 
      message: 'Notification deleted!',
      status: 200
    }
  end

  private

  def notification_params
    params[:notification].permit(:read)
  end

  def notification
    @notification ||= Notification.find(params[:id])
  end

  def find_user
    @user ||= User.find_by_username(params[:username])
  end
end
