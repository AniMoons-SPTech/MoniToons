function modeloEmail(usuario, link) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>AniMoons - Recuperação de Senha</title>
            <style>
                /* Estilos de e-mail */
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }

                #container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    border-radius: 5px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }

                h1 {
                    color: #333;
                    font-size: 24px;
                }

                p {
                    color: #666;
                    font-size: 16px;
                    line-height: 1.5;
                }

                #btn-container {
                    text-align: center;
                    margin-top: 30px;
                }

                #reset-button {
                    display: inline-block;
                    background-color: #007bff;
                    color: #fff;
                    padding: 10px 20px;
                    text-decoration: none;
                    border-radius: 5px;
                }

                #reset-button:hover {
                    background-color: #0056b3;
                }
            </style>
        </head>
        <body>
            <div id="container">
                <h1>AniMoons - Recuperação de Senha</h1>
                <p>Olá, <b>${usuario}</b></p>
                <p>Você solicitou a recuperação de senha para a sua conta na AniMoons. Clique no botão abaixo para redefinir a sua senha:</p>
                <div id="btn-container">
                    <a id="reset-button" href="${link}">Redefinir Senha</a>
                </div>
                <p>Se você não solicitou esta recuperação de senha, ignore este e-mail.</p>
                <p>Obrigado por escolher a AniMoons!</p>
            </div>
        </body>
        </html>
    `
}

module.exports = {
    modeloEmail
}
