package fr.univ.orleans.signapi.dto;

import fr.univ.orleans.signapi.model.Comment;
import fr.univ.orleans.signapi.model.Location;
import lombok.Getter;

@Getter
public class CommentSimple {
    private final long id;
    private final String name;
    private final Location location;

    public CommentSimple(Comment comment) {
        this.id = comment.getId();
        this.name = comment.getName();
        this.location = comment.getLocation();
    }
}
