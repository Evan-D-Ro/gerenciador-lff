package gerenciador.lff.app.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class ChamadaResponseDTO {
    private Long idChamada;
    private LocalDate dataChamada;
    private String nomeTurma;
    private List<PresencaDTO> presencas;
}