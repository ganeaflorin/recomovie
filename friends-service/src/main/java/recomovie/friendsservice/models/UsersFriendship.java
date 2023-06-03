package recomovie.friendsservice.models;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.type.YesNoConverter;

@NoArgsConstructor
@Setter
@Getter
@EqualsAndHashCode
@Entity
@Table(name = "users_friendship")
public class UsersFriendship {
    @SequenceGenerator(name = "users_friendship_sequence", sequenceName = "users_friendship_sequence", allocationSize = 1)
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "users_friendship_sequence")
    @Column(name = "id")
    private Long id;
    private Long sendingUserId;
    private Long receivingUserId;
    @Convert(converter= YesNoConverter.class)
    private Boolean status;

    public UsersFriendship(Long sendingUserId, Long receivingUserId, Boolean status) {
        this.sendingUserId = sendingUserId;
        this.receivingUserId = receivingUserId;
        this.status = status;
    }
}
