package recomovie.recommendationsystemservice.models;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class UserInput {
    private String userInput;

    public UserInput(String userInput) {
        this.userInput = userInput;
    }

    public String getUserInput() {
        return userInput;
    }

    public void setUserInput(String userInput) {
        this.userInput = userInput;
    }
}
