package recomovie.newsfeedservice.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import recomovie.newsfeedservice.services.NewsFeedService;

@RestController
@RequestMapping("/news")
@AllArgsConstructor
public class NewsFeedController {
    private final NewsFeedService newsFeedService;
    @GetMapping
    public ResponseEntity getNewsFeed(@RequestParam String language) {
        return newsFeedService.getNewsFeed(language);
    }
}
