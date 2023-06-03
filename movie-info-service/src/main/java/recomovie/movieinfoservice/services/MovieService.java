package recomovie.movieinfoservice.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import recomovie.movieinfoservice.models.Movie;
import recomovie.movieinfoservice.models.MovieRepository;

import java.util.Optional;

@Service
@AllArgsConstructor
public class MovieService {
    private final MovieRepository movieRepository;

    public Movie getMovieInfo(Long movieId) {
        Optional<Movie> movie = movieRepository.findById(movieId);
        return movie.get();
    }
}
