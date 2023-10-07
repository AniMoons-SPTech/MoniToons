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
            <div class="tooltip" id="tooltip-planos">Preencha o nome corretamente.</div>
            </div>
                <h2 class='texto_compra'>Informe os dados do seu cartão de crédito</h2>
                <div class='campo_maior'>
                    <h2 class='label'>Número do cartão</h2>
                    <input type='text' class="input" onfocus='subirLabel(1)' onfocusout='descerLabel(1)'
                    onkeyup="validarNumeroCartao(this)" id="input_num_cartao">
                    <div class="tooltip" id="tooltip-numero-cartao">Informe os números do seu cartão corretamente.</div>
                </div>
                <div class='campo_maior'>
                    <h2 class='label'>Nome no cartão</h2>
                    <input type='text' class="input" onfocus='subirLabel(2)' onfocusout='descerLabel(2)'
                    onkeyup="validarNomeCartao(this)" id="input_nome_cartao">
                    <div class="tooltip" id="tooltip-nome-cartao">Preencha o nome corretamente.</div>
                </div>  
                <div class='mesma_linha'>
                    <div class='campo_simples'>
                        <h2 class='label'>Data de validade</h2>
                        <input type='text' required placeholder="MM/AA" class="input_date input" onfocus='subirLabel(3)' onfocusout='descerLabel(3)'
                        onkeyup="validarValidade(this)" id="input_validade">
                        <div class="tooltip" id="tooltip-validade">Informe uma validade válida.</div>
                    </div>
                    <div class='campo_simples'>
                        <h2 class='label'>Código de segurança(CVV)</h2>
                        <input type='text'  onfocus='subirLabel(4)' onfocusout='descerLabel(4)'
                        maxLength="3" onkeyup="validarCodSeguranca(this)" id="input_codigo_seguranca">
                        <div class="tooltip" id="tooltip-codigo-seguranca">Preencha o código corretamente.</div>
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
function mudaPessoa(numeroPessoa) {
    var botoes = document.querySelectorAll(".muda_dados")
    if (numeroPessoa == 1) {
        label_rg_nome_fantasia.innerHTML = "RG"
        label_cpf_cnpj.innerHTML = "CPF"
    } else if (numeroPessoa == 2) {
        label_rg_nome_fantasia.innerHTML = "Nome Fantasia"
        label_cpf_cnpj.innerHTML = "CNPJ"
    }
    if (!botoes[(numeroPessoa - 1)].classList.contains("botao_ativado")) {
        botoes.forEach((botao) => {
            botao.classList.toggle("botao_ativado")
        })
    }

}
function subirLabel(numeroLabel) {
    var listaLabels = document.querySelectorAll(".label")

    listaLabels[(numeroLabel - 1)].style = "animation: subir 0.5s ease forwards;"
}
function descerLabel(numeroLabel) {
    var listaLabels = document.querySelectorAll(".label")
    var listaInputs = document.querySelectorAll(".input")
    if (listaInputs[(numeroLabel - 1)] == "") {
        listaLabels[(numeroLabel - 1)].style = "animation: descer 0.5s ease forwards;"
    }
}


function exibirTooltip(elementId) {
    document.getElementById(elementId).style.display = "block";
}

function ocultarTooltip(elementId) {
    document.getElementById(elementId).style.display = "none";
}

function validarNome(inputNome) {
    const nome = inputNome.value.trim();
    const tooltip = "tooltip-nome";

    if (nome === "") {
        exibirTooltip(tooltip);
        return false;
    } else {
        ocultarTooltip(tooltip);
        return true;
    }
}

function validarSobrenome(inputSobrenome) {
    const sobrenome = inputSobrenome.value.trim();
    const tooltip = "tooltip-sobrenome";

    if (sobrenome === "") {
        exibirTooltip(tooltip);
        return false;
    } else {
        ocultarTooltip(tooltip);
        return true;
    }
}

function validarEmail(inputEmail) {
    const email = inputEmail.value.trim();
    const tooltip = "tooltip-email";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        exibirTooltip(tooltip);
        return false;
    } else {
        ocultarTooltip(tooltip);
        return true;
    }
}

function validarSenha(inputSenha) {
    const senha = inputSenha.value;
    const tooltip = "tooltip-senha";

    if (senha.length < 8) {
        exibirTooltip(tooltip);
        return false;
    } else {
        ocultarTooltip(tooltip);
        return true;
    }
}

