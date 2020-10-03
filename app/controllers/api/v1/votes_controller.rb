class Api::V1::VotesController < ApplicationController
  def index
    votes = Vote.all.order(updated_at: :desc)
    render json: votes
  end

  def create
    if user_has_voted?
      update_vote
      render json: vote
    else
      new_vote = user.votes.create!(vote: [vote_params[:vote]], hujah_id: hujah.id)
      if new_vote
        update_hujah_counters(vote_params[:vote], nil)
        Notification.create!(user_id: hujah.user.id, category: 4, hujah_id: hujah.id)
        render json: vote
      else
        render json: vote.errors
      end
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
    params.permit(:vote, :hujah_id, :user_id)
  end

  def vote
    @vote ||= Vote.find_by(user_id: params[:user_id], hujah_id: params[:hujah_id])
  end

  def user
    @user = User.find(vote_params[:user_id])
  end

  def hujah
    @hujah = Hujah.find(vote_params[:hujah_id])
  end

  def user_has_voted?
    vote
  end

  def update_vote
    if vote.vote.last != vote_params[:vote]
      current_vote = vote_params[:vote]
      previous_vote = vote.vote.last

      updated_votes = vote.vote
      updated_votes << current_vote
      vote.update(vote: updated_votes)
      update_hujah_counters(current_vote, previous_vote)
    end
  end

  def update_hujah_counters(current_vote, previous_vote)
    if current_vote == 1
      hujah.update(agree_count: hujah.agree_count + 1)
    elsif current_vote == 2
      hujah.update(neutral_count: hujah.neutral_count + 1)
    elsif current_vote == 3
      hujah.update(disagree_count: hujah.disagree_count + 1)
    end
    if !previous_vote.nil?
      if previous_vote == 1
        hujah.update(agree_count: hujah.agree_count - 1)
      elsif previous_vote == 2
        hujah.update(neutral_count: hujah.neutral_count - 1)
      elsif previous_vote == 3
        hujah.update(disagree_count: hujah.disagree_count - 1)
      end
    end
  end
end
