document.getElementById('paymentMethod').addEventListener('change', function() {
    const selectedMethod = this.value;
    const cardDetails = document.getElementById('cardDetails');

    
    if (selectedMethod === 'creditCard') {
        cardDetails.style.display = 'block';
    } else {
        cardDetails.style.display = 'none';
    }
});

document.getElementById('placeOrder').addEventListener('click', function() {
    let isValid = true;

    
    const name = document.getElementById('name');
    const address = document.getElementById('address');
    const city = document.getElementById('city');
    const zip = document.getElementById('zip');
    const paymentMethod = document.getElementById('paymentMethod').value;

    clearErrors(); 

    
    if (name.value.trim() === '') {
        showError(name, 'Name is required');
        isValid = false;
    }

    if (address.value.trim() === '') {
        showError(address, 'Address is required');
        isValid = false;
    }

    if (city.value.trim() === '') {
        showError(city, 'City is required');
        isValid = false;
    }

    if (zip.value.trim() === '') {
        showError(zip, 'Zip code is required');
        isValid = false;
    }

    
    if (paymentMethod === 'creditCard') {
        const cardNumber = document.getElementById('cardNumber');
        const expiryDate = document.getElementById('expiryDate');
        const cvv = document.getElementById('cvv');

        if (cardNumber.value.trim() === '') {
            showError(cardNumber, 'Card number is required');
            isValid = false;
        } else if (!/^\d{16}$/.test(cardNumber.value.trim())) {
            showError(cardNumber, 'Invalid card number. Must be 16 digits.');
            isValid = false;
        }

        if (expiryDate.value.trim() === '') {
            showError(expiryDate, 'Expiry date is required');
            isValid = false;
        } else if (!/^\d{2}\/\d{2}$/.test(expiryDate.value.trim())) {
            showError(expiryDate, 'Invalid expiry date. Format MM/YY.');
            isValid = false;
        }

        if (cvv.value.trim() === '') {
            showError(cvv, 'CVV is required');
            isValid = false;
        } else if (!/^\d{3}$/.test(cvv.value.trim())) {
            showError(cvv, 'Invalid CVV. Must be 3 digits.');
            isValid = false;
        }
    }

    
    if (isValid) {
        document.getElementById('orderMessage').innerText = 'Your order has been placed successfully!';
    }
});


function showError(inputElement, message) {
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.innerText = message;
    inputElement.parentElement.appendChild(errorElement);
    inputElement.classList.add('error-input');
}


function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(message => message.remove());

    const errorInputs = document.querySelectorAll('.error-input');
    errorInputs.forEach(input => input.classList.remove('error-input'));
}




function placeOrder() {
    
    const productName = document.getElementById('productName').value;
    const quantity = document.getElementById('quantity').value;
    const totalPrice = document.getElementById('totalPrice').innerText; 

    
    const newOrder = {
        productName: productName,
        quantity: quantity,
        totalPrice: totalPrice
    };

    
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    orders.push(newOrder);

    
    localStorage.setItem('orders', JSON.stringify(orders));

    
    window.location.href = 'order-confirmation.html';
}


function getCartItems() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function calculateTotal() {
    const cartItems = getCartItems();
    let total = 0;

    cartItems.forEach(item => {
        total += item.price * item.quantity; 
    });

    return total;
}


function displayTotal() {
    const totalAmount = calculateTotal();
    const totalElement = document.getElementById('totalAmount'); 
    totalElement.textContent = `Total: $${totalAmount.toFixed(2)}`;
}


window.onload = displayTotal;
