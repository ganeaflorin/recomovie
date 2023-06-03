package recomovie.userservice.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<User, Long> {
    @Transactional(readOnly = true)
    Optional<User> findByUsername(String username);

    @Modifying
    @Query("UPDATE User user " +
            "SET user.enabled = TRUE " +
            "WHERE user.username = ?1")
    int enableUser(String username);

    @Query("SELECT us from User us " +
    "WHERE us.username LIKE %?1%"
    )
    List<UserInfoResponse> findByUsernameSubstring(String substring);
}
