Rails.application.routes.draw do
  root to: "roots#root"
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :shops, except: [:edit, :new]
    resources :reviews, only: [:create, :update,:destroy]
    resources :barbers, except: [:edit, :new]
    resources :pictures, except: [:edit, :new]
    resources :tags, only: [:create, :index, :show]
  end

end
