class ReviewsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

  before_action :find_user

  def create
    review = @user.reviews.new(review_params)
    if review.save
      render json: {
        id: review.id,
        review_text: review.review_text,
        user: {
          id: @user.id,
          username: @user.username
        }
      }, status: :created
    else
      render json: { errors: review.errors.full_messages }, status: :unprocessable_entity
    end
  end
  

  def destroy
    @review = @user.reviews.find(params[:id])
    if @review.destroy
      render json: { message: 'Review deleted successfully' }
    else
      render json: { errors: @review.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @review = @user.reviews.find(params[:id])
    if @review.update(review_params)
      render json: {
        id: @review.id,
        review_text: @review.review_text,
        user: {
          id: @review.user.id,
          username: @review.user.username
        }
      }, status: :ok
    else
      render json: { errors: @review.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def top 
    n = params[:n]
    top_r = Recipe.all.sort_by{|r| r.reviews.count}.reverse.take(n.to_i)
    render json: top_r, status: :created
  end
  

  private

  def find_user
    @user = User.find_by!(id: session[:user_id])
  end

  def review_params
    params.require(:review).permit(:recipe_id, :user_id, :review_text).merge(user_id: @user.id)
  end

  def render_record_not_found
    render json: { error: 'Unauthorized' }, status: :unauthorized
  end

  def render_unprocessable_entity(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end
end
