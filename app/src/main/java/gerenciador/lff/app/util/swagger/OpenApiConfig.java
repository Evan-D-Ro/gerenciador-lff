package gerenciador.lff.app.util.swagger;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.security.SecurityScheme.Type;


@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API Gerenciador Lar Francisco Franco")
                        .description("API para gerenciamento de turmas, matriculados e chamada da entidade.")
                        .version("0.2.0")
                        .license(new License()
                                .name("Apache Maven 3.9.9")
                                .url("https://maven.apache.org/docs/3.9.9/release-notes.html")))
                        .addSecurityItem(new SecurityRequirement().addList("bearerAuth"))
                            .components(new io.swagger.v3.oas.models.Components()
                            .addSecuritySchemes("bearerAuth", new SecurityScheme()
                                .type(Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT"))); // Ou qualquer formato esperado
    }
}
