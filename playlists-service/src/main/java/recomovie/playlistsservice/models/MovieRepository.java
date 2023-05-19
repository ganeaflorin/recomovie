package recomovie.playlistsservice.models;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface MovieRepository extends JpaRepository<Movie, Long> {
    @Query("SELECT m.movieId FROM Movie m WHERE m.playlistId=:playlistId")
    List<Long> findMovieIdsByPlaylistId(Long playlistId);
    int deleteAllByPlaylistId(Long playlistId);
}
