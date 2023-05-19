package recomovie.playlistsservice.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
@EqualsAndHashCode
@Entity
@Table(name = "playlists_movies")
public class Movie {
    @SequenceGenerator(name = "playlist_movie_sequence", sequenceName = "playlist_movie_sequence", allocationSize = 1)
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "playlist_movie_sequence")
    @Column(name = "id")
    private Long id;
    private Long movieId;
    @JoinColumn(name = "playlists_id")
    private Long playlistId;

    public Movie(Long movieId, Long playlistId) {
        this.movieId = movieId;
        this.playlistId = playlistId;
    }
}
