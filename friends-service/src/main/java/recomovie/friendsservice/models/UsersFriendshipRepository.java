package recomovie.friendsservice.models;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface UsersFriendshipRepository extends JpaRepository<UsersFriendship, Long> {
    @Query("SELECT uf FROM UsersFriendship uf " +
            "WHERE (uf.sendingUserId = ?1 OR uf.receivingUserId = ?1) AND uf.status = true")
    List<UsersFriendship> getFriendList(Long userId);

    @Query("SELECT uf.sendingUserId FROM UsersFriendship uf " +
            "WHERE uf.receivingUserId = ?1 AND uf.status = null")
    List<Long> getFriendRequests(Long userId);


    @Modifying
    @Query("UPDATE UsersFriendship uf " +
            "SET uf.status = ?3 " +
            "WHERE uf.sendingUserId IN (?1, ?2) AND uf.receivingUserId IN(?1, ?2)")
    void updateStatus(Long sendingUserId, Long receivingUserId, Boolean status);

    @Query("SELECT uf FROM UsersFriendship uf " +
            "WHERE uf.sendingUserId IN (?1, ?2) AND uf.receivingUserId IN(?1, ?2)")
    Optional<UsersFriendship> getFriendship(Long sendingUserId, Long receivingUserId);

    @Modifying
    @Query("DELETE FROM UsersFriendship uf " +
            "WHERE uf.sendingUserId IN (?1, ?2) AND uf.receivingUserId IN(?1, ?2)")
    void deleteUserFriendship(Long sendingUserId, Long receivingUserId);
}
