package gerenciador.lff.app.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import gerenciador.lff.app.services.CriancaService;

@RestController
@RequestMapping("/api/crianca")
public class CriancaController {
    
    @Autowired
    private CriancaService criancaService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getCriancas(
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "0") int offset,
            @RequestParam(required = false) String selectTab) {
        return ResponseEntity.ok(criancaService.getCriancas(search, offset, selectTab));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEscolaById(@PathVariable Long id) {
        criancaService.deleteCriancaById(id);
        return ResponseEntity.noContent().build();
    }

}
