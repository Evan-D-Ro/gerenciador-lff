package gerenciador.lff.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import gerenciador.lff.app.model.Permissoes;
import gerenciador.lff.app.model.Pessoa;

@Repository
public interface PermissoesRepository extends JpaRepository <Permissoes, Long> {
    Permissoes findByPessoa(Pessoa pessoa);

}
