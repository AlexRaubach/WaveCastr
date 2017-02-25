Rails.application.routes.draw do

  root to: 'welcome#index'

  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)

  devise_for :users
  resources :users, only: [:show]
  resources :episodes, only: [:create, :show]

  get 'test', to: 'welcome#test'

end
