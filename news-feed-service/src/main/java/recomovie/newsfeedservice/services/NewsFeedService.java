package recomovie.newsfeedservice.services;

import com.rometools.rome.feed.synd.SyndEntry;
import com.rometools.rome.feed.synd.SyndFeed;
import com.rometools.rome.io.SyndFeedInput;
import com.rometools.rome.io.XmlReader;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import recomovie.newsfeedservice.models.RssItem;

import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.http.HttpStatus.BAD_GATEWAY;
import static org.springframework.http.HttpStatus.OK;
import static recomovie.newsfeedservice.constants.ErrorConstants.ERROR_NEWS_FEED;
import static recomovie.newsfeedservice.constants.StringConstants.FEED_EN;
import static recomovie.newsfeedservice.constants.StringConstants.FEED_RO;
import static recomovie.newsfeedservice.constants.StringConstants.LANGUAGE_RO;

@Service
@NoArgsConstructor
public class NewsFeedService {

    public ResponseEntity getNewsFeed(String language) {
        String feedSource = language.equals(LANGUAGE_RO) ? FEED_RO : FEED_EN;
        try {
            URL url = new URL(feedSource);
            SyndFeedInput input = new SyndFeedInput();
            SyndFeed feed = input.build(new XmlReader(url));
            int count = 0;
            List<RssItem> rssItems = new ArrayList<>();
            for (SyndEntry entry : feed.getEntries()) {
                if (count >= 20) {
                    break;
                }
                String title = entry.getTitle();
                String description = entry.getDescription().getValue();
                String imageUrl = entry.getEnclosures().isEmpty() ? "" : entry.getEnclosures().get(0).getUrl();
                String content = entry.getContents().isEmpty() ? "" : entry.getContents().get(0).getValue();
                RssItem item = new RssItem(title, imageUrl, description, content);
                rssItems.add(item);
                count++;
            }
            return new ResponseEntity<>(rssItems, OK);
        } catch (Exception e) {
            return new ResponseEntity<>(ERROR_NEWS_FEED, BAD_GATEWAY);
        }
    }
}
