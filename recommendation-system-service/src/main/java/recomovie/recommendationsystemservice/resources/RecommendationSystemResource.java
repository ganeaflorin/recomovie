package recomovie.recommendationsystemservice.resources;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import recomovie.recommendationsystemservice.models.MovieDetails;
import recomovie.recommendationsystemservice.models.MovieRecommendation;
import recomovie.recommendationsystemservice.models.ProcessedInput;
import recomovie.recommendationsystemservice.models.UserInput;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.OK;
import static recomovie.recommendationsystemservice.constants.ErrorConstants.SERVICE_ERROR;
import static recomovie.recommendationsystemservice.constants.StringConstants.BASE_URL;
import static recomovie.recommendationsystemservice.constants.StringConstants.MOVIE_DETAILS_ENDPOINT;
import static recomovie.recommendationsystemservice.constants.StringConstants.MOVIE_RECOMMENDATION_ENDPOINT;
import static recomovie.recommendationsystemservice.constants.StringConstants.PROCESS_INPUT_ENDPOINT;

@RestController
@RequestMapping("/recommendation-system")
public class RecommendationSystemResource {
    @Autowired
    private RestTemplate restTemplate;

    @GetMapping
    public ResponseEntity getRecommendations(@RequestParam UserInput userInput) throws JsonProcessingException {
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(BASE_URL + PROCESS_INPUT_ENDPOINT)
                .queryParam("input", userInput.getUserInput());
        ProcessedInput processedInput = restTemplate.getForObject(builder.toUriString(), ProcessedInput.class);
        ObjectMapper mapper = new ObjectMapper();
        String processedInputJson = mapper.writeValueAsString(processedInput);
        builder = UriComponentsBuilder.fromHttpUrl(BASE_URL + MOVIE_RECOMMENDATION_ENDPOINT)
                .queryParam("input", processedInputJson);
        try {
            ResponseEntity<List<MovieRecommendation>> movieRecommendations = (restTemplate.exchange(builder.toUriString(), HttpMethod.GET,
                    null, new ParameterizedTypeReference<>() {
                    }));
            List<MovieDetails> movieDetailsList = new ArrayList<>();
            for (MovieRecommendation movie : Objects.requireNonNull(movieRecommendations.getBody())) {
                MovieDetails movieDetails = restTemplate.getForObject(BASE_URL + MOVIE_DETAILS_ENDPOINT + "/" + movie.getId(), MovieDetails.class);
                movieDetails.setCosineSimilarity(movie.getCosineSimilarity());
                movieDetailsList.add(movieDetails);
            }
            return new ResponseEntity<>(movieDetailsList, OK);
        } catch (Exception e) {
            return new ResponseEntity<>(SERVICE_ERROR, INTERNAL_SERVER_ERROR);
        }
    }
}
