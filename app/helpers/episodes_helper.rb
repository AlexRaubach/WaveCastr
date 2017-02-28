module EpisodesHelper
  def audio_filetypes
    ["mp3", "wav", "ogg"]
  end

  def is_host?(episode)
    user_signed_in? && current_user.host?(episode)
  end

end
