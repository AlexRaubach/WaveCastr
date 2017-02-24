require 'rails_helper'

RSpec.describe UsersController, type: :controller do

  let!(:user) { User.create!(email: "oliver@gmail.com", password: "password") }

  # TODO: Controller tests

  # it "returns 200 when logged in" do
  #   session[:user_id] = user.id
  #   get :show
  #   expect(response).to have_http_status :success
  # end

  # it "returns 403 when not logged in" do
  #   session.delete(:user_id)
    
  # end
end
