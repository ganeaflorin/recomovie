package recomovie.userservice.user;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.OK;
import static recomovie.userservice.constants.ErrorConstants.USERNAME_ALREADY_EXISTS;
import static recomovie.userservice.constants.ErrorConstants.USERNAME_NOT_FOUND;
import static recomovie.userservice.constants.ErrorConstants.USER_NOT_FOUND;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(USERNAME_NOT_FOUND));
    }

    public ResponseEntity saveUser(User user) {
        boolean userExists = userRepository
                .findByUsername(user.getUsername())
                .isPresent();
        if (userExists) {
            return new ResponseEntity<>(USERNAME_ALREADY_EXISTS, CONFLICT);
        }
        String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        userRepository.save(user);
        return new ResponseEntity<>(CREATED);
    }

    public int enableUser(String username) {
        return userRepository.enableUser(username);
    }

    public ResponseEntity getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            UserInfoResponse userInfo = new UserInfoResponse(user.get());
            return new ResponseEntity<>(userInfo, OK);
        }
        return new ResponseEntity<>(USER_NOT_FOUND, NOT_FOUND);
    }

    public ResponseEntity getUsersBySubstring(String substring) {
        return new ResponseEntity<>(userRepository.findByUsernameSubstring(substring), OK);
    }
}
