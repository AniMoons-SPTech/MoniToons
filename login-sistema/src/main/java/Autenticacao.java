import org.springframework.jdbc.core.JdbcTemplate;

public class Autenticacao {
    Boolean autenticar (String email, String senha){
        Boolean autenticacao = false;
        Conexao conexao = new Conexao();
        JdbcTemplate con = conexao.getConexaoDoBanco();
        String senhaCerta = con.queryForObject("SELECT senha FROM usuario WHERE email = ?",String.class,email);
        if (senhaCerta.equals(senha)){
            autenticacao = true;
        }
        else {
            autenticacao = false;
        }
        return autenticacao;
    }
}
