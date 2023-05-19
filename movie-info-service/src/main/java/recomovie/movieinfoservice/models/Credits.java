package recomovie.movieinfoservice.models;

import lombok.NoArgsConstructor;

import java.util.List;
@NoArgsConstructor
public class Credits {
    private String id;
    private List<Actor> cast;
    private List<Person> crew;

    public Credits(String id, List<Actor> cast, List<Person> crew) {
        this.id = id;
        this.cast = cast;
        this.crew = crew;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<Actor> getCast() {
        return cast;
    }

    public void setCast(List<Actor> cast) {
        this.cast = cast;
    }

    public List<Person> getCrew() {
        return crew;
    }

    public void setCrew(List<Person> crew) {
        this.crew = crew;
    }
}
