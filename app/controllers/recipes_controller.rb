class ReviewsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
  
    before_action :find_user
  
    def create
      review = @user.reviews.new(review_params)
      if review.save
        recipe = Recipe.find(review.recipe_id)
        recipe.reviews << review
        render json: {review: review, recipe: recipe}, status: :created
      else
        render json: {errors: review.errors.full_messages}, status: :unprocessable_entity
      end
    end
  
    private
  
    def find_user
      @user = User.find_by!(id: session[:user_id])
    end
  
    def review_params
      params.require(:review).permit(:recipe_id, :text).merge(user_id: @user.id)
    end
  
    def render_record_not_found
      render json: {error: 'Unauthorized'}, status: :unauthorized
    end
  
    def render_unprocessable_entity(invalid)
      render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
  end
  