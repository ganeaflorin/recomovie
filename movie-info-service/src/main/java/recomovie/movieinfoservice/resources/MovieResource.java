package recomovie.movieinfoservice.resources;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import recomovie.movieinfoservice.models.Movie;
import recomovie.movieinfoservice.services.MovieService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/movies")
@AllArgsConstructor
public class MovieResource {
    private final MovieService movieService;

    @RequestMapping("/{id}")
    public Movie getMovieInfo(@PathVariable Long id) {
        return movieService.getMovieInfo(id);
    }

    @RequestMapping("/movieList")
    public List<Movie> getMovieListInfo(@RequestParam List<Long> movieIds) {
        List<Movie> movieList = new ArrayList<>();
        for (Long movieId : movieIds) {
            movieList.add(movieService.getMovieInfo(movieId));
        }
        return movieList;
    }

}

