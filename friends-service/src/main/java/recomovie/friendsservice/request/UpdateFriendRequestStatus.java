package recomovie.friendsservice.request;

public class UpdateFriendRequestStatus extends FriendRequest {
    private Boolean status;

    public UpdateFriendRequestStatus(Long sendingUserId, Long receivingUserId, Boolean status) {
        super(sendingUserId, receivingUserId);
        this.status = status;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }
}
