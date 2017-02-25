require 'rails_helper'

RSpec.describe UsersController, type: :controller do

  let!(:user) { create(:user) }

  it "returns 200 when logged in" do
    sign_in user
    get :show, params: { id: user.id }
    expect(response).to have_http_status :success
  end

  it "returns redirect 302 when not logged in" do
    get :show, params: { id: user.id }     
    expect(response).to have_http_status :found
    expect(response.location).to eq new_user_session_url
  end
end
