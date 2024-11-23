// Intializing Variables

var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var productImage = document.getElementById("productImage");
var searchField = document.getElementById("searchField");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");

// The array of the products

var productsList = [];

// To check if ther's old products

if(localStorage.getItem("products") != null){
    productsList = JSON.parse(localStorage.getItem("products"));
    displayProducts(productsList);
}

// Add Products 

function addProducts () {
    if ( validation( productName ) && validation( productPrice ) && validation( productCategory ) && validation( productDescription ) ) {
        var product = {
            name : productName.value ,
            price : productPrice.value ,
            category : productCategory.value ,
            description : productDescription.value ,
            image : `images/${productImage.files[0]?.name?productImage.files[0]?.name:`download.png`}`
        }
        productsList.push(product);
        localStorage.setItem("products" , JSON.stringify(productsList));
        displayProducts(productsList);
        clearInputs();
    }else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please fill all the inputs"
          });
    }
    
}

// Display Products

function displayProducts (arr) {
    var holder = `` ;
    for (i =0 ; i < arr.length ; i++) {
        holder += `
         <div class="col-md-3">
                <div class="card">
                    <img src="${arr[i].image}" alt="phone img" class="w-100  rounded-5 h-50">
                    <div class="card-body text-start">
                        <h2 class="h4">${arr[i].name}</h2>
                        <h3 class="h6">Price : <span>${arr[i].price}</span></h3>
                        <h3 class="h6">Category : <span>${arr[i].category}</span></h3>
                        <p>${arr[i].description}</p>
                    </div>
                        <button class="m-2 btn btn-danger" onclick="deleteProduct(${i})">Delete <i class="fa-solid fa-trash-can"></i></button>
                        <button class="m-2 btn btn-warning" onclick="setProductValues(${i})" >Update <i class="fa-solid fa-pencil"></i></button>
                </div>
            </div>
        `
    }
    if ( arr.length == 0 ){
        holder = `<h3 class=" text-danger">No Products Available</h3>` 
    }
    document.getElementById("data").innerHTML = holder ;
}

// Clear Inputs

function clearInputs () {
    // Removing Values
    productName.value = null ;
    productPrice.value = null ;
    productCategory.value = null ;
    productDescription.value = null ;
    productImage.value = null ;
    // Removing Validation
    productName.classList.remove("is-valid") ;
    productPrice.classList.remove("is-valid") ;
    productCategory.classList.remove("is-valid") ;
    productDescription.classList.remove("is-valid") ;
    productImage.classList.remove("is-valid") ;
}

// Delete Product

function deleteProduct (index) {
    productsList.splice(index , 1);
    localStorage.setItem("products" , JSON.stringify(productsList));
    displayProducts(productsList);
}

// Search 

function search () {
    var term = searchField.value ;
    var searchList = [] ;
    for (i =0 ; i < productsList.length ; i++) {
        if (productsList[i].name.toLowerCase().includes(term.toLowerCase())){
            searchList.push(productsList[i])
        }
    }
    displayProducts(searchList) ;
}

// Update

var productIndex;
function setProductValues (index) {
    productIndex = index;
    productName.value = productsList[index].name ;
    productPrice.value = productsList[index].price ;
    productCategory.value = productsList[index].category ;
    productDescription.value = productsList[index].description ; 
    addBtn.classList.add("d-none") ;
    updateBtn.classList.remove("d-none") ;
}

function updateProduct () {
    productsList[productIndex].name = productName.value ;
    productsList[productIndex].price = productPrice.value ;
    productsList[productIndex].category = productCategory.value ;
    productsList[productIndex].description = productDescription.value ;
    localStorage.setItem("products" , JSON.stringify(productsList));
    displayProducts(productsList);
    clearInputs();
    addBtn.classList.remove("d-none") ;
    updateBtn.classList.add("d-none") ;
}

// Validation

function validation (input) {
    var term = input.value ;
    var myElementID = input.id ;
    if ( myElementID == "productImage" ) {
        term = productImage.files[0].name ;
    }
    var myRegex = {
        productName : /^[A-Z]\w{3,15}$/ ,
        productPrice : /^[1-9]\d{0,5}$/ ,
        productCategory : /^(tv|mobile|laptops|clothes)$/i ,
        productDescription : /^.+$/m ,
        productImage : /^.{1,100}\.(jpg|jpeg|png|webp)$/i
    }
    var regex = myRegex[myElementID] ;
    if ( regex.test(term) ) {
        input.classList.add("is-valid") ;
        input.classList.remove("is-invalid") ;
        if ( myElementID == "productName" ){
            document.getElementById("nameAlert").classList.add("d-none");
        }
        return true ;
    }else {
        input.classList.remove("is-valid") ;
        input.classList.add("is-invalid") ;
        if ( myElementID == "productName" ){
            document.getElementById("nameAlert").classList.remove("d-none");
        }
        return false ;
    }
}