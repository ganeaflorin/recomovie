package recomovie.moviecatalogservice.models;

import lombok.Data;
import lombok.NonNull;

@Data
public class User {
    @NonNull
    private long id;
    @NonNull
    private String name;

}
