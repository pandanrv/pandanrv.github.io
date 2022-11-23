const searchInput = document.querySelector("#search");
const searchResult = document.querySelector(".table-results");

let dataArray;

async function getUsers() {
  const res = await fetch("https://randomuser.me/api/?nat=fr&results=50");

  const {results} = await res.json();

  dataArray = orderList(results);

  createUserList(dataArray);
}

getUsers();

function orderList(data) {
  const orderedData = data.sort((a, b) => {
    if (a.name.last.toLowerCase() < b.name.last.toLowerCase()) {
      return -1;
    }
    if (a.name.last.toLowerCase() > b.name.last.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  return orderedData;
}

function createUserList(userList) {
  userList.forEach(user => {
    const listItem = document.createElement("div");
    listItem.setAttribute("classe", "table-item");

    listItem.innerHTML = `<div class="table-item">
        <div class="container-img">
          <img src=${user.picture.medium} alt="">
          <p class="name">${user.name.last} ${user.name.first}</p>
        </div>
        <select id="container-select">
          <option value="">container</option>
          <option value="">Dog</option>
          <option value="">Cat</option>
          <option value="">Hamster</option>
          <option value="">Parrot</option>
          <option value="">Spider</option>
        </select>
        <select id="quantity-select">
          <option value="">quantity</option>
          <option value="">0.100</option>
          <option value="">0.200</option>
          <option value="">0.500</option>
          <option value="">1</option>
          <option value="">2</option>
          <option value="">3</option>
          <option value="">5</option>
        </select>
        <button>confirm</button>`;

    searchResult.appendChild(listItem);
  });
}

searchInput.addEventListener("input", filterData);

function filterData(e) {
  searchResult.innerHTML = "";

  const searchedString = e.target.value.toLowerCase();

  const filteredArr = dataArray.filter(
    el =>
      el.name.first.toLowerCase().includes(searchedString) ||
      el.name.last.toLowerCase().includes(searchedString)
  );

  createUserList(filteredArr);
}
