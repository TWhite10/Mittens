import axios from "axios";
import { promises } from "dns";
const API_KEY =
  "live_OBDjG8qEZoYQmlIbzIr1QlQKJwcKigRRd4QneSkNdhpO9Nf4haxFN0AIBsnWh1Gf";
axios.defaults.headers.common["x-api-key"] = API_KEY;

const catImg = document.getElementById("catImg");
const energyLevel = document.getElementById("energyLevel");
const breedDiscovery = document.getElementById("breedDiscovery");
const infoDump = document.getElementById("infoDump")

//press butten to get a random cat suggession
export async function getRandomCatImg() {
  try {
    const img = document.getElementById("catImg")
    img.addEventListener("error", function (event) {
      event.target.src = "catSBA/assets/all-you-need-is-cat.jpg"
      event.onerror = null
    })
    const response = await axios.get(
      "https://api.thecatapi.com/v1/images/search"
    );

    return response.data[0].url;
  } catch (error) {
    console.error(`Error getting image :`, error);
    throw error;
  }
}
//first select all breeds
//filter breeds into three parts

//fetch data
let breedsData = null;

async function catFinder() {
  try {
    const response = await axios.get("https://api.thecatapi.com/v1/breeds");
    breedsData = response.data;

    updateBreedDropdown(breedsData);

    const breedDiscovery = document.getElementById(`breedDiscovery`);
    breedDiscovery.addEventListener("change", breedSelectionDropdown);

    // const findbtn = document.getElementById(`findBtn`);
    // findbtn.addEventListener(`click`,getEnergyLevel);


  } catch (error) {
    console.log(`Error:`, error)
    document.getElementById(`infoDump`).innerHTML = "Error loading cats"
  }

}
//update the dropdown when an energy level is selected

function updateBreedDropdown(breeds) {
  const breedDiscovery = document.getElementById(`breedDiscovery`);
  //clear options
  breedDiscovery.innerHTML = "";
  //add the new set of options based on energy level

  breeds.forEach((breed) => {
    const option = document.createElement(`option`);
    option.value = breed.id;
    option.textContent = breed.name;
    breedDiscovery.appendChild(option);
  });

}
//
function breedSelectionDropdown(event) {
  const selectedBreedId = event.target.value;
  const infoDump = document.getElementById("infoDump");


  infoDump.innerHTML = "";
  const selectedBreed = breedsData.find(
    (breed) => breed.id === selectedBreedId
  );


  if (selectedBreed) {
    infoDump.innerHTML = `
                    <h3>${selectedBreed.name}</h3>
                    <p>${selectedBreed.description}</p>
                    <p><strong>Energy Level:</strong> ${selectedBreed.energy_level}</p>
                    <p><strong>Temperament:</strong> ${selectedBreed.temperament}</p>
                    <p><strong>Origin:</strong> ${selectedBreed.origin}</p>
                    <p><strong>Weight:</strong> ${selectedBreed.weight} kg</p>
                    <p><strong>Life Span:</strong> ${selectedBreed.life_span} years</p>
                `;
                
  }
  
 
const catEnergyImg = document.getElementById("catEnergyImg");
  fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreedId}`
  )
 



}


export async function getEnergyLevel() {
  //get the selected energy level
  try {
    const selectedRadio = document.querySelector(
      'input[name="energyL"]:checked'
    );
    if (!selectedRadio) {
      document.getElementById(`output`).innerHTML = `Please select an energy level.`;
      return;
    }
    const selectedValue = selectedRadio.value.toLowerCase();

    if (!breedsData) {
      const response = await axios.get("https://api.thecatapi.com/v1/breeds");
      breedsData = response.data
    }


    const catMatches = breedsData.filter((breed) => {
      //filter data by energy level 
      const energyLevel = breed.energy_level;

      switch (selectedValue) {
        case 'low':
          return energyLevel <= 2;
        case 'medium':
          return energyLevel === 3;
        case 'high':
          return energyLevel >= 4;
        default:
          return false;
      }

    });

    const output = document.getElementById("output");
    const infoDump = document.getElementById("infoDump");

    if (catMatches.length === 0) {
      output.innerHTML = `No cat matches found for this level`;
      updateBreedDropdown([]);
      infoDump.innerHTML = "";
      return;
    }

    updateBreedDropdown(catMatches);
    output.innerHTML = `You have: ${catMatches.length} Matches`;

    infoDump.innerHTML = `
            <h3>Matching Breeds:</h3>
            ${catMatches.map(breed => `
                <div style="margin-bottom: 20px; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                    <h4>${breed.name}</h4>
                    <p><strong>Energy Level:</strong> ${breed.energy_level}/5</p>
                    <p>${breed.description}</p>
                </div>
            `).join('')}
        `;
       


  } catch (error) {
    console.error("Error", error);
    document.getElementById("output").innerHTML = "Error finding matching cats";
  }



};

//reset dropdown
function resetBreedDropdown() {
  if (breedsData) {
    updateBreedDropdown(breedsData);
    document.getElementById("output").innerHTML = "";
    document.getElementById("infoDump").innerHTML = "";
  }
}


document.addEventListener('DOMContentLoaded', () => {
  catFinder();

  const findButton = document.getElementById(`findBtn`)
  if (findButton) {
    findButton.addEventListener(`click`, getEnergyLevel)
  }

  const resetBtn = document.getElementById('resetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetBreedDropdown);
  }



});



