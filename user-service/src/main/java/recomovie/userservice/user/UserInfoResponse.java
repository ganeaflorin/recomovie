package recomovie.userservice.user;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserInfoResponse {
    private Long id;
    private String username;

    public UserInfoResponse(Long id, String username) {
        this.id = id;
        this.username = username;
    }

    public UserInfoResponse(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
    }
}
