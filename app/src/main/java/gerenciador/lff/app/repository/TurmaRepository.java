package gerenciador.lff.app.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import gerenciador.lff.app.model.Turma;

public interface TurmaRepository extends JpaRepository <Turma, Long> {
    
    List<Turma> findByNomeContainingIgnoreCase(String nome);
    Page<Turma> findAllByOrderByNomeAsc(Pageable pageable);

}
