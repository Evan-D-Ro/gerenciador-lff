package gerenciador.lff.app.controller;

import java.time.LocalDate;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import gerenciador.lff.app.model.Permissoes;
import gerenciador.lff.app.services.ChamadaService;
import gerenciador.lff.app.services.SecurityService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/chamada")
public class ChamadaController {


    @Autowired
    private ChamadaService chamadaService;

    @Autowired
    private SecurityService securityService;


    @GetMapping("/get-chamada")
    public ResponseEntity<Map<String, Object>> getChamadaTurma(
            HttpServletRequest request,
            @RequestParam Long idTurma,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataChamada) {

        String token = getToken(request);
        if (token.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Não autorizado!"));
        }

        Permissoes permissoes = securityService.obterPermissoes(token);
        if (!permissoes.getObterChamadas()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Não autorizado!"));
        }

        return ResponseEntity.ok(chamadaService.buscarOuCriarChamada(idTurma, dataChamada));
    }
    
    private String getToken(HttpServletRequest request) {
        String token = "";
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if (cookie.getName().equals("CookieAuth")) {
                    token = cookie.getValue();
                }
            }
            if (!token.isEmpty()) {
                return token;
            } else
                return "";
        }
        return "";
    }
}
