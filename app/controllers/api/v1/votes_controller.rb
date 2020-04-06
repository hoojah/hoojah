class Api::V1::VotesController < ApplicationController
  def index
    votes = Vote.all.order(updated_at: :desc)
    render json: votes
  end

  def create
    vote = Vote.create!(vote: [vote_params[:vote]], hujah_id: vote_params[:hujah_id])
    if vote
      render json: vote
    else
      render json: vote.errors
    end
  end

  def show
    if vote
      if vote.has_children?
        votes = vote.children.order(updated_at: :desc)
      else
        votes = []
      end
      
      if vote.is_parent?
        parent_vote = {}
      else
        parent_vote = vote.parent
      end
      render json: { 
        vote: vote, 
        votes: votes,
        parentvote: parent_vote
      }
    else
      render json: vote.errors
    end
  end

  def destroy
    vote&.destroy
    render json: { message: 'Hoojah deleted!' }
  end

  def new
  end

  private

  def vote_params
    params.permit(:vote, :hujah_id)
  end

  def vote
    @vote ||= Vote.find(params[:id])
  end
end
