package gerenciador.lff.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class PresencaDTO {
    private Long idCrianca;
    private String nomeCrianca;
    private String statusCrianca;
    private Boolean presente;
}