package recomovie.playlistsservice.request;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class PlaylistRequest {
    private String name;
    private List<Long> movies;
    private Long userId;
    private String userInput;
}
