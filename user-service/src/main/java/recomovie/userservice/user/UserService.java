package recomovie.userservice.user;

import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import static recomovie.userservice.constants.ErrorConstants.USERNAME_ALREADY_EXISTS;
import static recomovie.userservice.constants.ErrorConstants.USERNAME_NOT_FOUND;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(USERNAME_NOT_FOUND));
    }

    public void saveUser(User user) {
        boolean userExists = userRepository
                .findByUsername(user.getUsername())
                .isPresent();
        if (userExists) {
            throw new IllegalStateException(USERNAME_ALREADY_EXISTS);
        }
        String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        userRepository.save(user);
    }

    public int enableUser(String username) {
        return userRepository.enableUser(username);
    }
}
