module EpisodesHelper
  def audio_filetypes
    ["mp3", "wav", "ogg"]
  end

  def is_host?(episode)
    user_signed_in? && current_user.host?(episode)
  end

  def unregistered_guest?(episode)
    (!current_user || !current_user.host?(@episode)) && !@episode.guest_ids.include?(cookies.signed[:guest_id])
  end

end
