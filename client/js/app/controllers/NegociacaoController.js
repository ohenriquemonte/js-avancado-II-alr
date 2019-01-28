class NegociacaoController {
    
    constructor() {
        
        let $ = document.querySelector.bind(document);
        
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
         
        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(), 
            new NegociacoesView($('#negociacoesView')), 
            'adiciona', 'esvazia');
       
        this._mensagem = new Bind(
            new Mensagem(), new MensagemView($('#mensagemView')),
            'texto');       
    }
    
    adiciona(event) {
        
        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = 'Negociação adicionada com sucesso'; 
        this._limpaFormulario();   
    }

    importaNegociacoes() {
        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'negociacoes/semana');
        
        xhr.onreadystatechange = () => {
            /* 
            estados da requisição:
            1: conexao com o servidor estabelecida
            2: requisicao recebida
            3: processando requisicao
            4: requisicao concluida e com a resposta pronta 
            */
           if(xhr.readyState == 4) {
                if(xhr.status == 200) {
                    console.log('Obtendo as negociações do servidor.');
                } else {
                    console.log('Não foi possível obter as negociações do servidor!');
                }
           }
        };

        xhr.send();
    }
    
    apaga() {
        
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso';
    }
    
    _criaNegociacao() {
        
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value);    
    }
    
    _limpaFormulario() {
     
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();   
    }
}