require 'rails_helper'

RSpec.describe GuestsController, type: :controller do

  before(:each) do
  end
  
  it "returns 200 when creating new guest" do
    post :create, params: { guest: attributes_for(:guest) } 
    expect(response).to have_http_status :success
  end

end
