Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :contracts, only: [:show, :create] do
        member do
          get :export
        end
      end
    end
  end
  
  # Fallback route for React app
  root to: 'pages#index'
  get '*path', to: 'pages#index', constraints: ->(req) { !req.path.start_with?('/rails') }
end
