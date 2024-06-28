//U67724813
//Alaina Musselwhite

const apiUrl = 'http://localhost:8080/https://course-api.com/react-store-products';
const productContainer = document.getElementById('product-container');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const productImg = document.getElementById('product-img');
const productName = document.getElementById('product-name');
const productPrice = document.getElementById('product-price');
const productDescription = document.getElementById('product-description');

let products = [];
let currentIndex = 0;

async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        products = await response.json();
        if (products.length === 0) {
            throw new Error('No products found');
        }
        displayProduct(currentIndex);
        loading.style.display = 'none';
        productContainer.style.display = 'block';
    } catch (err) {
        console.error('Fetch error:', err);
        loading.style.display = 'none';
        error.style.display = 'block';
    }
}

function displayProduct(index) {
    const product = products[index];
    productImg.src = product.image;
    productName.textContent = product.name;
    productPrice.textContent = `$${product.price}`;
    productDescription.textContent = product.description;
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + products.length) % products.length;
    displayProduct(currentIndex);
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % products.length;
    displayProduct(currentIndex);
});

fetchProducts();