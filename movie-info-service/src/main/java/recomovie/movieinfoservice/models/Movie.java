package recomovie.movieinfoservice.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

import static recomovie.movieinfoservice.constants.StringConstants.IMAGE_BASE_URL;


@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Entity
@Table(name = "movies")
public class Movie {
    @Id
    private Long id;
    private String title;
    private String releaseDate;
    private int runtime;
    @Column(length = 8192)
    private String overview;
    private String posterPath;
    private String director;
    @ElementCollection
    @CollectionTable(name="genres", joinColumns = @JoinColumn(name="movies_id"))
    @Column(name="genre")

    private List<String> genres;
    @ElementCollection
    @CollectionTable(name="actors", joinColumns = @JoinColumn(name="movies_id"))
    @Column(name="actor")
    private List<String> cast;

    public Movie(Long id, String title, String releaseDate, int runtime, String overview, String posterPath, String director, List<String> genres, List<String> cast) {
        this.id = id;
        this.title = title;
        this.releaseDate = releaseDate;
        this.runtime = runtime;
        this.overview = overview;
        this.posterPath = posterPath;
        this.director = director;
        this.genres = genres;
        this.cast = cast;
    }

    public Movie(MovieResponse movieResponse) {
        this.id = movieResponse.getId();
        this.title = movieResponse.getTitle();
        this.releaseDate = movieResponse.getReleaseDate();
        this.runtime = movieResponse.getRuntime();
        this.overview = movieResponse.getOverview();
        setPosterPath(movieResponse.getPosterPath());
        this.director = movieResponse.getDirector();
        this.genres = setGenresFromMovieResponse(movieResponse.getGenres());
        this.cast = setCastFromMovieResponse(movieResponse.getCast());
    }

    public List<String> setGenresFromMovieResponse(List<Genre> genreList) {
        List<String> genres = new ArrayList<>();
        for (Genre genre : genreList) {
            genres.add(genre.getName());
        }
        return genres;
    }

    public List<String> setCastFromMovieResponse(List<Actor> actorList) {
        List<String> cast = new ArrayList<>();
        for (Actor actor : actorList) {
            cast.add(actor.getName());
        }
        return cast;
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

    @JsonProperty("description")
    public String getOverview() {
        return overview;
    }

    @JsonProperty("overview")
    public void setOverview(String overview) {
        this.overview = overview;
    }

    public String getPosterPath() {
        return posterPath;
    }

    public void setPosterPath(String posterPath) {
        this.posterPath = IMAGE_BASE_URL + posterPath;
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

    public String toString() {
        return "" + this.getId();
    }
}
