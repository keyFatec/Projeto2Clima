/* Declarando as variáveis */
const container = document.querySelector('.container');
const busca = document.querySelector('.busca-box button');
const climaBox = document .querySelector('.clima-box');
const climaDetalhes = document.querySelector('.clima-detalhes');
const erro404 = document.querySelector('.nao-loc');
const cidadeMostra = document.querySelector('.cidade-mostra');

/* Evento de colheta das informações */
busca.addEventListener('click', () => {

    /* Declarando a variável da chave API*/
    const APIKey = '2b6a85039e655c2a3e7402df80021c80';
    /* Recebendo a variável da cidade*/
    const cidadeSt = document.querySelector('.busca-box input').value;
    /* Removendo possíveis espaços desnecessários que impediriam a API de funcionar corretamente*/
    const cidade = cidadeSt.trim();

    if (cidade == '')
        return;

    /* Consumindo API */
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {

        /* Se localidade não existir */
        if (json.cod == '404'){
            cidadeMostra.textContent = cidade;
            container.style.height = '400px';
            climaBox.classList.remove('active');
            climaDetalhes.classList.remove('active');
            erro404.classList.add('active');
            return;
        }

   /* Declarando as variáveis do clima */     
    const image = document.querySelector('.clima-box img');
    const temperatura = document.querySelector('.clima-box .temperatura');
    const descricao = document.querySelector('.clima-box .descricao');
    const vento = document.querySelector('.clima-detalhes .vento span');
    const umidade = document.querySelector('.clima-detalhes .umidade span'); 
    
    /* Se a variável está correta */
    if (cidadeMostra.textContent == cidade) {
        return;
    } else {
        cidadeMostra.textContent = cidade;

        container.style.height = '555px';
        container.classList.add('active');
        climaBox.classList.add('active');
        climaDetalhes.classList.add('active');
        erro404.classList.remove('active');
        
        /* Listando as opções de cada tipo de estado do clima */
        switch (json.weather[0].main) {
            case 'Clear':
            image.src = 'img/clear.png';
            descricao.innerHTML = `Céu Limpo`;
            break;

            case 'Rain':
            image.src = 'img/rain.png';
            descricao.innerHTML = `Chovendo`;
            break;        

            case 'Snow':
            image.src = 'img/snow.png';
            descricao.innerHTML = `Nevando`;
            break;    

            case 'Clouds':
            image.src = 'img/cloud.png';
            descricao.innerHTML = `Céu Nublado`;
            break;

            case 'Mist':
            image.src = 'img/mist.png';
            descricao.innerHTML = `Céu com neblina`;
            break;

            case 'Haze':
            image.src = 'img/mist.png';
            descricao.innerHTML = `Céu com neblina`;
            break;
            
            default:
            image.src = 'img/cloud.png';
            descricao.innerHTML = `Céu Nublado`;
        }

        /* Declarando e devolvendo as informações de temperatura/umidade/vento */
        temperatura.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        umidade.innerHTML = `${json.main.humidity}%`;
        vento.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

     }

    });
        
});