const pokeImage = document.querySelector(".pokemon-img");
const pokeId = document.querySelector(".pokemom-number");
const pokeName = document.querySelector(".pokemon-name");
const form = document.querySelector(".form");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");
const input = document.querySelector(".input");
let searchPoke = 1;

const fetchUrl = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const render = async (pokemom) => {
  pokeName.innerHTML = "Loading ...";
  pokeId.innerHTML = "";
  const data = await fetchUrl(pokemom);
  if (data) {
    pokeImage.style.display = "block";
    pokeName.innerHTML = data.name;
    pokeId.innerHTML = data.id;
    pokeImage.src = data["sprites"]["front_default"];
    searchPoke = data.id;
  } else {
    pokeImage.style.display = "none";
    pokeName.innerHTML = "Not Found!";
    pokeId.innerHTML = "";
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  render(input.value.toLowerCase());
  input.value = "";
});

btnPrev.addEventListener("click", () => {
  if (searchPoke > 1) {
    searchPoke--;
    render(searchPoke);
  }
});
btnNext.addEventListener("click", () => {
  searchPoke++;
  render(searchPoke);
});

render(searchPoke);
