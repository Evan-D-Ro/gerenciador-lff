package gerenciador.lff.app.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import gerenciador.lff.app.model.Chamada;
import gerenciador.lff.app.model.Turma;

@Repository
public interface ChamadaRepository extends JpaRepository<Chamada, Long> {
    Chamada findByTurmaAndDataChamada(Turma turma, LocalDate dataChamada);
}
