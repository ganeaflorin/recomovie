package recomovie.ratingsdataservice.models;

import java.util.List;

public class UserRating {
    private List<Rating> userRating;

    public List<Rating> getUserRating() {
        return userRating;
    }

    public void setUserRating(List<Rating> getUserRating) {
        this.userRating = getUserRating;
    }
}
