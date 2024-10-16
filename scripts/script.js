// Create display Categories
const peddyCategory = async () => {
    const categoryNav = document.getElementById('category-nav');
    // Fetch Pets Category
    const res = await fetch("https://openapi.programming-hero.com/api/peddy/categories");
    const data = await res.json();
    const allCategories = data.categories;
    allCategories.forEach(category => {
        const btnContainer = document.createElement('div');
        btnContainer.innerHTML = `
            <button id="btn-${category.category}" onclick="loadCategoryPets('${category.category}')" class="border border-slate-300 px-10 lg:px-20 py-3 lg:py-4 rounded-lg flex items-center justify-center gap-3 cursor-pointer category-btn">
                <img src="${category.category_icon}" />
                <p class="text-xl lg:text-2xl font-bold">${category.category}</p>
            </button>
        `
        categoryNav.appendChild(btnContainer);
    });
}
// Load category pets
const loadCategoryPets = async (category) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);
        const data = await res.json();
        removeActiveClass();
        const activeBtn = document.getElementById(`btn-${category}`);
        activeBtn.classList.add("active");
        // Spinner Added
        document.getElementById("spinner").style.display = 'block';
        document.getElementById("remove-show").style.display = 'none';
        setTimeout(() => {
            showAllPets(data.data);
            document.getElementById("spinner").style.display = 'none';
            document.getElementById("remove-show").style.display = 'grid';

        }, 2000)
    }
    catch (error) {
        console.log(error);
    }
}
const removeActiveClass = () => {
    const buttons = document.getElementsByClassName('category-btn');
    for (const btn of buttons) {
        btn.classList.remove("active");
    }
}

