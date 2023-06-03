package recomovie.friendsservice.request;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class FriendListRequest {
    private Long userId;

    public FriendListRequest(Long userId) {
        this.userId = userId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
