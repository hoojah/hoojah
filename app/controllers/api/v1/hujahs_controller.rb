class Api::V1::HujahsController < ApplicationController
  def index
    hujahs = Hujah.all.order(updated_at: :desc)
    render json: hujahs
  end

  def create
    hujah = Hujah.create!(hujah_params)
    if hujah
      render json: hujah
    else
      render json: hujah.errors
    end
  end

  def show
    if hujah
      render json: hujah
    else
      render json: hujah.errors
    end
  end

  def destroy
    hujah&.destroy
    render json: { message: 'Hoojah deleted!' }
  end

  private

  def hujah_params
    params.permit(:body)
  end

  def hujah
    @hujah ||= Hujah.find(params[:id])
  end
end
