class Api::V1::HujahsController < ApplicationController
  def index
    
    hujahs = Hujah.all.order(updated_at: :desc)
    serialized_hujahs = HujahSerializer.new(hujahs, params: {logged_in: logged_in?, current_user_id: current_user&.id }).serializable_hash
    render json: serialized_hujahs

  end

  def create
    hujah = current_user.hujahs.create(hujah_params)
    if hujah
      render json: hujah
    else
      render json: hujah.errors
    end
  end

  def show
    if hujah

      serialized_hujah = HujahSerializer.new(hujah, params: {logged_in: logged_in?, current_user_id: current_user&.id }).serializable_hash

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

end
