let DatiJson;

async function fetchData() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/SebaMazzotta/JsonFile/main/GTcars.json');
    DatiJson = await response.json();
    processCarData(DatiJson);
  } catch (error) {
    console.error('Errore nel recupero dei dati:', error);
  }
}

function processCarData(data) {
  if (!data || data.length === 0) {
    console.error('Nessun dato disponibile.');
    return;
  }

  createGrid(data);
}


function createGrid(data) {
  const gridContainer = document.getElementById("gridContainer");

  const fotoFolder = 'Foto/';

  let imageIndex = 0;

  const columns = 3;
  const rows = 7;

  for (let row = 1; row <= rows; row++) {
    const rowElement = document.createElement("div");
    rowElement.classList.add("row");

    for (let col = 1; col <= columns; col++) {
      const square = document.createElement("div");
      square.classList.add("box");

      square.style.display = 'flex';
      square.style.flexDirection = 'column';

      const carIndex = (row - 1) * columns + col - 1;

      if (carIndex < data.length) {
        const car = data[carIndex];

        const carText = document.createElement("div");
        carText.classList.add("car-text");

        carText.style.height = '20px';

        carText.textContent = `${car.marca} ${car.modello}`;

        square.appendChild(carText);

        const image = document.createElement("img");
        const imageNumber = (imageIndex % 21) + 1;
        image.src = fotoFolder + `${imageNumber}.png`;
        image.alt = `${imageNumber}`;
        imageIndex = (imageIndex + 1) % 21;
        console.log(carText);
        square.appendChild(image);

        square.addEventListener("click", function(event) {
          showCarDetails(event);
        });
      } else {
        square.textContent = '';
      }

      rowElement.appendChild(square);
    }

    gridContainer.appendChild(rowElement);
  }
}

function showCarDetails(event) {
  const clickedElement = event.currentTarget;
  const rowElement = clickedElement.parentNode;

  const colIndex = Array.from(rowElement.children).indexOf(clickedElement) + 1;
  const rowIndex = Array.from(gridContainer.children).indexOf(rowElement) + 1;

  const carIndex = (rowIndex - 1) * 3 + colIndex - 1;

  const car = DatiJson[carIndex];

  const pageTitle = `${car.marca} ${car.modello}`;
  const imageId = car.id;
  const pageContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageTitle}</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            justify-content: center;
            align-items: center;
        }

        center {
            text-align: center;
        }

        #logo {
            max-width: 150px;
            cursor: pointer;
        }

        #linea {
            width: 80%;
            height: 1px;
            background-color: #888;
            margin: 10px auto;
        }

        h1 {
            font-size: 2.5em;
            text-decoration: underline;
            margin-bottom: 20px;
        }

        .car-image-container {
            text-align: center;
            margin-top: 20px;
        }

        .car-image {
            max-width: 100%;
            height: auto;
            object-fit: contain;
            border: 1px solid #ccc;
        }

        table {
            border-collapse: collapse;
            width: 80%;
            margin-top: 20px;
            
        }

         td {
            padding: 8px 20px; /* Modifica questo valore per regolare lo spazio */
            text-align: center;
            border: none;
        }

        ul {
            list-style: none;
            padding: 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }

        li {
            width: calc(33.33% - 20px);
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid #ccc;
        }

        li:nth-child(3n) {
            margin-right: 0;
        }

        li:nth-child(5),
        li:nth-child(n + 6) {
            width: calc(50% - 20px);
        }

        /* Media Query per schermi più piccoli */
        @media (max-width: 768px) {
            li {
                width: calc(50% - 20px);
            }
        }

        /* Media Query per schermi ancora più piccoli */
        @media (max-width: 480px) {
            li {
                width: 100%;
            }
        }
    </style>
    <script>
        function redirectToHome() {
            window.close();
            window.location.href = 'index.html';
        }
    </script>
</head>
<body>
    <div style="text-align: center; margin-top: 10px;">
        <img id="logo" src="Foto/logo.png" alt="Logo" onclick="redirectToHome()">
        <div id="linea"></div>
        <h1 class="grande">AutoHouse Concessionaria</h1>
    </div>

    <div class="car-image-container">
        <div class="ellipse"></div>
        <img class="car-image" src="Foto/${imageId}.png" alt="${pageTitle}">
    </div>
    <div><strong> Marca:</strong> ${car.marca}</div>
    <div><strong> Modello:</strong> ${car.modello}</div>
    <div><strong> Anno: </strong> ${car.anno}</div>
    <div><strong> Colore: </strong> ${car.colore}</div>
    <div><strong> Prezzo:</strong> ${car.prezzo} €</div>
    <br>

    <h3>Caratteristiche:</h3>


    <table>
        <tr>
            <td><strong>Motore:</strong><br>${car.caratteristiche.motore}</td>
            <td><strong>Trasmissione:</strong><br>${car.caratteristiche.trasmissione}</td>
            <td><strong>Cambio:</strong><br>${car.caratteristiche.cambio}</td>
        </tr>
        <tr>
            <td><strong>Carburante:</strong><br>${car.caratteristiche.carburante}</td>
            <td><strong>Velocità Massima:</strong><br>${car.caratteristiche.velocita_massima}</td>
            <td><strong>0-100 km/h:</strong><br>${car.caratteristiche["0-100_km/h"]}</td>
        </tr>
        <tr>
            <td><strong>Lunghezza:</strong><br>${car.dimensioni.lunghezza}</td>
            <td><strong>Larghezza:</strong><br>${car.dimensioni.larghezza}</td>
            <td><strong>Altezza:</strong><br>${car.dimensioni.altezza}</td>
        </tr>
    </table>

    

    <script>
    </script>
</body>
</html>

`
    ;

  const newWindow = window.open("");
  newWindow.document.write(pageContent);
}

document.addEventListener("DOMContentLoaded", function() {
  fetchData();
});
