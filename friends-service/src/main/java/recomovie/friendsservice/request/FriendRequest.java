package recomovie.friendsservice.request;

public class FriendRequest {
    private Long sendingUserId;
    private Long receivingUserId;

    public FriendRequest(Long sendingUserId, Long receivingUserId) {
        this.sendingUserId = sendingUserId;
        this.receivingUserId = receivingUserId;
    }

    public Long getSendingUserId() {
        return sendingUserId;
    }

    public void setSendingUserId(Long sendingUserId) {
        this.sendingUserId = sendingUserId;
    }

    public Long getReceivingUserId() {
        return receivingUserId;
    }

    public void setReceivingUserId(Long receivingUserId) {
        this.receivingUserId = receivingUserId;
    }
}
