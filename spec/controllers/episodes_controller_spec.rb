require 'rails_helper'

RSpec.describe EpisodesController, type: :controller do

  let!(:user) { create(:user) }
  let!(:episode) { build(:episode) }

  before(:each) do
    user.episodes << episode
  end

  describe '#show' do

    it "returns 200 if user is logged in" do
      sign_in user
      get :show, params: { id: episode.id, sharable_link: episode.sharable_link }
      expect(response).to have_http_status :success
    end

  end

  describe '#create' do

    it "returns a 302 to show if successful" do
      sign_in user
      post :create, params: { episode: attributes_for(:episode) }
      expect(response).to have_http_status :found
    end

    it "returns a 302 to user show with a flash if unsuccessful" do
      sign_in user
      post :create, params: { episode: { description: "My first one!" } }
      expect(response).to have_http_status 302 
      expect(flash[:alert]).to eq "Name can't be blank"
      expect(response.location).to eq user_url(user)
    end
  end

  describe '#delete' do

    it "returns 302 to dashboard if user logged in" do
      sign_in user
      delete :destroy, params: { sharable_link: episode.sharable_link }
      expect(response).to have_http_status :found
      expect(response.location).to eq user_url(user)
    end

    it "returns a 302 if user not logged in" do
      delete :destroy, params: { sharable_link: episode.sharable_link }
      expect(response).to have_http_status :found
      expect(response.location).to eq new_user_session_url
    end

  end
  

end
