
const navbarLinks = document.querySelectorAll('.navbar-link');


navbarLinks.forEach(link => {
    link.addEventListener('click', function(event) {
       
        console.log('Navigating to:', this.href);
    });
});



const shopNowButton = document.querySelector('.btn');

shopNowButton.addEventListener('click', function(event) {
    event.preventDefault(); 
});



const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
    
        const productCard = button.closest('.product-card');

        const productName = productCard.querySelector('.product-name').innerText;
        const productPrice = productCard.querySelector('.product-price').innerText;

        
        const messageElement = document.createElement('div');
        messageElement.className = 'cart-message';
        messageElement.innerText = `${productName} has been added to your cart for ${productPrice}!`;
       
        productCard.appendChild(messageElement);

        setTimeout(() => {
            messageElement.remove();
        }, 3000); 
    });
});

const categories = [
    { imgSrc: 'men.jpg', alt: 'Men', text: 'Men Fashion' },
    { imgSrc: 'women.jpg', alt: 'Women', text: 'Women Fashion' },
    { imgSrc: 'kids.jpg', alt: 'Kids', text: 'Kids Fashion' },
    { imgSrc: 'electronics.jpg', alt: 'Electronics', text: 'Electronics item' },
    { imgSrc: 'shoes.jpg', alt: 'Shoes', text: 'Shoes' },
];

const promotions = [
    { title: 'Men Shirts', discount: 'Get up to 30% off', imgSrc: 'men-shirts.jpg' },
    { title: 'Women Shirts', discount: 'Get up to 50% off', imgSrc: 'women-shirts.jpg' },
];


const promoCards = document.querySelectorAll('.promo-card');
promoCards.forEach((promoCard, index) => {
    if (promotions[index]) {
        promoCard.querySelector('h3').innerText = promotions[index].title;
        promoCard.querySelector('p').innerText = promotions[index].discount;
        promoCard.querySelector('img').src = promotions[index].imgSrc;
        
      
        promoCard.querySelector('button').addEventListener('click', () => {
            alert(`Redirecting to ${promotions[index].title} collection!`);
           
        });
    }
});


const categoryCards = document.querySelectorAll('.category-card');
const productCards = document.querySelectorAll('.product-card');

categoryCards.forEach(card => {
    card.addEventListener('click', () => {
       
        const selectedCategory = card.querySelector('p').innerText;

       
        productCards.forEach(product => {
            const productCategory = product.querySelector('.product-category').innerText;

            if (productCategory === selectedCategory || selectedCategory === 'All Categories') {
                product.style.display = 'block'; 
            } else {
                product.style.display = 'none'; 
            }
        });
    });
});


const allCategoriesCard = document.createElement('div');
allCategoriesCard.classList.add('category-card');
allCategoriesCard.innerHTML = `<p>All Categories</p>`;
document.querySelector('.Featured-categories').prepend(allCategoriesCard);


allCategoriesCard.addEventListener('click', () => {
    productCards.forEach(product => {
        product.style.display = 'block'; 
    });
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


function logContactInfo() {
    const email = 'support@example.com';
    const phone = '+1 123-456-7890';
    const address = '1234 Street, City, Country';

    console.log(`Contact Info:\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}`);
}


window.onload = logContactInfo;


document.querySelector('.contact-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    
    alert('Form submitted!'); 
});


function addToCart(productName, productPrice, productImage) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity += 1; 
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1, image: productImage }); 
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
}


document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.getAttribute('data-name');
        const productPrice = parseFloat(button.getAttribute('data-price'));
        const productImage = button.parentElement.querySelector('.product-image').src; 
       
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        
        const existingProduct = cart.find(item => item.name === productName);
        if (existingProduct) {
            existingProduct.quantity += 1; 
        } else {
            
            cart.push({ name: productName, price: productPrice, image: productImage, quantity: 1 });
        }

       
        localStorage.setItem('cart', JSON.stringify(cart));

        console.log(`${productName} has been added to your cart!`);
    });
});



