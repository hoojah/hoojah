class Api::V1::FlagsController < ApplicationController\
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
    params.permit(:hujah_id, :subject)
  end
end
