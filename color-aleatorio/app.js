const colores = {
    primarios: ['#FF0000', '#00FF00', '#0000FF'],
    secundarios: ['#FFA500', '#800080', '#008080'],
    calidos: ['#FF4500', '#FF6347', '#FF69B4', '#FF8C00', '#FFD700', '#FF5733'],
    frios: ['#00BFFF', '#87CEFA', '#1E90FF', '#4682B4', '#ADD8E6', '#87CEEB']
  };
  
  const botones = document.querySelectorAll('.btn-color');
  const colorTexto = document.getElementById('color');
  
  function cambiarColor(colorHex) {
    document.body.style.backgroundColor = colorHex;
    colorTexto.style.color = colorHex;
    colorTexto.textContent = colorHex;
  }
  
  botones.forEach(boton => {
    boton.addEventListener('click', function() {
      const categoria = boton.getAttribute('data-categoria');
      if (categoria !== 'aleatorio') {
        const colorAleatorio = colores[categoria][Math.floor(Math.random() * colores[categoria].length)];
        cambiarColor(colorAleatorio);
      }
    });
  });
  
  const botonAleatorio = document.getElementById('btn-aleatorio');
  
  botonAleatorio.addEventListener('click', function() {
    const colorAleatorio = generarColorHexAleatorio();
    cambiarColor(colorAleatorio);
  });
  
  function generarColorHexAleatorio() {
    let digitos = '0123456789ABCDEF'; // 16 opciones.
    let color = '#'; // El color inicia con #.
  
    for (let i = 0; i < 6; i++) {
      // Escoger uno de los 16 digitos posibles.
      let indiceAleatorio = Math.floor(Math.random() * 16);
      // Agregarlo al codigo del color.
      color += digitos[indiceAleatorio];
    }
    
    return color;
  }
  
  






