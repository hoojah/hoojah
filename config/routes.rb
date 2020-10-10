Rails.application.routes.draw do
  resources :votes
  namespace :api do
    namespace :v1 do
      get 'hoojah/index', to: 'hujahs#index'
      post 'hoojah/create', to: 'hujahs#create'
      get '/hoojah/:slug', to: 'hujahs#show'
      delete '/hoojah/destroy/:slug', to: 'hujahs#destroy'
      get '/hoojah/new', to: 'hujahs#new'

      post 'votes/create', to: 'votes#create'
      
      get '/:username', to: 'users#show'
      post ':username/update', to: 'users#update'

      post 'flags/create', to: 'flags#create'

      get '/:username/notifications', to: 'notifications#index'
      put '/:username/notifications/:id', to: 'notifications#update'
      delete '/:username/notifications/:id', to: 'notifications#destroy'
    end
  end
  
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'
  
  resources :users, only: :create

  root 'hujah#index'
  get '/*path' => 'hujah#index'
end
