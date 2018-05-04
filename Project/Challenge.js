// top 5

// quando a página carregar executar essa função
window.onload = function() {

    // denominando uma nova requisição http
    var xhttp = new XMLHttpRequest();

    // Pegando o arquivo json
    xhttp.open('GET', '../Assets/urls.json', true);

    xhttp.onreadystatechange = function() {

        // Se os dados estiverem preparados e o server também executar...
        if (this.readyState == 4 && this.status == 200) {

            // transformando o arquivo json num array
            var lista = JSON.parse(xhttp.response);

            // organizando a lista em ordem ascendente
            lista = lista.sort(function(a, b) {
              return parseFloat(b.hits) - parseFloat(a.hits);
            });

            // cortando os primeiros elementos da lista
            var sliced = lista.slice(0, 5);
            console.log(lista);
            console.log(lista[0]);
            console.log(lista[0].hits);



            // colocando no contexto para a apresentação com handlebars
            var context = {top_5: sliced };

            // versão já compilada do html para os handlebars
            var template = Handlebars.templates['links'];

            // Metendo no template nas informações
            var templateData = template(context);
            console.log(context);

            // colocando as infos na div do handlebars
            document.getElementById('contentDiv').innerHTML += templateData;
            // fillRanking(lista);
            // totalHits(lista);
        }
    };

    // mandando pro server
    xhttp.send();
};



// input transitions

// botão encurtar
buttonSubmit.addEventListener('click', function(){

  if (textInput.value !== ''){
    buttonSubmit.classList.add('fade');
    textInput.classList.add('fade');

    if(buttonSubmit.value === 'COPIAR'){
      copiaIsso();
    }

    setTimeout(function(){
      textInput.value = 'bunito hein';
      buttonSubmit.value = 'COPIAR';

      textInput.classList.add('white');
      textInput.classList.remove('fade');
      buttonSubmit.classList.remove('fade');
      buttonReset.classList.remove('hidden', 'resetA');
    }, 300);
  }


});

// botão reset
buttonReset.addEventListener('click', function(){
  textInput.classList.remove('white');
  buttonReset.classList.add('hidden', 'resetA');
  textInput.value = '';
  buttonSubmit.value = 'ENCURTAR';
  textInput.focus();
});







function copiaIsso() {
  var copia = document.querySelector('#textInput');
  copia.focus();
  copia.select();
  document.execCommand('copy');
}