function validarConfirmacaoSenha(inputConfirmarSenha) {
    const senha = document.getElementById("input_senha").value;
    const confirmarSenha = inputConfirmarSenha.value;
    const tooltip = "tooltip-confirmar-senha";

    if (senha !== confirmarSenha) {
        exibirTooltip(tooltip);
        return false;
    } else {
        ocultarTooltip(tooltip);
        return true;
    }
}

function validarRG(inputRG) {
    const rg = inputRG.value.trim();
    const tooltip = "tooltip-rg";

    if (rg === "") {
        exibirTooltip(tooltip);
        return false;
    } else {
        ocultarTooltip(tooltip);
        return true;
    }
}

function validarCPF(inputCPF) {
    const cpf = inputCPF.value.trim();
    const tooltip = "tooltip-cpf";
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

    if (!cpfRegex.test(cpf)) {
        exibirTooltip(tooltip);
        return false;
    } else {
        ocultarTooltip(tooltip);
        return true;
    }
}

function validarFormulario() {
    var resultadoNome = validarNome(document.getElementById("input_nome"));
    var resultadoSobrenome = validarSobrenome(document.getElementById("input_sobrenome"));
    var resultadoEmail = validarEmail(document.getElementById("input_email"));
    var resultadoSenha = validarSenha(document.getElementById("input_senha"));
    var resultadoConfirmarSenha = validarConfirmacaoSenha(document.getElementById("input_confirmar_senha"));
    var resultadoRGNomeFantasia = validarRG(document.getElementById("input_rg_nome_fantasia"));
    var resultadoCpfCnpj = validarCPF(document.getElementById("input_cpf_cnpj"));

    if (resultadoNome && resultadoSobrenome && resultadoSenha && resultadoConfirmarSenha && resultadoRGNomeFantasia && resultadoRGNomeFantasia) {
        return true;
    } else {
        return false;
    }
}
function validarPlano() {
    const planoSelecionados = document.querySelectorAll("input[name='plano']:checked")
    const tooltip = "tooltip-planos";

    if (planoSelecionados.length === 1) {
        exibirTooltip(tooltip);
        return false;
    } else {
        ocultarTooltip(tooltip);
        return true;
    }
}
function validarNumeroCartao(inputNumeroCartao) {
    const numeroCartao = inputNumeroCartao.value.trim();
    const numCartaoRegex = /^\d{16}$/;
    const tooltip = "tooltip-numero-cartao";

    if (!numCartaoRegex.test(numeroCartao)) {
        exibirTooltip(tooltip);
        return false;
    } else {
        ocultarTooltip(tooltip);
        return true;
    }
}
function validarNomeCartao(inputNomeCartao) {
    const nomeCartao = inputNomeCartao.value.trim();
    const tooltip = "tooltip-nome-cartao";

    if (nomeCartao === "") {
        exibirTooltip(tooltip);
        return false;
    } else {
        ocultarTooltip(tooltip);
        return true;
    }
}
function validarValidade(inputValidade){
    const validade = inputValidade.value.trim();
    const tooltip = "tooltip-validade";
    const validadeRegex =  /^\d{2}\/\d{2}$/;

    if (!validadeRegex.test(validade)){
        exibirTooltip(tooltip);
        return false;
    } else {
        ocultarTooltip(tooltip);
        return true;
    }

}
function validarCodSeguranca(inputCodSeguranca){
    const codSeguranca = inputCodSeguranca.value.trim();
    const tooltip = "tooltip-codigo-seguranca";
    const codSegurancaRegex = /^\d{3}$/;

    if(!codSegurancaRegex.test(codSeguranca)){
        exibirTooltip(tooltip);
        return false;
    } else {
        ocultarTooltip(tooltip);
        return true;
    }
}

function validarPagamento() {
    var resultadoPlano = validarPlano();
    var resultadoNomeCartao = validarNomeCartao(document.getElementById("input_nome_cartao"));
    var resultadoNumeroCartao = validarNumeroCartao(document.getElementById("input_num_cartao"));
    var resultadoValidade = validarValidade(document.getElementById("input_validade"));
    var resultadoCodSeguranca = validarCodSeguranca(document.getElementById("input_codigo_seguranca"));

    if (resultadoPlano && resultadoNomeCartao && resultadoNumeroCartao && resultadoValidade && resultadoCodSeguranca) {
        return true;
    } else {
        return false;
    }

}
