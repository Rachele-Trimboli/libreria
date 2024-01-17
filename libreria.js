const row1 = document.getElementsByClassName("row")[0];
const arrayCarrello = [];

const library = function () {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((res) => {
      if (res.ok) {
        console.log(res);
        return res.json();
      } else {
        console.log("non è andata bene");
        throw new Error();
      }
    })
    .then((data) => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        const title = data[i].title;
        const img = data[i].img;
        const price = data[i].price;
        const newDiv = document.createElement("div");
        newDiv.classList.add("col-12");
        newDiv.classList.add("col-md-4");
        newDiv.classList.add("col-lg-3");
        // const card = document.createElement("div");
        // card.classList.add("card");
        newDiv.innerHTML = `
        <div class="card" style="height: 100%" >
  <img src="${img}" class="card-img-top" alt="foto">
  <div class="card-body d-flex flex-column justify-content-between">
    <h5 class="card-title fst-italic">${title}</h5>
    <p class="card-text fw-semibold text-decoration-underline">${price} euro </p>
    <div>
    <span class="btn btn-danger">Scarta</span>
    <span class="btn btn-success">Compra ora</span>
  </div>
    </div>
</div>`;
        row1.appendChild(newDiv);
        // funzionalità bottoni card
        const button = document.getElementsByClassName("btn-danger");
        button[i].addEventListener("click", function () {
          newDiv.classList.add("visually-hidden");
        });
        const buyButton = document.getElementsByClassName("btn-success");
        buyButton[i].addEventListener("click", function () {
          arrayCarrello.push(data[i].title);
          console.log(arrayCarrello);
          const liCarrello = document.getElementById("carrello");
          liCarrello.innerHTML = "";
          for (let k = 0; k < arrayCarrello.length; k++) {
            const liElement = document.createElement("li");
            liElement.classList.add("border");
            liElement.classList.add("p-4");
            liElement.innerHTML = `<span>${arrayCarrello[k]}</span>
            <button type="button" class="btn btn-danger mt-2" id="cancel"
                    style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
              Elimina
            </button>`;

            liCarrello.appendChild(liElement);
            // const cancelButton = document.getElementById("cancel");
            // cancelButton.addEventListener("click", function () {
            //   arrayCarrello.splice(k, 1);
            // });
          }
        });
      }
    })
    .catch((err) => {
      console.log("la fetch non è andata come volevi");
    });
};

library();
