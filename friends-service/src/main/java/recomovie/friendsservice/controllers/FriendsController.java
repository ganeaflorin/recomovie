package recomovie.friendsservice.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import recomovie.friendsservice.request.FriendRequest;
import recomovie.friendsservice.request.UpdateFriendRequestStatus;
import recomovie.friendsservice.services.FriendsService;

@RestController
@RequestMapping("/friends")
@AllArgsConstructor
public class FriendsController {
    private FriendsService friendsService;

    @PostMapping
    public ResponseEntity sendFriendRequest(@RequestBody FriendRequest friendRequest) {
        return friendsService.saveFriendRequest(friendRequest);
    }
    @GetMapping
    public ResponseEntity getFriendList(@RequestParam Long id) {
        return friendsService.getFriendList(id);
    }

    @RequestMapping("/requests")
    @GetMapping
    public ResponseEntity getFriendRequests(@RequestParam Long id) {
        return friendsService.getFriendRequests(id);
    }

    @RequestMapping("/status/update")
    @PatchMapping
    public ResponseEntity updateFriendshipStatus(@RequestBody UpdateFriendRequestStatus friendRequestStatus) {
        return friendsService.updateFriendRequestStatus(friendRequestStatus);
    }

    @RequestMapping("/status")
    @GetMapping
    public ResponseEntity getFriendshipStatus(@RequestParam Long sendingUserId, Long receivingUserId ) {
        return friendsService.getFriendshipStatus(sendingUserId, receivingUserId);
    }
}
