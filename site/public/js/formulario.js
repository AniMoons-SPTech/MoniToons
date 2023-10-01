var paginaFormulario = 0
function formularioPagamento(){
    paginaFormulario++
    var formulario = document.querySelector("#formulario");
    if(paginaFormulario == 1){
        formulario.innerHTML = `
        <h1 class='texto_compra'>Escolha o seu plano</h1>
            <div class='selecao_planos'>
                  <input type='radio' id='html' name='fav_language' value='HTML'>
                  <label for='html'>Plano Básico</label><br>
                  <input type='radio' id='css' name='fav_language' value='CSS'>
                  <label for='css'>Plano Intermediário</label><br>
                  <input type='radio' id='javascript' name='fav_language' value='JavaScript'>
                  <label for='javascript'>Plano Premium</label>
            </div>
                <h2 class='texto_compra'>Informe os dados do seu cartão de crédito</h2>
                <div class='email'>
                    <h2 class='label'>Número do cartão</h2>
                    <input type='text' class="input" onfocus='subirLabel(1)' onfocusout='descerLabel(1)'>
                </div>
                <div class='email'>
                    <h2 class='label'>Nome no cartão</h2>
                    <input type='text' class="input" onfocus='subirLabel(2)' onfocusout='descerLabel(2)'>
                </div>
                <div class='mesma_linha'>
                    <div class='campo_simples'>
                        <h2 class='label'>Data de expiração</h2>
                        <input type='date' required placeholder="" class="input_date input" onfocus='subirLabel(3)' onfocusout='descerLabel(3)'>
                    </div>
                    <div class='campo_simples'>
                        <h2 class='label'>Código de segurança(CVV)</h2>
                        <input type='text'  onfocus='subirLabel(4)' onfocusout='descerLabel(4)'
                        maxLength="3">
                    </div>
                </div>
        `
    } else if (paginaFormulario == 2){
        formulario.innerHTML = `
        <h1 class='texto_compra'>Pronto! Agora é só baixar o arquivo abaixo e efetuar o login com a conta que você registrou</h1>
        `
    }
    
}
