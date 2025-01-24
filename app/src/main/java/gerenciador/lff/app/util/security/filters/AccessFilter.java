package gerenciador.lff.app.util.security.filters;

import java.io.IOException;

import gerenciador.lff.app.util.security.JWTTokenProvider;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class AccessFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        String token = req.getHeader("Authorization"); 
        if(token!=null && JWTTokenProvider.verifyToken(token))
        {   
            // Claims claims=JWTTokenProvider.getAllClaimsFromToken(token);
            // int nivel = (Integer)claims.get("nivel");

            // String requestURI = req.getRequestURI();

            // if (requestURI.startsWith("/admin") && nivel != 1) {
            //     ((HttpServletResponse)response).setStatus(HttpServletResponse.SC_FORBIDDEN);
            //     response.getOutputStream().write("Acesso negado: somente administradores".getBytes());
            //     return;
            // }
    
            // // Se o nível de acesso for permitido, continue com a requisição
            // request.setAttribute("nivel", "" + nivel);
            chain.doFilter(request, response);      
        }
        else{
            ((HttpServletResponse)response).setStatus(500);
            response.getOutputStream().write("Não autorizado".getBytes()); 
        }
    }
}

