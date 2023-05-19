package recomovie.movieinfoservice.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Entity
@Table(name = "genres")
public class Genre {
    @SequenceGenerator(name = "genre_sequence", sequenceName = "genre_sequence", allocationSize = 1)
    @Id
    private String dbId;
    private String movieId;

    private String name;

    public Genre(String dbId, String movieId, String name) {
        this.dbId = dbId;
        this.movieId = movieId;
        this.name = name;
    }

    public String getDbId() {
        return dbId;
    }

    public void setDbId(String id) {
        this.dbId = id;
    }

    public String getMovieId() {
        return movieId;
    }

    public void setMovieId(String movieId) {
        this.movieId = movieId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
