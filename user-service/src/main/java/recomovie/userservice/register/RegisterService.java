package recomovie.userservice.register;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import recomovie.userservice.email.EmailService;
import recomovie.userservice.register.token.ConfirmationToken;
import recomovie.userservice.register.token.ConfirmationTokenService;
import recomovie.userservice.user.User;
import recomovie.userservice.user.UserRole;
import recomovie.userservice.user.UserService;

import java.time.LocalDateTime;

import static java.util.Objects.nonNull;
import static recomovie.userservice.constants.ErrorConstants.EMAIL_ALREADY_CONFIRMED;
import static recomovie.userservice.constants.ErrorConstants.EMAIL_CONFIRMED_SUCCESS;
import static recomovie.userservice.constants.ErrorConstants.EMAIL_FORMAT_NOT_VALID;
import static recomovie.userservice.constants.ErrorConstants.TOKEN_EXPIRED;
import static recomovie.userservice.constants.ErrorConstants.TOKEN_NOT_FOUND;

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

    public String register(RegisterRequest request) {
        boolean isValidEmail = emailValidator.test((request.getEmail()));
        if (!isValidEmail) {
            throw new IllegalStateException(EMAIL_FORMAT_NOT_VALID);
        }
        User user = new User(request.getUsername(), request.getPassword(), request.getEmail(), UserRole.USER);
        userService.saveUser(user);
        return sendConfirmationMail(user);
    }

    private String sendConfirmationMail(User user) {
        String token = confirmationTokenService.generateAndSaveToken(user);
        String link = confirmPath + token;
        emailService.send(user.getEmail(), user.getUsername(), link);
        return token;
    }

    public String confirmToken(String token) {
        ConfirmationToken confirmationToken = confirmationTokenService.getToken(token).orElseThrow(() -> new IllegalStateException(TOKEN_NOT_FOUND));
        if (nonNull(confirmationToken.getConfirmedAt())) {
            throw new IllegalStateException(EMAIL_ALREADY_CONFIRMED);
        }
        LocalDateTime expiresAt = confirmationToken.getExpiresAt();
        if (expiresAt.isBefore(LocalDateTime.now())) {
            sendConfirmationMail(confirmationToken.getUser());
            throw new IllegalStateException(TOKEN_EXPIRED);
        }
        confirmationTokenService.setConfirmedAt(token);
        userService.enableUser(confirmationToken.getUser().getUsername());
        return EMAIL_CONFIRMED_SUCCESS;
    }
}
