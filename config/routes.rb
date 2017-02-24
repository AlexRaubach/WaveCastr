Rails.application.routes.draw do
  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)
  
  devise_for :users
  resources :episodes, only: [:create, :show]

end
