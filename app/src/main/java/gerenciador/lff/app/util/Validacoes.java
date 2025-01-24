package gerenciador.lff.app.util;

import java.util.List;

import br.com.caelum.stella.ValidationMessage;
import br.com.caelum.stella.validation.CPFValidator;
import gerenciador.lff.app.util.security.JWTTokenProvider;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

public class Validacoes {

    public static boolean validaCPF(String cpf) {
        CPFValidator cpfValidator = new CPFValidator();
        List<ValidationMessage> erros = cpfValidator.invalidMessagesFor(cpf);
        return erros.isEmpty();
    }

    public static Boolean validaAutenticacao(HttpServletRequest request) {
        String token = "";
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if (cookie.getName().equals("CookieAuth")) {
                    token = cookie.getValue();
                    return JWTTokenProvider.verifyToken(token);
                }
                else
                    return false;
            }
            return true;    
        }
        else
        {
            return false;
        }
    }
}
