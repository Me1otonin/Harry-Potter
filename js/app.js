const input = document.querySelector("input");
const btns = document.querySelectorAll('.nav');
let data;

const fetchData = async () => {
  const response = await fetch("https://hp-api.herokuapp.com/api/characters");
  const json = await response.json();
  data = await json;
  loadCharacters(data);
};

fetchData();
// const foo = (data) => {
// }

const imgCheck = (img, gender) => {
  if (img == "") {
    switch (gender) {
      case "male":
        return "https://vmh.espcdesign.com/wp-content/uploads/2015/12/Female-Avatar.jpg";
      case "female":
        return "https://www.wcaeagles.org/wp-content/uploads/2016/07/male-placeholder.jpg";
      default:
        return "error";
    }
  } else {
    return img;
  }
};

const back = (house) => {
  switch (house) {
    case "Gryffindor":
      return "rgba(127,9,9,1)";
    case "Ravenclaw":
      return "rgba(0,10,144,1)";
    case "Slytherin":
      return "rgba(13,98,23,1)";
    case "Hufflepuff":
      return "rgba(238,225,23,0.8)";
    default:
      return "rgba(214,214,213,1)";
  }
};

const main = document.querySelector("main");

function loadCharacters(data) {
  // Берет все данные из локалки и ковертирует в массив
  console.log(data);
  main.innerHTML = "";
  let accounts = Array.from(data);
  accounts.forEach((account) => {
    const card = document.createElement("div");
    main.append(card);
    card.innerHTML = `<div class="card" style="background: ${back(
      account.house
    )};">
    <div class="card_block">
      <img src='${imgCheck(account.image, account.gender)}' alt="" />
      <div class="card_text">
        <paccount.species}</p>
        <p>Gender: ${account.gender}</p>
        <p>House: ${account.house}</p>
        <p>Ancestry: ${account.ancestry}</p>
        <p>Name: ${account.name}</p>
        <p>Year of Birth: ${account.yearOfBirth == null ? 'Unknown' : account.yearOfBirth}</p>
        <p>Actor: ${account.actor}</p>
      </div>
    </div>
  </div>`;
    // card.style.cssText = `background-color: ${back(account.house)};`;
  });
}

input.addEventListener("change", (e) => {
  main.innerHTML = "";
  const filteredData = data.filter((account) =>
    account.name
      .toLocaleLowerCase()
      .includes(e.target.value.toLocaleLowerCase())
  );
  filteredData.length === 0 ? main.innerHTML += "<p style='font-size: 20px; text-align: center; margin-top: 20px; color: #fff;'>Персонаж с таким именем не найден<p>" : loadCharacters(filteredData);
});

const filteringDataByFaculties = (data, house) => {
  const filteredData = data.filter((account) =>
    account.house
      .toLocaleLowerCase()
      .includes(house.toLocaleLowerCase())
  );
  loadCharacters(filteredData)
}

btns[0].addEventListener('click', () => { loadCharacters(data) })
btns[1].addEventListener('click', () => { filteringDataByFaculties(data, 'Gryffindor') })
btns[2].addEventListener('click', () => { filteringDataByFaculties(data, 'Slytherin') })
btns[3].addEventListener('click', () => { filteringDataByFaculties(data, 'Hufflepuff') })
btns[4].addEventListener('click', () => { filteringDataByFaculties(data, 'Ravenclaw') })
