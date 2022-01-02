package fr.univ.orleans.signapi.model;

import fr.univ.orleans.signapi.utils.VeloRoadType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class VeloRoad {
    private VeloRoadType type;
    private String name;
    private float length;
    private List<Location> geoShape;
    private String geoShapeType;
}
