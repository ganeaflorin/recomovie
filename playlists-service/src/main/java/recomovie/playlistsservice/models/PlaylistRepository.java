package recomovie.playlistsservice.models;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface PlaylistRepository extends JpaRepository<Playlist, Long> {


    List<Playlist> getPlaylistByUserId(Long id);

    Playlist getPlaylistById(Long id);

    int deletePlaylistById(Long id);
}
