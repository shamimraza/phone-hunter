const loadPhone = async (a = '13', isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${a}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones, isShowAll);
};


const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.innerHTML = '';
  // display show all
  const showAll = document.getElementById('showAll-container');
  if (phones.length > 12 && !isShowAll) {
    showAll.classList.remove('hidden')
  } else {
    showAll.classList.add('hidden')
  }
  // console.log('show all', isShowAll);

  // slice
  if (!isShowAll) {
    phones = phones.slice(0, 12)

  }


  phones.forEach((phone) => {
    // console.log(phone);
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
    <div class="card-actions justify-center">
      <button onClick="showAllDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
    </div>
  </div>
    
    `;
    phoneContainer.appendChild(phoneDiv);
  });
  // hide loading spinner

  toggleSpinier(false)

};

const showAllDetail = async (id) => {
  console.log('object', id);
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json()
  const phone = data.data
  showPhoneDetails(phone)
}
// model open

const showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById("show-detaiuls-phone-name")
  phoneName.innerText = phone.name;
  const showDetailsContainer = document.getElementById("show-details-container");
  // showDetailsContainer.classList.add('.phone')
  showDetailsContainer.innerHTML = `
  <img src="${phone.image}" alt="" />
  <P>stroge: ${phone.mainFeatures.storage} </P>
  <P>displaysize : ${phone.mainFeatures.displaySize} </P>
  <P>Chipset: ${phone.mainFeatures.chipSet} </P>
  <P>Slug: ${phone.slug} </P>
  <P>Brand: ${phone.brand} </P>
  <P>ReleaseDate: ${phone.releaseDate} </P>
  <P>GPS: ${phone?.others?.GPS || 'No gps'} </P>

  `;

  show_details_modal.showModal()

}

const handleSearch = (e) => {
  if (e.key == 'Enter') {
    const searchField = document.getElementById('input');
    const searchText = searchField.value;
    // console.log(searchText);
    // searchField.value = '';

    loadPhone(searchText);
  }

}

// loadPhone();
document.getElementById('input').addEventListener('keypress', handleSearch)

const clickButton = () => {
  toggleSpinier(true)
  const searchField = document.getElementById('input');
  const searchText = searchField.value;
  // console.log(searchText);
  searchField.value = '';

  loadPhone(searchText);
}

// new duplicate button set
const clickSearch = (isShowAll) => {
  toggleSpinier(true);
  const duplicate = document.getElementById('input-field');
  const inputButton = duplicate.value;
  // console.log(inputButton);
  loadPhone(inputButton, isShowAll)

}

const toggleSpinier = (isLoading) => {
  const toggleLodging = document.getElementById('loading-spinner');
  if (isLoading) {
    toggleLodging.classList.remove('hidden')
  } else {
    toggleLodging.classList.add('hidden')
  }
}


const handleClick = () => {
  clickSearch(true)
}


loadPhone()