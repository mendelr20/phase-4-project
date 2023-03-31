Rails.application.routes.draw do
  get "/users", to: "users#index"
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/recipes", to: "recipes#index"
  post "/recipes", to: "recipes#create"
  delete '/reviews/:id', to: 'reviews#destroy'
  post "/reviews", to: "reviews#create"
  patch "/reviews/:id", to: "reviews#update"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
