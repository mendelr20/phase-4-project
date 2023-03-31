class ReviewsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

  before_action :find_user

  def create
    review = @user.reviews.new(review_params)
    if review.save
      recipe = Recipe.find(review.recipe_id)
      recipe.reviews << review
      render json: {
        review: review,
        user: @user.as_json(only: [:id, :username]) # include user info in the response
      }, status: :created
    else
      render json: {errors: review.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def destroy
    @review = Review.find(params[:id])
    if @review.destroy
      render json: { message: 'Review deleted successfully' }
    else
      render json: { error: 'Failed to delete review' }, status: :unprocessable_entity
    end
  end

  def update
    @review = Review.find(params[:id])
    if @review.update(review_params)
      render json: {
        review: @review,
        user: @user.as_json(only: [:id, :username]) # include user info in the response
      }, status: :ok
    else
      render json: { errors: @review.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def find_user
    @user = User.find_by!(id: session[:user_id])
  end

  def review_params
    params.require(:review).permit(:recipe_id, :user_id, :review_text).merge(user_id: @user.id)
  end

  def render_record_not_found
    render json: {error: 'Unauthorized'}, status: :unauthorized
  end

  def render_unprocessable_entity(invalid)
    render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
  end
end
