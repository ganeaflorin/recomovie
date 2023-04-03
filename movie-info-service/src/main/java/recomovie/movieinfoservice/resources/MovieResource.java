package recomovie.movieinfoservice.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import recomovie.movieinfoservice.models.Movie;
import recomovie.movieinfoservice.models.MovieSummary;

import static recomovie.movieinfoservice.constants.StringConstants.*;

@RestController
@RequestMapping("/movies")
public class MovieResource {
    @Autowired
    private RestTemplate restTemplate;

    @Value("${api.key}")
    private String apiKey;
    @RequestMapping("/{movieId}")
    public Movie getMovieInfo(@PathVariable("movieId") String movieId) {
        MovieSummary movieSummary = restTemplate.getForObject(MOVIE_DB_API_URL + movieId + MOVIE_DB_PARAM_API_KEY + apiKey, MovieSummary.class);
        return new Movie(movieSummary.getId(), movieSummary.getOverview(), movieSummary.getTitle());
    }

}

