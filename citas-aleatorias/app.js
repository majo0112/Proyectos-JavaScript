
let botonElem = document.getElementById('boton-cambiar-cita');
let citaElem = document.getElementById('cita');
let autorElem = document.getElementById('autor');
let perfilElem = document.getElementById('perfil-autor');
let botonCopiar = document.getElementById('boton-copiar');
let alertaElem = document.getElementById('alerta');
let botonCompartir = document.getElementById('boton-compartir');
let modal = document.getElementById('modal');


function generarEnteroAleatorio(minimo, maximo) {
  minimo = Math.ceil(minimo);
  maximo = Math.floor(maximo);
  
  return Math.floor(Math.random() * (maximo - minimo) + minimo);
}

function cambiarCita() {
  let indiceAleatorio = generarEnteroAleatorio(0, citas.length);
  citaElem.textContent = `"${citas[indiceAleatorio].texto}"`;
  autorElem.textContent = citas[indiceAleatorio].autor;
  perfilElem.src = citas[indiceAleatorio].imagen;
}


function compartirEnRedSocial(redSocial) {
  let textoCompartir = `"${citas[indiceAleatorio].texto}" - ${citas[indiceAleatorio].autor}`;
  let compartirURL = `https://example.com/compartir?texto=${encodeURIComponent(textoCompartir)}`;

  switch (redSocial) {
    case 'facebook':
      // Compartir en Facebook
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(compartirURL)}`, '_blank');
      break;
    case 'twitter':
      // Compartir en Twitter
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(compartirURL)}`, '_blank');
      break;
    case 'whatsapp':
      // Compartir en WhatsApp
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(textoCompartir)}`, '_blank');
      break;
  }
}

//Para copiar cita

let indiceAleatorio = generarEnteroAleatorio(0, citas.length);
cambiarCita();

botonElem.addEventListener('click', cambiarCita);

botonCopiar.addEventListener('click', () => {

  let tempTextarea = document.createElement('textarea');
  tempTextarea.value = citaElem.textContent;

  document.body.appendChild(tempTextarea);
  tempTextarea.select();
  document.execCommand('copy');

  document.body.removeChild(tempTextarea);

  alertaElem.classList.remove('hidden');
  
  setTimeout(() => {
    alertaElem.classList.add('hidden');
  }, 3000);
});

alertaElem.classList.add('hidden');

////////////////////////////////



botonCompartir.addEventListener('click', () => {
  modal.classList.remove('hidden'); 
});

document.getElementById('compartir-facebook').addEventListener('click', () => {
  compartirEnRedSocial('facebook');
  modal.classList.add('hidden'); 
});

document.getElementById('compartir-twitter').addEventListener('click', () => {
  compartirEnRedSocial('twitter');
  modal.classList.add('hidden'); 
});

document.getElementById('compartir-whatsapp').addEventListener('click', () => {
  compartirEnRedSocial('whatsapp');
  modal.classList.add('hidden'); 
});






