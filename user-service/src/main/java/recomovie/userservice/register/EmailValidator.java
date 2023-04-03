package recomovie.userservice.register;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.function.Predicate;

@Service
@AllArgsConstructor
public class EmailValidator implements Predicate<String> {
    private static final String REGEX_PATTERN = ".+@.+\\..+";

    @Override
    public boolean test(String s) {
        return s.matches(REGEX_PATTERN);
    }
}
