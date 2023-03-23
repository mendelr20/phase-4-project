# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts 'Loading...'

users = User.create([
  {username:'Admin',password:'admin', password_confirmation:'admin'},
  {username:'Mendel',password:'mendel', password_confirmation:'mendel'},
  {username:'Shaina',password:'shaina', password_confirmation:'shaina'}
])
puts 'Users ✓'

recipes = Recipe.create!([
  {name:'Southeast Asian Style Chicken Rice',meal_course:'Dinner',instructions:'we are testing this feature out youmay not see all the instructions currently visit https://www.allrecipes.com/recipe/8525243/southeast-asian-style-chicken-rice/ for more info ',notes:'was amazing', minutes_to_complete: 70, user_id:1},
  {name:'Homemade Pancake Mix',meal_course:'Breakfast',instructions:'we are testing this feature out youmay not see all the instructions currently visit https://www.goodhousekeeping.com/ for more info ',notes:'tastes amazing', minutes_to_complete: 100, user_id:2, source_id:2},
  {name:'Chicken Salad Sandwich',meal_course:'Lunch',instructions:'we are testing this feature out youmay not see all the instructions currently visit delish.com/cooking/recipe-ideas/recipes/a54787/best-chicken-salad-sandwich-recipe/ for more info ',notes:'i would eat every day, it si really tasty', minutes_to_complete: 25, user_id:3},
  {name:'CAULIFLOWER TACOS',meal_course:'Dinner',instructions:'we are testing this feature out youmay not see all the instructions currently visit https://damndelicious.net/2023/01/13/cauliflower-tacos/ for more info ',notes: 'really, really, really good', minutes_to_complete: 40, user_id:1},
 ])

 reviews = Review.create!([
    {user_id:1, recipe_id:1, review_text:'it tastes so good, highly recomend'},
    {user_id:1, recipe_id:2, review_text:'it tastes so good, highly recomend'},
    {user_id:1, recipe_id:3, review_text:'it tastes so good, highly recomend'},
    {user_id:1, recipe_id:4, review_text:'it tastes so good, highly recomend'},
    {user_id:2, recipe_id:1, review_text:'it tastes so good, highly recomend'},
    {user_id:2, recipe_id:2, review_text:'it tastes so good, highly recomend'},
    {user_id:2, recipe_id:3, review_text:'it tastes so good, highly recomend'},
    {user_id:2, recipe_id:4, review_text:'it tastes so good, highly recomend'},
    {user_id:3, recipe_id:1, review_text:'it tastes so good, highly recomend'},
    {user_id:3, recipe_id:2, review_text:'it tastes so good, highly recomend'},
    {user_id:3, recipe_id:3, review_text:'it tastes so good, highly recomend'},
    {user_id:3, recipe_id:4, review_text:'it tastes so good, highly recomend'}
 ])

puts 'Recipes ✓'

puts 'All done ✓✓✓'