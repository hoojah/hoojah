class Api::V1::UsersController < ApplicationController
  def show
    if user
      render json: UserSerializer.new(user).serialized_json
    end
  end

  private

  def user_params
    params.permit(:username, :full_name, :location, :link, :photo, :headline)
  end

  def user
    @user ||= User.find(params[:id])
  end
end
