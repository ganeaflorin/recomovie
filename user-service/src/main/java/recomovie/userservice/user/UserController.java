package recomovie.userservice.user;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity getUserById(@RequestParam Long id) {
        return userService.getUserById(id);
    }

    @GetMapping
    @RequestMapping("/search")
    public ResponseEntity getUsersBySubstring(@RequestParam String query) {
        return userService.getUsersBySubstring(query);
    }
}
