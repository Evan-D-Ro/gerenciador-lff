package gerenciador.lff.app.services;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gerenciador.lff.app.dto.PresencaDTO;
import gerenciador.lff.app.model.Chamada;
import gerenciador.lff.app.model.Crianca;
import gerenciador.lff.app.model.Presenca;
import gerenciador.lff.app.model.Turma;
import gerenciador.lff.app.repository.ChamadaRepository;
import gerenciador.lff.app.repository.CriancaRepository;
import gerenciador.lff.app.repository.PresencaRepository;
import gerenciador.lff.app.repository.TurmaRepository;

@Service
public class ChamadaService {
    
    @Autowired
    private CriancaRepository criancaRepository;

    @Autowired
    private TurmaRepository turmaRepository;

    @Autowired
    private ChamadaRepository chamadaRepository;

    @Autowired
    private PresencaRepository presencaRepository;

    private static final Logger logger = LoggerFactory.getLogger(ChamadaService.class);

    public Map<String, Object> getChamadaTurma(long idTurma, LocalDate date) {

        List<Crianca> criancas;
        Turma turma = turmaRepository.findById(idTurma).orElse(null);
        if (turma != null) {
            criancas = criancaRepository.findAllByTurmaAndCadastroAtivoIsTrueOrderByNomeAsc(turma);
            logger.info("Buscando crianças por turma (" + idTurma + ") com cadastro ativado para chamada");
        }
        else {
            logger.error("Erro ao buscar turma - (" + idTurma + ")");
            return null;
        }


        Map<String, Object> response = new HashMap<>();
        response.put("criancas", criancas);
        logger.info("Buscar criancas por turma para chamada concluído");
        return response;
    }
    
    public Map<String, Object> buscarOuCriarChamada(Long idTurma, LocalDate dataChamada) {
        Map<String, Object> response = new HashMap<>();

        // Buscar a turma pelo ID
        Turma turma = turmaRepository.findById(idTurma).orElse(null);
        if (turma == null) {
            response.put("error", "Turma não encontrada!");
            return response;
        }
    
        // Verifica se já existe uma chamada para essa turma e data
        Chamada chamada = chamadaRepository.findByTurmaAndDataChamada(turma, dataChamada);

        if (chamada != null) {
            // Se a chamada já existir, buscamos as presenças registradas
            List<Presenca> presencas = presencaRepository.findByChamada(chamada);
            List<PresencaDTO> presencaDTOs = presencas.stream()
                    .map(p -> new PresencaDTO(p.getCrianca().getId(), p.getCrianca().getNome(), p.getCrianca().getStatus() ,p.getPresente()))
                    .sorted(Comparator.comparing(PresencaDTO::getNomeCrianca))
                    .collect(Collectors.toList());
            response.put("chamada_existente", true);
            response.put("chamada_id", chamada.getId());
            response.put("presencas", presencaDTOs);
        } else {
            // Se não houver chamada, retornamos a lista de alunos para realizar a chamada
            List<Crianca> criancas = criancaRepository.findAllByTurmaAndCadastroAtivoIsTrueOrderByNomeAsc(turma);
            List<PresencaDTO> presencaDTOs = criancas.stream()
                .map(c -> new PresencaDTO(c.getId(), c.getNome(), c.getStatus() ,true)) // Ainda sem presença marcada
                .sorted(Comparator.comparing(PresencaDTO::getNomeCrianca))
                .collect(Collectors.toList());

            response.put("chamada_existente", false);
            response.put("presencas", presencaDTOs);
        }

        return response;
    }
    
    
}
