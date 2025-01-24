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

import gerenciador.lff.app.model.Crianca;
import gerenciador.lff.app.repository.CriancaRepository;

@Service
public class CriancaService {
    @Autowired
    private CriancaRepository criancaRepository;

    private static Logger logger = LoggerFactory.getLogger(CriancaService.class);

    public Map<String, Object> getCriancas(String search, int offset, String selectTab) {
        List<Crianca> criancas;
        long totalCriancas;
    
        int page = offset / 5;  // Cálculo do número da página
        int size = 5;          // Tamanho da página
        if ("draft".equals(selectTab)) {
            if (search != null && !search.isEmpty()) {
                criancas = criancaRepository.findByNomeContainingIgnoreCaseAndCadastroAtivoIsFalse(search);
                totalCriancas = criancas.size();
                logger.info("Buscando crianças com cadastro desativado - " + totalCriancas + " - Filtro: " + search);
            } else {
                Page<Crianca> criancasPage = criancaRepository.findAllByCadastroAtivoIsFalseOrderByNomeAsc(PageRequest.of(page, size));
                criancas = criancasPage.getContent();
                totalCriancas = criancasPage.getTotalElements();
                logger.info("Buscando crianças desativadas -  " + totalCriancas);

            }
        } else if ("active".equals(selectTab)) {
            if (search != null && !search.isEmpty()) {
                criancas = criancaRepository.findByNomeContainingIgnoreCaseAndCadastroAtivoIsTrue(search);
                totalCriancas = criancas.size();
                logger.info("Buscando crianças com cadastro ativado - " + totalCriancas + " - Filtro: " + search);
            } else {
                Page<Crianca> criancasPage = criancaRepository.findAllByCadastroAtivoIsTrueOrderByNomeAsc(PageRequest.of(page, size));
                criancas = criancasPage.getContent();
                totalCriancas = criancasPage.getTotalElements();
                logger.info("Buscando crianças ativas -  " + totalCriancas);

            }
        } else {
            if (search != null && !search.isEmpty()) {
                criancas = criancaRepository.findByNomeContainingIgnoreCase(search);
                totalCriancas = criancas.size();
                logger.info("Buscando todas as crianças -  " + totalCriancas + " - Filtro: " + search);

            } else {
                Page<Crianca> criancasPage = criancaRepository.findAllByOrderByNomeAsc(PageRequest.of(page, size));
                criancas = criancasPage.getContent();
                totalCriancas = criancasPage.getTotalElements();
                logger.info("Buscando todas as crianças -  " + totalCriancas);
            }
        }
    
        Integer newOffset = criancas.size() >= size ? offset + size : null;
    
        Map<String, Object> response = new HashMap<>();
        response.put("criancas", criancas);
        response.put("newOffset", newOffset);
        response.put("totalCriancas", totalCriancas);
        logger.info("Buscar criancas concluído");
        return response;
    }
    

    public void deleteCriancaById(Long id) {
        criancaRepository.deleteById(id);
    }
}
