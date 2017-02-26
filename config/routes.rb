Rails.application.routes.draw do
  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)
  mount ActionCable.server => '/cable'

  root to: 'welcome#index'
  devise_for :users

  resources :users, only: [:show]
  resources :guests, only: [:create]
  resources :episodes, param: :sharable_link, only: [:create, :show, :destroy]

  get 'test', to: 'welcome#test'

  resources :welcome, only: [:show, :create]

end