let pets;
// Fetch all Pets
const loadAllPets = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pets/`);
    const data = await res.json();
    pets = data.pets;

    showAllPets();
}
// Show All Pets
const showAllPets = async () => {
    const allPets = document.getElementById('all-pets');
    if (pets.length === 0) {
        allPets.innerHTML = "";
        allPets.style.backgroundColor = "#13131308";
        allPets.innerHTML = `
            <div class="text-center p-4 md:p-10 lg:p-16 col-span-4 md:col-span-3">
                <img class="mx-auto w-1/2 md:w-auto" src="../images/error.webp" alt="Error" />
                <h1 class="text-2xl md:text-4xl font-bold text-center" >No Information Available</h1>
                <p class="text-base font-medium text-slate-500 mt-5">Card information not found. Please provide valid card details to proceed with the transaction. If you believe this is an error, please contact support for assistance. How’s that?</p>
            </div>
        `
        return;
    }
    allPets.innerHTML = "";
    pets.forEach(pet => {
        const { pet_name, breed, date_of_birth, gender, image, price } = pet;
        const div = document.createElement('div');
        div.innerHTML = `
            <div class= "card border border-gray-300 rounded-lg p-3" >
                <figure>
                    <img
                    src="${image}"
                    alt="Shoes"
                    class="rounded-lg" />
                </figure>
                <div class="mt-3">
                    <h2 class="card-title text-2xl mb-2 font-bold">${pet_name}</h2>
                    <p class="text-gray-500 tracking-wide font-normal flex items-center gap-2">
                        <i class="fa-solid fa-icons w-4"></i>
                        <span>Breed: ${breed ? breed : "Not Available"}</span>
                    </p>
                    <p class="text-gray-500 tracking-wide font-normal flex items-center gap-2">
                        <i class="fa-solid fa-calendar-days w-4"></i>
                        <span>Birth: ${date_of_birth ? date_of_birth.slice(0, 4) : "Not Available"}</span>
                    </p>
                    <p class="text-gray-500 tracking-wide font-normal flex items-center gap-2">
                        <i class="fa-solid fa-venus w-4"></i>
                        <span>Gender: ${gender ? gender : "Not Available"}</span>
                    </p>
                    <p class="text-gray-500 tracking-wide font-normal flex items-center gap-2">
                        <i class="fa-solid fa-dollar-sign w-4"></i>
                        <span>Price: ${price ? price + '$' : "Not Available"}</span>
                    </p>
                </div>
                <div class="divider h-0"></div>
                <div class="flex justify-between items-center gap-3 w-full">
                    <button onclick="showPet(${pet.petId})" class="border px-3 py-1 rounded font-semibold text-gray-800"><i class="fa-regular fa-thumbs-up"></i></button>
                    <button onclick="showCountModal()" class="border px-2 py-1 rounded font-semibold text-[#0E7A81]">Adopt</button>
                    <button onclick="showDetailsModal(${pet.petId})" class="border px-2 py-1 rounded font-semibold text-[#0E7A81]">Details</button>
                </div>
            </ >
    `
        allPets.appendChild(div);
    })
}

// show single pet image in the right side box
const showPet = async (petId) => {
    const petContainer = document.getElementById("add-pets");
    // Fetch Pet Id
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    const data = await res.json();
    const imageUrl = data.petData.image;
    const div = document.createElement('div');
    div.classList = "border-2 border-slate-300 rounded-lg";
    div.innerHTML = `
        <img class="rounded-md" src="${imageUrl}" alt="PET" /></img>
    `
    petContainer.appendChild(div);
}

const showDetailsModal = async (petId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
    const data = await res.json();
    const result = data.petData;
    console.log(result);
    const { pet_name, breed, pet_details, date_of_birth, image, vaccinated_status, gender, price } = result;
    // pet details
    const modalDetailsContainer = document.getElementById('modal-details-container');
    modalDetailsContainer.innerHTML = `
        <dialog id="my_modal_1" class="modal">
            <div class="modal-box">
                <img class="bg-cover rounded-lg h-80 object-cover w-full" src="${image}" alt="Pets" />
                <h3 class="text-3xl font-bold my-3">${pet_name}</h3>
                <div class="flex flex-row justify-between">
                    <div class="flex-1 space-y-1">
                        <p class="text-gray-500 tracking-wide font-normal flex items-center gap-2">
                            <i class="fa-solid fa-icons w-4"></i>
                            <span>Breed: ${breed ? breed : "Not Available"}</span>
                        </p>
                        
                        <p class="text-gray-500 tracking-wide font-normal flex items-center gap-2">
                            <i class="fa-solid fa-venus w-4"></i>
                            <span>Gender: ${gender ? gender : "Not Available"}</span>
                        </p>
                        <p class="text-gray-500 tracking-wide font-normal flex items-center gap-2">
                            <i class="fa-solid fa-shield-virus"></i>
                            <span>Vaccinated status: ${vaccinated_status ? vaccinated_status : "Not Available"}</span>
                        </p>
                        
                    </div>
                    <div class="flex-1 space-y-1">
                        <p class="text-gray-500 tracking-wide font-normal flex items-center gap-2">
                            <i class="fa-solid fa-calendar-days w-4"></i>
                            <span>Birth: ${date_of_birth ? date_of_birth.slice(0, 4) : "Not Available"}</span>
                        </p>
                        <p class="text-gray-500 tracking-wide font-normal flex items-center gap-2">
                            <i class="fa-solid fa-dollar-sign w-4"></i>
                            <span>Price: ${price ? price + '$' : "Not Available"}</span>
                        </p>
                    </div>
                </div>
                <div class="divider my-2"></div>
                <div>
                    <h1 class="text-slate-800 text-xl font-bold mb-3">Details Information</h1>
                    <p>
                        ${pet_details}
                    </p>
                </div>
                <div class="modal-action">
                <form method="dialog" class="w-full">
                    <button class="btn w-full bg-[#0e79811f] hover:bg-[#0e79813c] border hover:border-[#0e79815c] text-[#0E7A81]">Cancel</button>
                    </form>
                </div>
            </div>
        </dialog>
    `
    my_modal_1.showModal();
}

const showCountModal = () => {
    const showCountModalContainer = document.getElementById('modal-count-container');
    showCountModalContainer.innerHTML = `
        <dialog id="my_modal_2" class="modal">
            <div class="modal-box text-center">
                <img class="mx-auto" src="../images/handshake.png" alt="Handshake" />
                <h1 class="text-3xl font-bold mt-2 mb-4">Congrats</h1>
                <p class="text-slate-500">Adoption Process is Start For your Pet</p>
                <div id="modal_counter" class="text-6xl font-bold my-2">3</div>
                <div class="modal-action">
                <form method="dialog">
                    <button id="btn-timing" class="hidden">Close</button>
                </form>
                </div>
            </div>
        </dialog>
    `

    my_modal_2.showModal();

    const counter = document.getElementById('modal_counter');

    let count = 2;
    const countInterval = setInterval(() => {
        if (count)
            counter.innerHTML = count;
        else
            clearInterval(countInterval);
        count--;
    }, 1000)

    setTimeout(() => {
        document.getElementById('btn-timing').click();
        // document.getElementById('adopt').classList.add('disabled');
    }, 3000);
}

const handleSort = () => {
    pets.sort((a, b) => b.price - a.price);
    showAllPets();
}


peddyCategory();
loadAllPets();