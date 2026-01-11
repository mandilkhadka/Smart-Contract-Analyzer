Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :contracts, only: [:index, :show, :create, :destroy] do
        member do
          get :export
          get :export_json
        end
        collection do
          get :statistics
        end
      end
    end
  end
  
  # Fallback route for React app
  root to: 'pages#index'
  get '*path', to: 'pages#index', constraints: ->(req) { !req.path.start_with?('/rails') }
end
