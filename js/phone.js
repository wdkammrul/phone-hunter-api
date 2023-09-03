const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
    
    // step-1 set id 
    const phoneContainer = document.getElementById('phone-container')
    
    // clear phone container cards before adding new cards 
    phoneContainer.textContent = '';
    
    //display show all button if there are more than 12 phons 
    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length > 12 && !isShowAll) {
       showAllContainer.classList.remove('hidden')
    }else{
       showAllContainer.classList.add('hidden')
    }

    // console.log('is show all', isShowAll)

    // display only first 15 phons if not show all
    if(!isShowAll){
        phones = phones.slice(0, 15);
    }

  phones.forEach((phone) => {
    // console.log(phone);

    // step-2 create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card p-4 bg-gray-300 shadow-xl`;

    // step-3  set innerHtml 
    phoneCard.innerHTML = `
          <figure>
              <img
                src="${phone.image}"
                alt="Shoes"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions justify-center">
                <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
              </div>
            </div>
        `;

        phoneContainer.appendChild(phoneCard);
  });

//   hide loading spinner 
toggleLoadingSpinner(false)
};

// show details click 
const handleShowDetail = async (id) =>{
  // console.log('show detai', id)
  // load single phone data  
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;

  showPhoneDetails(phone);

}


const showPhoneDetails = (phone) =>{
  console.log(phone)
  const phoneName = document.getElementById("show-detail-phone-name");
  phoneName.innerText = phone.name;

  const showDetailContainer = document.getElementById("show-detail-container")

  showDetailContainer.innerHTML = `
   <img src="${phone.image}" alt=""/>
   <p><span>Storage: </span>${phone?.mainFeatures?.storage}</p>
   <p><span>Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
   <p><span>Chip Set: </span>${phone?.mainFeatures?.chipSet}</p>
   <p><span>Memory: </span>${phone?.mainFeatures?.memory}</p>
   <p><span>Brand: </span>${phone?.brand}</p>
   <p><span>GPS: </span>${phone?.others?.GPS || 'No GPS available'}</p>
  `;

  // show the modea 
  show_details_modal.showModal();
}


// handle search button   
const handleSearch = (isShowAll) =>{
     toggleLoadingSpinner(true) 
    ;
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    console.log(searchText)
    loadPhone(searchText, isShowAll)
    
}


// // handle Search recap 
// const handleSearch2 = () =>{
//     toggleLoadingSpinner(true) 
//     ;
//     const searchField = document.getElementById("search-field2");
//     const searchText = searchField.value;
//     loadPhone(searchText)
// }


const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById("loading-spinner")
    if(isLoading){
        loadingSpinner.classList.remove("hidden");
    }else{
        loadingSpinner.classList.add('hidden');
    }
}


// handle show all 
const handleShowAll = () =>{
    handleSearch(true)
}
+
loadPhone();
