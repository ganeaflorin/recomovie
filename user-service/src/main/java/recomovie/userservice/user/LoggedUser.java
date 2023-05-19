package recomovie.userservice.user;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LoggedUser {
    private Long id;
    private String username;

    public LoggedUser(Long id, String username) {
        this.id = id;
        this.username = username;
    }
}
