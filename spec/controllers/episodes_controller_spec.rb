require 'rails_helper'

RSpec.describe EpisodesController, type: :controller do

  let!(:user) do
    User.create!(email: "oliver@gmail.com", password: "password")
  end
  
  it "returns 200 for show action" do
    get :show, params: { id: user.id }
    expect(response).to have_http_status :success
  end
end
