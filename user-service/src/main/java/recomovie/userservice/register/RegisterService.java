package recomovie.userservice.register;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import recomovie.userservice.email.EmailService;
import recomovie.userservice.register.token.ConfirmationToken;
import recomovie.userservice.register.token.ConfirmationTokenService;
import recomovie.userservice.user.User;
import recomovie.userservice.user.UserRole;
import recomovie.userservice.user.UserService;

import java.time.LocalDateTime;

import static java.util.Objects.nonNull;
import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.GONE;
import static org.springframework.http.HttpStatus.OK;
import static recomovie.userservice.constants.ErrorConstants.EMAIL_ALREADY_CONFIRMED;
import static recomovie.userservice.constants.ErrorConstants.EMAIL_CONFIRMED_SUCCESS;
import static recomovie.userservice.constants.ErrorConstants.EMAIL_FORMAT_NOT_VALID;
import static recomovie.userservice.constants.ErrorConstants.TOKEN_EXPIRED;
import static recomovie.userservice.constants.ErrorConstants.TOKEN_NOT_FOUND;

@SuppressWarnings("ALL")
@Service
public class RegisterService {
    @Value("${confirm.path}")
    private String confirmPath;
    private final ConfirmationTokenService confirmationTokenService;
    private final EmailValidator emailValidator;
    private final EmailService emailService;
    private final UserService userService;

    public RegisterService(ConfirmationTokenService confirmationTokenService, EmailValidator emailValidator, EmailService emailService, UserService userService) {
        this.confirmationTokenService = confirmationTokenService;
        this.emailValidator = emailValidator;
        this.emailService = emailService;
        this.userService = userService;
    }

    public ResponseEntity register(RegisterRequest request) {
        boolean isValidEmail = emailValidator.test((request.getEmail()));
        if (!isValidEmail) {
            return new ResponseEntity<>(EMAIL_FORMAT_NOT_VALID, BAD_REQUEST);
        }
        User user = new User(request.getUsername(), request.getPassword(), request.getEmail(), UserRole.USER);
        ResponseEntity response = userService.saveUser(user);
        if (response.getStatusCode().equals(CREATED)) {
            sendConfirmationMail(user);
        }
        return response;
    }

    private void sendConfirmationMail(User user) {
        String token = confirmationTokenService.generateAndSaveToken(user);
        String link = confirmPath + token;
        emailService.send(user.getEmail(), user.getUsername(), link);
    }

    public ResponseEntity confirmToken(String token) {
        ConfirmationToken confirmationToken = confirmationTokenService.getToken(token).orElseThrow(() -> new IllegalStateException(TOKEN_NOT_FOUND));
        if (nonNull(confirmationToken.getConfirmedAt())) {
            return new ResponseEntity<>(EMAIL_ALREADY_CONFIRMED, CONFLICT);
        }
        LocalDateTime expiresAt = confirmationToken.getExpiresAt();
        if (expiresAt.isBefore(LocalDateTime.now())) {
            sendConfirmationMail(confirmationToken.getUser());
            return new ResponseEntity<>(TOKEN_EXPIRED, GONE);

        }
        confirmationTokenService.setConfirmedAt(token);
        userService.enableUser(confirmationToken.getUser().getUsername());
        return new ResponseEntity<>(EMAIL_CONFIRMED_SUCCESS, OK);

    }
}
