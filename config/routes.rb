Rails.application.routes.draw do
  resources :users, only: [:index, :create, :show]
 
  resources :recipes, only: [:index, :create]
  resources :reviews, only: [:create, :update, :destroy]
  resources :users, only: [:index]
 
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
