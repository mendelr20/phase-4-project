class RecipesController < ApplicationController
  
  skip_before_action :authorize, only: [:index]

  def index
      recipes = Recipe.all
      render json: recipes, status: :created
  end

  def create
    @user = User.find_by(id: session[:user_id])
    recipe = Recipe.new(recipe_params)
  
    if recipe.save
      render json: recipe, status: :created
    else
      render json: { errors: recipe.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  
  private
  def recipe_params
      params.permit(:name, :meal_course, :instructions, :notes, :minutes_to_complete )
  end

end


## authorize in app
## authorize reviews
## authorize exception for recipies

##rename my reviews route