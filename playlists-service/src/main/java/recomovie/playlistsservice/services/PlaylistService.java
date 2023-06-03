package recomovie.playlistsservice.services;

import lombok.AllArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import recomovie.playlistsservice.models.Movie;
import recomovie.playlistsservice.models.MovieInfo;
import recomovie.playlistsservice.models.MovieRepository;
import recomovie.playlistsservice.models.Playlist;
import recomovie.playlistsservice.models.PlaylistRepository;
import recomovie.playlistsservice.request.PlaylistRequest;
import recomovie.playlistsservice.request.UserPlaylist;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.http.HttpStatus.ACCEPTED;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.OK;
import static recomovie.playlistsservice.constants.StringConstants.BASE_URL;
import static recomovie.playlistsservice.constants.StringConstants.DELETE_PLAYLIST_ERROR;
import static recomovie.playlistsservice.constants.StringConstants.MOVIE_LIST_DETAILS_ENDPOINT;
import static recomovie.playlistsservice.constants.StringConstants.PLAYLIST_SAVED_SUCCESS;

@Service
@AllArgsConstructor
public class PlaylistService {
    private final PlaylistRepository playlistRepository;
    private final MovieRepository movieRepository;
    private final RestTemplate restTemplate = new RestTemplate();


    public ResponseEntity savePlaylist(PlaylistRequest playlist) {
        Playlist newPlaylist = new Playlist(playlist.getName(), playlist.getUserId(), playlist.getUserInput());
        Playlist createdPlaylist = playlistRepository.save(newPlaylist);
        savePlaylistMovies(createdPlaylist.getId(), playlist.getMovies());
        return new ResponseEntity<>(PLAYLIST_SAVED_SUCCESS, CREATED);
    }

    public void savePlaylistMovies(Long playlistId, List<Long> movies) {
        for (Long movieId : movies) {
            Movie movie = new Movie(movieId, playlistId);
            movieRepository.save(movie);
        }
    }

    public ResponseEntity getUserPlaylists(Long userId) {

        List<Playlist> playlists = playlistRepository.getPlaylistByUserId(userId);
        List<UserPlaylist> userPlaylistList = new ArrayList<>();
        for (Playlist playlist : playlists) {
            getMoviesDetails(playlist);
            List<MovieInfo> movieInfos = getMoviesDetails(playlist);
            userPlaylistList.add(new UserPlaylist(playlist.getId(), playlist.getName(), playlist.getUserId(), playlist.getUserInput(), movieInfos)
            );
        }
        return new ResponseEntity<>(userPlaylistList, OK);
    }

    public ResponseEntity deletePlaylist(Long playlistId) {
        try {
            playlistRepository.deletePlaylistById(playlistId);
            movieRepository.deleteAllByPlaylistId(playlistId);
            return new ResponseEntity(ACCEPTED);
        } catch (Exception e) {
            return new ResponseEntity<>(DELETE_PLAYLIST_ERROR, INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity getPlaylistById(Long playlistId) {
        Playlist playlist = playlistRepository.getPlaylistById(playlistId);
        getMoviesDetails(playlist);
        List<MovieInfo> movieInfos = getMoviesDetails(playlist);
        UserPlaylist userPlaylist = new UserPlaylist(playlist.getId(), playlist.getName(), playlist.getUserId(), playlist.getUserInput(), movieInfos);
        return new ResponseEntity<>(userPlaylist, OK);
    }

    private List<MovieInfo> getMoviesDetails(Playlist playlist) {
        List<Long> movieIds = movieRepository.findMovieIdsByPlaylistId(playlist.getId());
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(BASE_URL + MOVIE_LIST_DETAILS_ENDPOINT)
                .queryParam("movieIds", movieIds);
        ResponseEntity<List<MovieInfo>> movieInfos = restTemplate.exchange(builder.toUriString(), HttpMethod.GET,
                null, new ParameterizedTypeReference<>() {
                });
        return movieInfos.getBody();
    }

}
