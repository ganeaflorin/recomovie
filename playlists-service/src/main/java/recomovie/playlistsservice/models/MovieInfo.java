package recomovie.playlistsservice.models;

import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
public class MovieInfo {
    private Long id;
    private String title;
    private String releaseDate;
    private int runtime;
    private String description;
    private String posterPath;
    private String director;

    private List<String> genres;
    private List<String> cast;

    public MovieInfo(Long id, String title, String releaseDate, int runtime, String description, String posterPath, String director, List<String> genres, List<String> cast) {
        this.id = id;
        this.title = title;
        this.releaseDate = releaseDate;
        this.runtime = runtime;
        this.description = description;
        this.posterPath = posterPath;
        this.director = director;
        this.genres = genres;
        this.cast = cast;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public int getRuntime() {
        return runtime;
    }

    public void setRuntime(int runtime) {
        this.runtime = runtime;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPosterPath() {
        return posterPath;
    }

    public void setPosterPath(String posterPath) {
        this.posterPath = posterPath;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public List<String> getGenres() {
        return genres;
    }

    public void setGenres(List<String> genres) {
        this.genres = genres;
    }

    public List<String> getCast() {
        return cast;
    }

    public void setCast(List<String> cast) {
        this.cast = cast;
    }
}
