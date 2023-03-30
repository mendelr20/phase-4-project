class ReviewsController < ApplicationController
    def create
      @review = Review.new(review_params)
      if user_exists? && recipe_exists? && @review.save
        render json: @review, status: :created
      else
        render json: { error: "Unable to create review, Please Check" }, status: :unprocessable_entity
      end
    end
  
    private
  
    def review_params
      params.require(:review).permit(:text, :user_id, :recipe_id)
    end
  
    def user_exists?
      User.exists?(id: params[:review][:user_id])
    end
  
    def recipe_exists?
      Recipe.exists?(id: params[:review][:recipe_id])
    end
  end
  
  

  
  
  
  
  