class Api::V1::FlagsController < ApplicationController
  def create
    flag = current_user.flags.create(flag_params)
    if flag
      render json: flag
    else
      render json: flag.errors
    end
  end

  private

  def flag_params
    params[:flag].permit(:hujah_id, :subject, :user_id)
  end
end
