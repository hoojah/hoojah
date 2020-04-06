Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'hoojah/index', to: 'hujahs#index'
      post 'hoojah/create', to: 'hujahs#create'
      get '/hoojah/:id', to: 'hujahs#show'
      delete '/destroy/:id', to: 'hujahs#destroy'
      get '/hoojah/new', to: 'hujahs#new'
    end
  end
  
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'
  
  resources :users, only: [:create, :show, :index]

  root 'hujah#index'
  get '/*path' => 'hujah#index'
end
