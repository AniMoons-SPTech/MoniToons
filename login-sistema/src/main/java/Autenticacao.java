public class Autenticacao {
    Boolean autenticar (String email, String senha){
        if (email.equals("admin@animoons.com") && senha.equals("animation123")){
            return true;
        } else {
            return false;
        }
    }
}
