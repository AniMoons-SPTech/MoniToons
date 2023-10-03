var paginaFormulario = 0
function formularioPagamento(){
    paginaFormulario++
    setTimeout(() => {
        var layout_formulario = document.querySelector("#div_campos_formulario");
    var formulario = document.querySelector("#formulario_compra")
    var botao_continuar = document.getElementById("button_continuar")
    var botao_finalizar = document.getElementById("button_finalizar")
    if(paginaFormulario == 1){
        layout_formulario.innerHTML = `
        <h1 class='texto_compra'>Escolha o seu plano</h1>
            <div class='selecao_planos'>
                  <input type='radio' id='plano_doodle' name='plano' value='Doodle'>
                  <label for='plano_doodle'>Plano Doodle</label><br>
                  <input type='radio' id='plano_sketchPro' name='plano' value='SketchPro'>
                  <label for='plano_sketchPro'>Plano SketchPro</label><br>
                  <input type='radio' id='plano_ultimate' name='plano' value='Ultimate'>
                  <label for='plano_ultimate'>Plano Ultimate</label>
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
        botao_continuar.style.display = "none"
        botao_finalizar.style.display = "block"
    } else if (paginaFormulario == 2){
        formulario.innerHTML = `
        <h1 class='texto_compra'>Pronto! Agora é só baixar o arquivo abaixo e efetuar o login com a conta que você registrou</h1>
        `
    }
    
    }, 100)
    
}
