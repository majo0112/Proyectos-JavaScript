// Seleccionar los botones.

const botonInicioPausa = document.querySelector('#boton-inicio-pausa');
const botonReiniciar = document.querySelector('#boton-reiniciar');

// Variables para almacenar los segundos, minutos y horas.
let [segundos, minutos, horas] = [0, 0, 0];

// Variables para almacenar el intervalo de tiempo que debe
// transcurrir para actualizar el cronometro y el estado 
// del cronometro.
let intervaloDeTiempo;
let estadoCronometro = 'pausado'; // Dos estados posibles: 'pausado' o 'andando'.

// Variable para almacenar el tiempo del último inicio de vuelta.
let ultimoInicioVuelta = null; 

//Variables para reiniciar cronometro.
let numeroVuelta = 1; 
const tiemposDeVuelta = [];

// Actualizar el cronometro.
function actualizarCronometro() {
  segundos++;

  if (segundos / 60 === 1) {
    segundos = 0;
    minutos++;

    if (minutos / 60 === 1) {
      minutos = 0;
      horas++;
    }
  }

  // Agregar un cero a la izquierda si es necesario.
  const segundosConFormato = asignarFormato(segundos);
  const minutosConFormato = asignarFormato(minutos);
  const horasConFormato = asignarFormato(horas);

  // Actualizar el contenido del cronometro.
  const cronometro = document.getElementById('cronometro');
  cronometro.innerText = `${horasConFormato}:${minutosConFormato}:${segundosConFormato}`;
}

// Agregar un cero a la izquierda si se necesita.
function asignarFormato(unidadDeTiempo) {
  return unidadDeTiempo < 10 ? '0' + unidadDeTiempo : unidadDeTiempo;
}

function duracionVuelta() {
  const tiempoActual = document.getElementById('cronometro').textContent;
  
  if (numeroVuelta === 1) {
    // Si es la primera vuelta, se registra el tiempo actual como último inicio de vuelta.
    ultimoInicioVuelta = tiempoActual;
    return tiempoActual;
  } else {
    // Si no es la primera vuelta, se resta el tiempo actual menos el último inicio de vuelta.
    const duracion = restaTiempos(tiempoActual, ultimoInicioVuelta);
    
    // Se actualiza el último inicio de vuelta con el tiempo actual.
    ultimoInicioVuelta = tiempoActual;

    // Se agrega la duración actual a tiemposDeVuelta.
    tiemposDeVuelta.push(duracion);

    return duracion;
  }
}

//Tiempo total es equivalente al tiempo actual. 
function calcularTiempoTotal() {
  const tiempoActual = document.getElementById('cronometro').textContent;
  tiemposDeVuelta.push(tiempoActual);
  return tiempoActual;
}

function restaTiempos(tiempo1, tiempo2) {
  const tiempo1Array = tiempo1.split(':');
  const tiempo2Array = tiempo2.split(':');

  const horas1 = parseInt(tiempo1Array[0]);
  const minutos1 = parseInt(tiempo1Array[1]);
  const segundos1 = parseInt(tiempo1Array[2]);

  const horas2 = parseInt(tiempo2Array[0]);
  const minutos2 = parseInt(tiempo2Array[1]);
  const segundos2 = parseInt(tiempo2Array[2]);

  let segundos = segundos1 - segundos2;
  let minutos = minutos1 - minutos2;
  let horas = horas1 - horas2;

  if (segundos < 0) {
    segundos += 60;
    minutos--;
  }
  if (minutos < 0) {
    minutos += 60;
    horas--;
  }

  return `${asignarFormato(horas)}:${asignarFormato(minutos)}:${asignarFormato(segundos)}`;
}


botonInicioPausa.addEventListener('click', function() {
  if (estadoCronometro === 'pausado') {
    // LLamar a la funcion cronometro cada 1000 milisegundos.
    intervaloDeTiempo = window.setInterval(actualizarCronometro, 1000);
    // Si el cronometro esta pausado, se muestra la flecha >
    // y se debe cambiar a || porque va a iniciar.
    document.getElementById('boton-inicio-pausa').innerHTML = `Detener`;
    document.getElementById('boton-reiniciar').innerHTML = `Vuelta`;
    botonInicioPausa.classList.remove('iniciar');
    botonReiniciar.classList.remove('reiniciar');
    botonInicioPausa.classList.add('pausar');
    botonReiniciar.classList.add('vuelta');
    // Actualizar el estado del cronometro.
    estadoCronometro = 'andando';
  } else {
    // Detener el cronometro al eliminar el intervalo de tiempo 
    // usado para llamar a la funcion actualizarCronometro().
    window.clearInterval(intervaloDeTiempo);
    // Actualizar los botones y el estado del cronometro.
    document.getElementById('boton-inicio-pausa').innerHTML = `Iniciar`;
    document.getElementById('boton-reiniciar').innerHTML = `Reiniciar`;
    botonInicioPausa.classList.remove('pausar');
    botonReiniciar.classList.remove('vuelta');
    botonInicioPausa.classList.add('iniciar');
    botonReiniciar.classList.add('reiniciar');
    estadoCronometro = 'pausado';
  }
});

botonReiniciar.addEventListener('click', function() {
   if (estadoCronometro === 'andando') {
  
      // Actualiza la tabla de vueltas.
      const tablaVueltas = document.getElementById('vueltas-guardadas').getElementsByTagName('tbody')[0];
      const nuevaFila = tablaVueltas.insertRow();

      const numeroVueltaCell = nuevaFila.insertCell(0);
      numeroVueltaCell.textContent = numeroVuelta;

      const tiempoVueltaCell = nuevaFila.insertCell(1);
      tiempoVueltaCell.textContent = duracionVuelta();; 

      const tiempoTotalCell = nuevaFila.insertCell(2);
      tiempoTotalCell.textContent = calcularTiempoTotal();

      numeroVuelta++;

   } else {
      
   // Detiene el cronómetro al eliminar el intervalo de tiempo.
   window.clearInterval(intervaloDeTiempo);

   // Reinicia los segundos, minutos y horas.
   segundos = 0;
   minutos = 0;
   horas = 0;
   document.getElementById('cronometro').innerHTML = '00:00:00';

   // Actualiza los botones y el estado del cronómetro.
   document.getElementById('boton-inicio-pausa').innerHTML = `Iniciar`;
   botonInicioPausa.classList.remove('pausar');
   botonInicioPausa.classList.add('iniciar');
   estadoCronometro = 'pausado';

   //Elimina vueltas guardadas y reinicia numero de vueltas.
   tiemposDeVuelta.length = 0;
   numeroVuelta = 1;
   const tablaVueltas = document.getElementById('vueltas-guardadas').getElementsByTagName('tbody')[0];
   tablaVueltas.innerHTML = '';
  }

});




