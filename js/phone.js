const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones);
};
const displayPhones = (phones) => {
  // console.log(phones);
  const phoneContainer = document.getElementById("phone-container");
  // clear phone container card before adding new cards
  phoneContainer.textContent = "";
  // display only first 12 phone
  // display show all button if there are 12 phone
  const showAll = document.getElementById("show-all");
  if (phones.length > 12) {
    showAll.classList.remove("hidden");
  } else {
    showAll.classList.add("hidden");
  }

  phones = phones.slice(0, 12);
  phones.forEach((phone) => {
    console.log(phone);
    // 1 create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card card-compact w-full m-3 p-2 bg-gray-100 shadow-xl`;
    phoneCard.innerHTML = `
      <figure>
        <img
          src="${phone.image}"
          alt="Shoes"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>${phone.slug}</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Details</button>
        </div>
      </div>
    `;
    phoneContainer.appendChild(phoneCard);
  });
};
// handle search button
const handleSearch = () => {
  const searchField = document.getElementById("search-field");
  const searchFieldText = searchField.value;
  console.log(searchFieldText);
  loadPhone(searchFieldText);
  searchField.value = "";
};

// loadPhone();
