const loadPhone = async (a) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${a}`
  );
  const data = await res.json();
  const phones = data.data;
  console.log(phones);
  displayPhones(phones);
};

const displayPhones = (phones) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.innerHTML = '';
  // display show all
  const showAll = document.getElementById('showAll-container');
  if (phones.length > 12) {
    showAll.classList.remove('hidden')
  } else {
    showAll.classList.add('hidden')
  }

  // slice
  phones = phones.slice(0, 12)
  phones.forEach((phone) => {
    console.log(phone);
    // creative a div
    const phoneDiv = document.createElement("div");
    phoneDiv.classList = `card p-4 bg-gray-100 shadow-xl`;
    phoneDiv.innerHTML = `
    <figure>
    <img
      src="${phone.image}"
      alt="image"
    />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${phone.phone_name}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
    
    `;
    phoneContainer.appendChild(phoneDiv);
  });
};

const handleSearch = (e) => {
  if (e.key == 'Enter') {
    const searchField = document.getElementById('input');
    const searchText = searchField.value;
    console.log(searchText);
    searchField.value = '';

    loadPhone(searchText);
  }

}

// loadPhone();
document.getElementById('input').addEventListener('keypress', handleSearch)

const clickButton = () => {
  const searchField = document.getElementById('input');
  const searchText = searchField.value;
  console.log(searchText);
  searchField.value = '';

  loadPhone(searchText);
}

// new duplicate button set
const clickSearch = () => {
  const duplicate = document.getElementById('input-field');
  const inputButton = duplicate.value;
  duplicate.value = '';
  console.log(inputButton);
  loadPhone(inputButton)
}