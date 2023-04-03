package recomovie.movieinfoservice.models;

public class Movie {
    private String movieId;
    private String description;
    private String name;

    public Movie() {
    }

    public Movie(String movieId, String description, String name) {
        this.movieId = movieId;
        this.description = description;
        this.name = name;
    }

    public String getMovieId() {
        return movieId;
    }

    public void setMovieId(String movieId) {
        this.movieId = movieId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
