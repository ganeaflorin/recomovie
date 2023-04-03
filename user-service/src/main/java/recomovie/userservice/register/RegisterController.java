package recomovie.userservice.register;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(path = "/register")
@AllArgsConstructor
public class RegisterController {
    private final RegisterService registerService;

    @PostMapping
    public String register(@RequestBody RegisterRequest request) {
        return registerService.register(request);
    }

    @GetMapping(path = "/confirm")
    public String confirm(@RequestParam("token") String token) {
        return registerService.confirmToken(token);
    }
}
