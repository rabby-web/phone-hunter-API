const loadPhone = async (searchText = "13", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones, isShowAll);
};
const displayPhones = (phones, isShowAll) => {
  // console.log(phones);
  const phoneContainer = document.getElementById("phone-container");
  // clear phone container card before adding new cards
  phoneContainer.textContent = "";
  // display only first 12 phone
  // display show all button if there are 12 phone
  const showAll = document.getElementById("show-all");
  if (phones.length > 12 && !isShowAll) {
    showAll.classList.remove("hidden");
  } else {
    showAll.classList.add("hidden");
  }
  console.log("is show all", isShowAll);
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    // console.log(phone);
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
        <div class="card-actions justify-center">
          <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Details</button>
        </div>
      </div>
    `;
    phoneContainer.appendChild(phoneCard);
  });
  // hide loading spinner
  toggleLoadingSpinner(false);
};
// show details
const handleShowDetail = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
};
const showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById("phone-name");
  phoneName.innerText = phone.name;

  const showDetailsContainer = document.getElementById(
    "show-details-container"
  );
  showDetailsContainer.innerHTML = `
  <div class="bg-gray-300 rounded-lg">
  <img class="w--1/2 mx-auto p-3 " src="${phone.image}" alt=""/></div>
  <p class="p-1 text-lg font-semibold"><span>Brand:</span>${phone?.brand}</p>
  <p class="p-1 text-lg"><span>Storage:</span>${phone?.mainFeatures.storage}</p>
  <p class="p-1 text-lg"><span>Memory
  :</span>${phone?.mainFeatures.memory}</p>
  <p class="p-1 text-lg"><span>Display
  :</span>${phone?.mainFeatures.displaySize}</p>
  `;

  show_details_modal.showModal();
};

// handle search button
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchFieldText = searchField.value;
  console.log(searchFieldText);
  loadPhone(searchFieldText, isShowAll);
  searchField.value = "";
};

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};
// Handle Show All
const handleShowAll = () => {
  handleSearch(true);
};
loadPhone();
