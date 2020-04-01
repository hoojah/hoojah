Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'hujahs/index'
      post 'hujahs/create'
      get '/show/:id', to: 'hujahs#show'
      delete '/destroy/:id', to: 'hujahs#destroy'
    end
  end
  root 'hujah#index'
  get '/*path' => 'hujah#index'
end
