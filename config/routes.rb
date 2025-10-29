Rails.application.routes.draw do
  resources :contracts, only: [:show, :new, :create]
  root to: 'contracts#new'
end
