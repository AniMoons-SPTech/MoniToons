
import java.util.Scanner;

public class SistemaLogin {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Autenticacao logar = new Autenticacao();
        Boolean logou = false;
        while(!logou){
            System.out.println("LOGIN PLATAFORMA DE MONITORAMENTO");
        System.out.println("Digite o seu email para efetuar o login");
        String email = scanner.nextLine();
        System.out.println("Digite a sua senha");
        String senha = scanner.nextLine();

        Boolean login = logar.autenticar(email, senha);
        logou = login;
        if (login){
            System.out.println("Parabéns, você logou com sucesso");
        } else {
            System.out.println("Email ou senha estão incorretos! Verifique e tente novamente");
        }
        }
    }
}
