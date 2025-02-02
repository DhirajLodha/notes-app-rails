Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  # get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  namespace :api do
    namespace :v1 do
      # root "notes#index"
      get "dashboard", to: "notes#index"
      post "notes/create", to: "notes#create"
      post "notes/update/:id", to: "notes#update"
      post "notes/destroy/:id", to: "notes#destroy"
      post "/login", to: "authentication#login"
      get "/users", to: "users#index"
      post "/signup", to: "users#create"
      get "/users/:id", to: "users#show"
      # post "/users/:id", to: "users#update"
      # resources :users
    end
  end

end
