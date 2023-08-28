const loadPhone = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/phones?search=iphone"
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones);
};
const displayPhones = (phones) => {
  // console.log(phones);
  const phoneContainer = document.getElementById("phone-container");
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

loadPhone();
