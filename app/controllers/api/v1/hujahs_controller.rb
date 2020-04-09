class Api::V1::HujahsController < ApplicationController
  def index
    
    hujahs = Hujah.all.order(updated_at: :desc)

    serialized_hujahs = Hash["data", []]
    hujahs.each do |hujah_to_process|
      serialized_hujah = JSON.parse(HujahSerializer.new(hujah_to_process).serialized_json)
      serialized_hujah["data"]["attributes"].merge!({"has_voted" => user_has_voted?(hujah_to_process)})
      serialized_hujahs["data"] << serialized_hujah["data"]
    end

    render json: serialized_hujahs

  end

  def create
    hujah = current_user.hujahs.create!(hujah_params)
    if hujah
      render json: hujah
    else
      render json: hujah.errors
    end
  end

  def show
    if hujah

      serialized_hujah = JSON.parse(HujahSerializer.new(hujah).serialized_json)
      serialized_hujah["data"]["attributes"].merge!({"has_voted" => user_has_voted?(hujah)})

      render json: serialized_hujah
    end
  end

  def destroy
    hujah&.destroy
    render json: { message: 'Hoojah deleted!' }
  end

  def new
  end

  private

  def hujah_params
    params.permit(:body, :parent_id)
  end

  def hujah
    @hujah ||= Hujah.find(params[:id])
  end

  def user_has_voted?(hujah)
    if logged_in?
      hujah.votes.joins(:user).where(user_id: current_user.id).any?
    else
      false
    end
  end
end
