package recomovie.moviecatalogservice.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import recomovie.moviecatalogservice.models.CatalogItem;
import recomovie.moviecatalogservice.models.Movie;
import recomovie.moviecatalogservice.models.UserRating;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static recomovie.moviecatalogservice.constants.StringConstants.MOVIE_INFO_SERVICE;
import static recomovie.moviecatalogservice.constants.StringConstants.RATINGS_DATA_SERVICE;

@RestController
@RequestMapping("/catalog")
public class MovieCatalogResource {
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private WebClient.Builder webClientBuilder;


    @RequestMapping("/{userId}")
    public List<CatalogItem> getCatalog(@PathVariable("userId") String userId) {
        UserRating ratings = restTemplate.getForObject(RATINGS_DATA_SERVICE + userId, UserRating.class);
        return ratings.getUserRating().stream().map(rating -> {
                    Movie movie = restTemplate.getForObject(MOVIE_INFO_SERVICE + rating.getMovieId(), Movie.class);
                    return new CatalogItem(movie.getName(), movie.getDescription(), rating.getRating());
                })
                .collect(Collectors.toList());
    }

    public List<CatalogItem> getDefaultCatalog(String userId, Exception e) {
        List<CatalogItem> movieList = new ArrayList<>();
        movieList.add(new CatalogItem("default name", "default desc", 5 ));
        return movieList;
    }
}

