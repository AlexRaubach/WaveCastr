require 'rails_helper'

RSpec.describe GuestsController, type: :controller do

  let!(:user) { create(:user) }
  let!(:episode) { user.episodes.create(attributes_for(:episode)) }
  
  it "returns 200 when creating new guest" do
    post :create, params: { guest: { name: "Bobo", episode_id: episode.id } }
    expect(response).to have_http_status :success
  end

end
