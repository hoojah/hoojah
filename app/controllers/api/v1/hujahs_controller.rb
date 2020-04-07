class Api::V1::HujahsController < ApplicationController
  def index
    hujahs = Hujah.all.order(updated_at: :desc)
    render json: hujahs
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

      # options = {}
      # options[:include] = [:user, :children, :parent]
      # render json: HujahSerializer.new(hujah, options).serialized_json

      render json: HujahSerializer.new(hujah).serialized_json

    #   if hujah.has_children?
    #     hujahs = hujah.children.order(updated_at: :desc)
    #   else
    #     hujahs = []
    #   end
      
    #   if hujah.is_parent?
    #     parent_hujah = {}
    #   else
    #     parent_hujah = hujah.parent
    #   end
    #   render json: { 
    #     hujah: hujah, 
    #     hujahs: hujahs,
    #     parentHujah: parent_hujah
    #   }
    # else
    #   render json: hujah.errors
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
end
