package recomovie.movieinfoservice.services;

import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import recomovie.movieinfoservice.models.Actor;
import recomovie.movieinfoservice.models.Credits;
import recomovie.movieinfoservice.models.Movie;
import recomovie.movieinfoservice.models.Person;

import java.util.List;

import static recomovie.movieinfoservice.constants.StringConstants.API_KEY;
import static recomovie.movieinfoservice.constants.StringConstants.DIRECTOR_JOB;
import static recomovie.movieinfoservice.constants.StringConstants.MOVIE_DB_API_URL;
import static recomovie.movieinfoservice.constants.StringConstants.MOVIE_DB_CREDITS_ENDPOINT;
import static recomovie.movieinfoservice.constants.StringConstants.MOVIE_DB_PARAM_API_KEY;
import static recomovie.movieinfoservice.constants.StringConstants.NUMBER_OF_ACTORS;

@Service
@NoArgsConstructor
public class MovieService {
    private final RestTemplate restTemplate = new RestTemplate();


    public Movie getMovieInfo(Long movieId) {
        Movie movie = restTemplate.getForObject(MOVIE_DB_API_URL + movieId + MOVIE_DB_PARAM_API_KEY + API_KEY, Movie.class);
        Credits credits = restTemplate.getForObject(MOVIE_DB_API_URL + movieId + MOVIE_DB_CREDITS_ENDPOINT + MOVIE_DB_PARAM_API_KEY + API_KEY, Credits.class);
        System.out.println("movie: " + movie.toString());
        System.out.println(credits.toString());
        List<Person> crew = credits.getCrew();
        for (Person person : crew) {
            if (person.getJob().equals(DIRECTOR_JOB))
                movie.setDirector(person.getName());
        }
        List<Actor> cast = credits.getCast().stream().limit(NUMBER_OF_ACTORS).toList();
        movie.setCast(cast);
        movie.setGenreList();
        movie.setCastList();
        return movie;
    }
}
