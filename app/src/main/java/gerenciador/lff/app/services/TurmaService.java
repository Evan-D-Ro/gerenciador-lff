package gerenciador.lff.app.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import gerenciador.lff.app.model.Turma;
import gerenciador.lff.app.repository.TurmaRepository;

@Service
public class TurmaService {
    @Autowired
    private TurmaRepository turmaRepository;

    private static Logger logger = LoggerFactory.getLogger(TurmaService.class);

    public Map<String, Object> getTurmas(String search, int offset) {
        List<Turma> turmas;
        long totalTurmas;
    
        int page = offset / 5;  // Cálculo do número da página
        int size = 5;          // Tamanho da página
        
        if (search != null && !search.isEmpty()) {
            turmas = turmaRepository.findByNomeContainingIgnoreCase(search);
            totalTurmas = turmas.size();
            logger.info("Buscando turmas - " + totalTurmas + " - Filtro: " + search);

        } else {
            totalTurmas = turmaRepository.count();
            Page<Turma> turmasPage = turmaRepository.findAllByOrderByNomeAsc(PageRequest.of(page, size));
            turmas = turmasPage.getContent();
            logger.info("Buscando turmas - " + totalTurmas);

        }

        Integer newOffset = turmas.size() >= 5 ? offset + 5 : null;

        Map<String, Object> response = new HashMap<>();
        response.put("turmas", turmas);
        response.put("newOffset", newOffset);
        response.put("totalTurmas", totalTurmas);
        logger.info("Buscar turmas concluído");
        return response;
    }

    public void deleteTurmaById(Long id) {
        turmaRepository.deleteById(id);
    }
}
