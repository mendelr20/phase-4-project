class UsersController < ApplicationController
  skip_before_action :authorize, only: [:create]
  def create
    user = User.new(user_params)
    if user.save
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    user = User.includes(:recipes).find_by(id: session[:user_id])
    if user
      render json: user.as_json(include: :recipes)
    else
      render json: { error: "Not authorized" }, status: :unauthorized
    end
  end


  private

  def user_params
    params.permit(:username, :password, :password_confirmation)
  end
end
