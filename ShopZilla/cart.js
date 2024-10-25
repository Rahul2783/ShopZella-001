
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.getAttribute('data-name');
        const productPrice = parseFloat(button.getAttribute('data-price'));
        const productImage = button.getAttribute('data-image'); 

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingProduct = cart.find(item => item.name === productName);

        if (existingProduct) {
            existingProduct.quantity += 1; 
        } else {
            
            cart.push({ name: productName, price: productPrice, quantity: 1, image: productImage });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCounter(); 
    });
});

function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsDiv = document.getElementById('cartItems');
    let cartTotal = 0;

    cartItemsDiv.innerHTML = ''; 

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty!</p>';
    } else {
        cart.forEach((item, index) => {
            if (item && item.price !== undefined && item.quantity !== undefined) {
                let productDiv = document.createElement('div');
                productDiv.classList.add('cart-item');

                productDiv.innerHTML = `
                        <img src="${item.image}" alt="${item.name}" class="product-image" style="width: 50px; height: 50px; margin-right: 10px;">
                        <div class="product-details">
                            <p>${item.name}</p>
                            <div class="quantity-container">
                                <button class="quantity-btn" onclick="decreaseQuantity(${index})">-</button>
                                <span>${item.quantity}</span>
                                <button class="quantity-btn" onclick="increaseQuantity(${index})">+</button>
                            </div>
                        </div>
                        <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
                        <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
                    `;
                cartItemsDiv.appendChild(productDiv);

               
                cartTotal += item.price * item.quantity;
            }
        });
    }

    document.getElementById('cartTotal').innerText = cartTotal.toFixed(2);
}

function increaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity += 1; 
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart(); 
}

function decreaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1; 
    } else {
        removeFromCart(index); 
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart(); 
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); 
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart(); 
}


window.onload = displayCart;

document.addEventListener('DOMContentLoaded', () => {
    displayCart(); 

    const checkoutButton = document.querySelector('.checkout-btn');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            
            window.location.href = 'checkout.html';
        });
    } else {
        console.error('Checkout button not found in the DOM');
    }
});
