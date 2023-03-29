class RecipesController < ApplicationController
    before_action :authorize

    def index
        recipes = Recipe.all
        render json: recipes, status: :created
    end

    def create
        recipe = Recipe.create(recipe_params);
        

        if recipe.valid?
            render json: recipe, status: :created
        else
            render json: {errors: recipe.errors.full_messages} , status: :unprocessable_entity
        end
    end

    private
    def recipe_params
        params.permit(:name, :meal_course, :instructions, :notes, :minutes_to_complete )
    end
    def authorize
        return render json: {errors: ["Not authorized"]}, status: :unauthorized unless session.include? :user_id
    end
end
