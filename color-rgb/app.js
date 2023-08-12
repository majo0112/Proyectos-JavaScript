const inputRojo = document.getElementById('rojo');
const inputVerde = document.getElementById('verde');
const inputAzul = document.getElementById('azul');
const nombreColorInput = document.getElementById('nombre-color');
const guardarColorBtn = document.getElementById('guardar-color');
const colorGenerado = document.getElementById('color-generado');

const textoRojo = document.getElementById('texto-rojo');
const textoVerde = document.getElementById('texto-verde');
const textoAzul = document.getElementById('texto-azul');


let rojo = inputRojo.value;
let verde = inputVerde.value;
let azul = inputAzul.value;

textoRojo.textContent = inputRojo.value;
textoVerde.textContent = inputVerde.value;
textoAzul.textContent = inputAzul.value;


  function actualizarColor(rojo, verde, azul) {
    const colorRGB = `rgb(${rojo}, ${verde}, ${azul})`;
    colorGenerado.style.backgroundColor = colorRGB;
  }
  

  function actualizarTabla(rojo, verde, azul, nombreColor) {
    const colorRGB = `rgb(${rojo}, ${verde}, ${azul})`;
    

    const coloresGuardados = document.getElementById('colores-guardados').getElementsByTagName('tbody')[0];
    const nuevaFila = coloresGuardados.insertRow();

    const colorCell = nuevaFila.insertCell(0);
    colorCell.innerHTML = `<div class="color-circle" style="background-color: ${colorRGB};"></div>`;

    const nombreCell = nuevaFila.insertCell(1);
    nombreCell.textContent = nombreColor;

    const rgbCell = nuevaFila.insertCell(2);
    rgbCell.textContent = colorRGB;
  }


// Actualizar rojo
inputRojo.addEventListener('change', (e) => {
    rojo = e.target.value;
    textoRojo.textContent = rojo;
    actualizarColor(rojo, verde, azul);
  });
  
  // Actualizar verde 
  inputVerde.addEventListener('change', (e) => {
    verde = e.target.value;
    textoVerde.textContent = verde;
    actualizarColor(rojo, verde, azul);
  });
  
  // Actualizar azul
  inputAzul.addEventListener('change', (e) => {
    azul = e.target.value;
    textoAzul.textContent = azul;
    actualizarColor(rojo, verde, azul);
  });


  // Guardar color 
guardarColorBtn.addEventListener('click', () => {
    const rojo = inputRojo.value;
    const verde = inputVerde.value;
    const azul = inputAzul.value;
    const nombreColor = nombreColorInput.value;

    if (nombreColor) {
      actualizarTabla(rojo, verde, azul, nombreColor);
    }
  });

