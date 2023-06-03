package recomovie.newsfeedservice.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.htmlcleaner.HtmlCleaner;

import java.net.URLDecoder;

@Getter
@Setter
@NoArgsConstructor
public class RssItem {
    private String title;
    private String image;
    private String description;
    private String content;

    public RssItem(String title, String image, String description, String content) {
        this.title = new HtmlCleaner().clean(convertAsciiToString(title)).getText().toString().trim();
        this.image = image;
        this.description = new HtmlCleaner().clean(convertAsciiToString(description)).getText().toString().trim();
        this.content = new HtmlCleaner().clean(convertAsciiToString(content)).getText().toString().trim();
    }

    public static String convertAsciiToString(String input) {
        StringBuilder output = new StringBuilder();
        int startIndex = 0;
        int endIndex;
        while (startIndex < input.length()) {
            if (input.charAt(startIndex) == '&') {
                endIndex = input.indexOf(";", startIndex);
                if (endIndex != -1) {
                    String asciiValue = input.substring(startIndex + 2, endIndex); // Skip "&#"
                    try {
                        int decimalValue = Integer.parseInt(asciiValue);
                        output.append((char) decimalValue);
                    } catch (NumberFormatException e) {
                        // Handle invalid ASCII value
                        output.append("?");
                    }
                    startIndex = endIndex + 1;
                } else {
                    output.append(input.charAt(startIndex));
                    startIndex++;
                }
            } else {
                output.append(input.charAt(startIndex));
                startIndex++;
            }
        }

        return output.toString();
    }
}
