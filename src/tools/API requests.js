import axios from "axios";

export function organizeData(data) {
  let dataArray = [];
  let filmsArray = [];
  let homeworld = [];
  let vehiclesArray;
  let character;

  for (let hero in data) {
    character = {};
    vehiclesArray = [];
    character.name = data[hero].name;
    character.height = data[hero].height;
    character.mass = data[hero].mass;
    character.hair_color = data[hero].hair_color;
    character.skin_color = data[hero].skin_color;
    character.eye_color = data[hero].eye_color;
    character.birth_year = data[hero].birth_year;
    character.gender = data[hero].gender;
    axios(data[hero].homeworld.replace('http', 'https'))
      .then(response => {
        homeworld.push(response.data.name);
      });
    character.homeworld = homeworld;

    if (data[hero].vehicles.length) {
      for (let item in data[hero].vehicles) {
        let vehicle = {};
        axios(data[hero].vehicles[item].replace('http', 'https'))
          .then(response => {
            vehicle.name = response.data.name;
            vehicle.model = response.data.model;
          });
        vehiclesArray.push(vehicle);
      }
      character.vehicles = vehiclesArray;
    } else {
      character.vehicles = 'None';
    }
    for (let film in data[hero].films) {
      axios(data[hero].films[film].replace('http', 'https'))
        .then(response => {
          filmsArray.push(response.data.title);
        })
        .catch((reject) => {
          console.error(reject);
        });
    }
    character.films = filmsArray;

    dataArray.push(character);
  }
  return dataArray;
}