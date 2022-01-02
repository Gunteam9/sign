package fr.univ.orleans.signapi.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class TramLineDetails {
    private String numLine;
    private List<Location> geoShape;
    private String geoShapeType;
}