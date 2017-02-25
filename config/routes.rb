Rails.application.routes.draw do

  root to: 'welcome#index'

  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)
  
  devise_for :users
  resources :users, only: [:show]
  resources :episodes, only: [:create, :destroy]
  get 'episode/:sharable_link', to: 'episodes#show'
end
