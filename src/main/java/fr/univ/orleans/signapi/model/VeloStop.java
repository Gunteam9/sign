package fr.univ.orleans.signapi.model;

import fr.univ.orleans.signapi.utils.VeloStopType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class VeloStop {
    private VeloStopType type;
    private Location location;
}
