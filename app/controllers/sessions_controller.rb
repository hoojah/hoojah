class SessionsController < ApplicationController
  def create
    @user = User.find_by(email: session_params[:email])
  
    if @user && @user.authenticate(session_params[:password])
      login!
      render json: {
        logged_in: true,
        user: @user,
        unread_notifications_count: @user.unread_notifications_count
      }
    else
      render json: { 
        status: 401,
        errors: ["The email or password is incorrect. Please verify your credentials and try again", "If you don't have an account yet, click the button above to sign up!"]
      }
    end
  end
  
  def is_logged_in?
    if logged_in? && current_user
      render json: {
        logged_in: true,
        user: current_user,
        unread_notifications_count: current_user.unread_notifications_count
      }
    else
      render json: {
        logged_in: false,
        message: "User is not logged in"
      }
    end
  end
  
  def destroy
    logout!
    render json: {
      status: 200,
      logged_out: true
    }
  end
  
  private

  def session_params
    params.require(:user).permit(:username, :email, :password)
  end
end
