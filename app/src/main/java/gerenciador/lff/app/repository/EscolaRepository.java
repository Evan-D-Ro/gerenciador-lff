package gerenciador.lff.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import gerenciador.lff.app.model.Escola;

public interface EscolaRepository extends JpaRepository <Escola, Long> {
    
    List<Escola> findByNomeContainingIgnoreCase(String nome);

    List<Escola> findAllByOrderByNomeAsc();
}
