class Api::V1::HujahsController < ApplicationController
  def index
    hujahs = Hujah.all.order(updated_at: :desc)

    serialized_hujahs = Hash["data", []]
    hujahs.each do |hujah_to_process|
      serialized_hujah = JSON.parse(HujahSerializer.new(hujah_to_process).serialized_json)
      serialized_hujah["data"]["attributes"].merge!({"current_user_vote" => current_user_vote(hujah_to_process)})
      serialized_hujahs["data"] << serialized_hujah["data"]
    end

    render json: serialized_hujahs

  end

  def create
    hujah = current_user.hujahs.create!(hujah_params)
    if hujah
      serialized_hujah = JSON.parse(HujahSerializer.new(hujah).serialized_json)
      serialized_hujah["data"]["attributes"].merge!({"current_user_vote" => current_user_vote(hujah)})

      render json: serialized_hujah
    else
      render json: hujah.errors
    end
  end

  def show
    if hujah
      serialized_hujah = JSON.parse(HujahSerializer.new(hujah).serialized_json)
      serialized_hujah["data"]["attributes"].merge!({"current_user_vote" => current_user_vote(hujah)})

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
    params.permit(:body, :parent_id, :vote)
  end

  def hujah
    @hujah ||= Hujah.find(params[:id])
  end

  def current_user_vote(hujah)
    if logged_in?
      if hujah.votes.joins(:user).find_by(user_id: current_user.id).nil?
        nil
      else
        vote = hujah.votes.joins(:user).find_by(user_id: current_user.id).vote.last
        if vote == 1
          "agree"
        elsif vote == 2
          "neutral"
        elsif vote == 3
          "disagree"
        end
      end
    else
      nil
    end
  end
end
