package recomovie.friendsservice.services;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import recomovie.friendsservice.models.Friend;
import recomovie.friendsservice.models.UsersFriendship;
import recomovie.friendsservice.models.UsersFriendshipRepository;
import recomovie.friendsservice.request.FriendRequest;
import recomovie.friendsservice.request.UpdateFriendRequestStatus;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;
import static recomovie.friendsservice.constants.StringConstants.BASE_URL;
import static recomovie.friendsservice.constants.StringConstants.USERS_ENDPOINT;

@Service
@AllArgsConstructor
public class FriendsService {
    private final UsersFriendshipRepository friendsRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    public ResponseEntity saveFriendRequest(FriendRequest friendRequest) {
        UsersFriendship usersFriendship = new UsersFriendship(friendRequest.getSendingUserId(), friendRequest.getReceivingUserId(), null);
        friendsRepository.save(usersFriendship);
        return new ResponseEntity(CREATED);
    }

    public ResponseEntity updateFriendRequestStatus(UpdateFriendRequestStatus friendRequestStatus) {
        Boolean status = friendRequestStatus.getStatus();
        if (!status) {
            friendsRepository.deleteUserFriendship(friendRequestStatus.getSendingUserId(), friendRequestStatus.getReceivingUserId());
        } else {
            friendsRepository.updateStatus(friendRequestStatus.getSendingUserId(), friendRequestStatus.getReceivingUserId(), friendRequestStatus.getStatus());
        }
        return new ResponseEntity(OK);
    }

    public ResponseEntity getFriendList(Long userId) {
        List<UsersFriendship> usersFriendshipList = friendsRepository.getFriendList(userId);
        List<Long> friendIds = new ArrayList<>();
        for (UsersFriendship usersFriendship : usersFriendshipList) {
            if (usersFriendship.getReceivingUserId().equals(userId)) {
                friendIds.add(usersFriendship.getSendingUserId());
            } else {
                friendIds.add(usersFriendship.getReceivingUserId());
            }
        }
        return getFriendsInfo(friendIds);
    }

    public ResponseEntity getFriendRequests(Long userId) {
        List<Long> friendRequestsIds = friendsRepository.getFriendRequests(userId);
        return getFriendsInfo(friendRequestsIds);
    }

    private ResponseEntity getFriendsInfo(List<Long> friendRequestsIds) {
        List<Friend> friendList = new ArrayList<>();
        for (Long friendId : friendRequestsIds) {
            UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(BASE_URL + USERS_ENDPOINT)
                    .queryParam("id", friendId);
            Friend friend = restTemplate.exchange(builder.toUriString(), HttpMethod.GET,
                    null, Friend.class).getBody();
            friendList.add(friend);
        }
        return new ResponseEntity<>(friendList, OK);
    }

    public ResponseEntity getFriendshipStatus(Long sendingUserId, Long receivingUserId) {
        Optional<UsersFriendship> usersFriendship = friendsRepository.getFriendship(sendingUserId, receivingUserId);
        if (usersFriendship.isPresent()) {
            return new ResponseEntity<>(usersFriendship.get(), OK);
        }
        UsersFriendship uf = new UsersFriendship(sendingUserId, receivingUserId, false);
        return new ResponseEntity<>(uf, OK);
    }
}
