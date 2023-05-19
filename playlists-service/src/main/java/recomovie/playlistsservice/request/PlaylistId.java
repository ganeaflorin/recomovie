package recomovie.playlistsservice.request;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class PlaylistId {
    private Long playlistId;

    public PlaylistId(Long playlistId) {
        this.playlistId = playlistId;
    }

    public Long getPlaylistId() {
        return playlistId;
    }

    public void setPlaylistId(Long playlistId) {
        this.playlistId = playlistId;
    }
}
