package recomovie.recommendationsystemservice.models;

import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
public class ProcessedInput {
    private List<String> genres;
    private List<String> directors;
    private List<String> cast;
    private List<String> keywords;
    private String releaseDate;
    private Integer voteCount;

    private Float voteAverage;

    public ProcessedInput(List<String> genres, List<String> directors, List<String> cast, List<String> keywords, String releaseDate, Integer voteCount, Float voteAverage) {
        this.genres = genres;
        this.directors = directors;
        this.cast = cast;
        this.keywords = keywords;
        this.releaseDate = releaseDate;
        this.voteCount = voteCount;
        this.voteAverage = voteAverage;
    }

    public List<String> getGenres() {
        return genres;
    }

    public void setGenres(List<String> genres) {
        this.genres = genres;
    }

    public List<String> getDirectors() {
        return directors;
    }

    public void setDirectors(List<String> directors) {
        this.directors = directors;
    }

    public List<String> getCast() {
        return cast;
    }

    public void setCast(List<String> cast) {
        this.cast = cast;
    }

    public List<String> getKeywords() {
        return keywords;
    }

    public void setKeywords(List<String> keywords) {
        this.keywords = keywords;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public Integer getVoteCount() {
        return voteCount;
    }

    public void setVoteCount(Integer voteCount) {
        this.voteCount = voteCount;
    }

    public Float getVoteAverage() {
        return voteAverage;
    }

    public void setVoteAverage(Float voteAverage) {
        this.voteAverage = voteAverage;
    }
}
