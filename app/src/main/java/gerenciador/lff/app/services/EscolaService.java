package gerenciador.lff.app.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import gerenciador.lff.app.model.Escola;
import gerenciador.lff.app.repository.EscolaRepository;

@Service
public class EscolaService {
    @Autowired
    private EscolaRepository escolaRepository;

    private static Logger logger = LoggerFactory.getLogger(EscolaService.class);

    public Map<String, Object> getEscolas(String search, int offset) {
        List<Escola> escolas;
        long totalEscolas;

        if (search != null && !search.isEmpty()) {
            escolas = escolaRepository.findByNomeContainingIgnoreCase(search);
            totalEscolas = escolas.size();
            logger.info("Buscando escolas - " + totalEscolas + " - Filtro: " + search);

        } else {
            totalEscolas = escolaRepository.count();
            escolas = escolaRepository.findAll(PageRequest.of(offset / 5, 5)).getContent();
            logger.info("Buscando escolas - " + totalEscolas);

        }

        Integer newOffset = escolas.size() >= 5 ? offset + 5 : null;

        Map<String, Object> response = new HashMap<>();
        response.put("escolas", escolas);
        response.put("newOffset", newOffset);
        response.put("totalEscolas", totalEscolas);
        logger.info("Buscar escolas concluído");
        return response;
    }

    public void deleteEscolaById(Long id) {
        escolaRepository.deleteById(id);
    }
}
