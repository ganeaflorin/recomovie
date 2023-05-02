package recomovie.recommendationsystemservice.models;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class MovieRecommendation {
    private String id;
    private String title;
    private String cosineSimilarity;

    public MovieRecommendation(String id, String title, String cosineSimilarity) {
        this.id = id;
        this.title = title;
        this.cosineSimilarity = cosineSimilarity;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCosineSimilarity() {
        return cosineSimilarity;
    }

    public void setCosineSimilarity(String cosineSimilarity) {
        this.cosineSimilarity = cosineSimilarity;
    }


}
