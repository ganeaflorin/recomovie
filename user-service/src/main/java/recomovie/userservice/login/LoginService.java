package recomovie.userservice.login;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import recomovie.userservice.user.UserInfoResponse;
import recomovie.userservice.user.User;
import recomovie.userservice.user.UserRepository;

import java.util.Optional;

import static org.springframework.http.HttpStatus.OK;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;
import static recomovie.userservice.constants.ErrorConstants.ACCOUNT_NOT_CONFIRMED;
import static recomovie.userservice.constants.ErrorConstants.LOGIN_INVALID_CREDENTIALS;

@Service
public class LoginService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public LoginService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public ResponseEntity login(LoginRequest request) {
        Optional<User> optionalUser = userRepository.findByUsername(request.getUsername());
        if (optionalUser.isEmpty()) {
            return new ResponseEntity<>(LOGIN_INVALID_CREDENTIALS, UNAUTHORIZED);
        }
        User user = optionalUser.get();
        if(!bCryptPasswordEncoder.matches(request.getPassword(), user.getPassword())) {
            return new ResponseEntity<>(LOGIN_INVALID_CREDENTIALS, UNAUTHORIZED);
        }
        if(!user.getEnabled()) {
            return new ResponseEntity<>(ACCOUNT_NOT_CONFIRMED, UNAUTHORIZED);
        }
        return new ResponseEntity<>(new UserInfoResponse(user.getId(), user.getUsername()), OK);
    }
}
