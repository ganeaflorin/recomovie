package recomovie.movieinfoservice.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import static recomovie.movieinfoservice.constants.StringConstants.IMAGE_BASE_URL;


@NoArgsConstructor

public class Movie {
    //    @Id
    private Long id;
    private String title;
    private String releaseDate;
    private int runtime;
    private String overview;
    private String posterPath;
    private String director;
    //    @OneToMany
    @JsonProperty(value = "genres", access = JsonProperty.Access.WRITE_ONLY)
    private List<Genre> genres;
    //    @OneToMany
    @JsonProperty(value = "cast", access = JsonProperty.Access.WRITE_ONLY)

    private List<Actor> cast;

    private List<String> genreList;
    private List<String> castList;

    public Movie(Long id, String title, String releaseDate, int runtime, String overview, String posterPath, String director, List<Genre> genres, List<Actor> cast, List<String> genreList, List<String> castList) {
        this.id = id;
        this.title = title;
        this.releaseDate = releaseDate;
        this.runtime = runtime;
        this.overview = overview;
        this.posterPath = posterPath;
        this.director = director;
        this.genres = genres;
        this.cast = cast;
        this.genreList = genreList;
        this.castList = castList;
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

    @JsonProperty("releaseDate")
    public String getReleaseDate() {
        return releaseDate;
    }

    @JsonProperty("release_date")
    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public int getRuntime() {
        return runtime;
    }

    public void setRuntime(int runtime) {
        this.runtime = runtime;
    }

    @JsonProperty("description")
    public String getOverview() {
        return overview;
    }

    @JsonProperty("overview")
    public void setOverview(String overview) {
        this.overview = overview;
    }

    @JsonProperty("posterPath")
    public String getPosterPath() {
        return posterPath;
    }

    @JsonProperty("poster_path")
    public void setPosterPath(String posterPath) {
        this.posterPath = IMAGE_BASE_URL + posterPath;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public List<Genre> getGenres() {
        return genres;
    }

    public void setGenres(List<Genre> genres) {
        this.genres = genres;
    }

    public List<Actor> getCast() {
        return cast;
    }

    public void setCast(List<Actor> cast) {
        this.cast = cast;
    }

    @JsonProperty("genres")
    public List<String> getGenreList() {
        return genreList;
    }

    public void setGenreList() {
        this.genreList = new ArrayList<>();
        for (Genre genre : this.genres) {
            this.genreList.add(genre.getName());
        }
    }

    @JsonProperty("cast")
    public List<String> getCastList() {
        return castList;
    }

    public void setCastList() {
        this.castList = new ArrayList<>();
        for (Actor actor : this.cast) {
            this.castList.add(actor.getName());
        }
    }

    public String toString() {
        return "" + this.getId();
    }
}
