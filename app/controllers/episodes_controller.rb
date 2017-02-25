class EpisodesController < ApplicationController
  def show
    @episode = Episode.find_by(:sharable_link, params[:sharable_link])
  end

  def create

  end



end
