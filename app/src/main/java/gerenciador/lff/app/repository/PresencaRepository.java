package gerenciador.lff.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import gerenciador.lff.app.model.Chamada;
import gerenciador.lff.app.model.Presenca;

public interface PresencaRepository extends JpaRepository<Presenca, Long> {
    
    List<Presenca> findByChamada(Chamada chamada);
}
