let DatiJson;
let carDetailsWindow = null;

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

  const allBrands = data.map(car => car.marca);
  const uniqueBrands = [...new Set(allBrands)].sort();
  const newCars = uniqueBrands.filter((_, index) => index % 2 === 0);
  const oldCars = uniqueBrands.filter((_, index) => index % 2 !== 0);

  Dropdown('newCarsDropdown', newCars);
  Dropdown('oldCarsDropdown', oldCars);

  createGrid(data);
}

function Dropdown(dropdownId, options) {
  const dropdown = document.getElementById(dropdownId);
  const dropdownContent = dropdown.querySelector('.dropdown-content');

  options.forEach(option => {
    const optionElement = document.createElement('a');
    optionElement.href = '#';
    optionElement.textContent = option;
    dropdownContent.appendChild(optionElement);

    optionElement.addEventListener('click', function(event) {
      event.preventDefault();

      const selectedBrand = option;
      redirectToCarDetails(selectedBrand);
    });
  });
}

function redirectToCarDetails(brand) {
  const filteredCars = DatiJson.filter(car => car.marca === brand);

  const car = filteredCars[0];
  const pageTitle = `${car.marca}`;

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
                  height: 100vh;
                  background-color: #f0f0f0;
              }
              
              #logo {
                  margin-top: 10px;
                  max-width: 5%;
              }
              
              #linea {
                  width: 80%;
                  height: 1px;
                  background-color: #888;
              }

              .grande {
                  font-size: 2.5em;
                  text-decoration: underline;
              }
            </style>
        </head>
        <script> 

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

          function redirectToHome() {
              window.close();
              window.location.href = 'index.html';
          }

          function createGrid(data) {
  const gridContainer = document.getElementById("gridContainer");

  const fotoFolder = 'Foto/';

  let imageIndex = 0;

  const columns = 3;
  const rows = 1;

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

        if (car.marca === pageTitle) {
          const carText = document.createElement("div");
          carText.classList.add("car-text");

          carText.style.height = '20px';

          carText.textContent = ${car.marca} ${car.modello};

          square.appendChild(carText);

          const image = document.createElement("img");
          const imageNumber = (imageIndex % 21) + 1;
          image.src = Foto/${car.id}.png;
          image.alt = ${car.marca} ${car.modello};
          imageIndex = (imageIndex + 1) % 21;
          console.log(carText);
          square.appendChild(image);

          square.addEventListener("click", function (event) {
            showCarDetails(event);
          });
        } else {
          square.textContent = '';
        }
      }

      rowElement.appendChild(square);
    }

    gridContainer.appendChild(rowElement);
  }
}
        </script>
        <body>
            <center>
                <div margin-top: 10px;">
                    <img id="logo" src="Foto/logo.png" alt="Logo" onclick="redirectToHome()">
                    <div id="linea"></div>
                    <h1 class="grande">AutoHouse Concessionaria</h1>
                    <h1>${car.marca}</h1>
                </div>
            </center>
            <main class="container" id="gridContainer"></main>
        </body>
        </html>
    `;

  const newWindow = window.open("");
  newWindow.document.write(pageContent);
}

document.addEventListener("DOMContentLoaded", function() {
  fetchData();
});
