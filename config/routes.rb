Rails.application.routes.draw do
  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)

  devise_for :users

  resources :users, only: [:show]

  resources :episodes, only: [:create, :show]

  resources :welcome, only: [:show, :create]

  root to: 'welcome#index'
end
