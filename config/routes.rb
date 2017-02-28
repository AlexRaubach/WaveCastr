Rails.application.routes.draw do
  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)

  root to: 'welcome#index'
  devise_for :users

  resources :users, only: [:show]
  resources :guests, only: [:create]
  resources :episodes, param: :sharable_link, only: [:create, :show, :destroy]

  get 'test', to: 'welcome#test'

  resources :welcome, only: [:show, :create]

  resources :tracks, only: [:create]

  mount ActionCable.server => '/cable'

end
