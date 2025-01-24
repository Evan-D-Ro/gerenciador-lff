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

import gerenciador.lff.app.services.EscolaService;

@RestController
@RequestMapping("/api/escola")
public class EscolaController {
    
    @Autowired
    private EscolaService escolaService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getEscolas(
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "0") int offset) {
        return ResponseEntity.ok(escolaService.getEscolas(search, offset));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEscolaById(@PathVariable Long id) {
        escolaService.deleteEscolaById(id);
        return ResponseEntity.noContent().build();
    }

}
