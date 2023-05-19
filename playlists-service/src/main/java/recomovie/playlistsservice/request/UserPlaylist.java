package recomovie.playlistsservice.request;

import lombok.NoArgsConstructor;
import recomovie.playlistsservice.models.MovieInfo;
import recomovie.playlistsservice.models.Playlist;

import java.util.List;

@NoArgsConstructor
public class UserPlaylist extends Playlist {

    private List<MovieInfo> movies;


    public UserPlaylist(Long id, String name, Long userId, String userInput, List<MovieInfo> movies) {
        super(name, userId, userInput);
        this.movies = movies;
        this.setId(id);
    }

    public List<MovieInfo> getMovies() {
        return movies;
    }

    public void setMovies(List<MovieInfo> movies) {
        this.movies = movies;
    }
}
