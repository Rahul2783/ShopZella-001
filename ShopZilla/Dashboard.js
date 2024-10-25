
document.getElementById('addProductButton').addEventListener('click', addProduct);

function addProduct() {
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const productImage = document.getElementById('productImage').value;

    if (productName && productPrice && productImage) {
        const product = { name: productName, price: productPrice, image: productImage };
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
        clearProductInputs();
        displayProducts();
    } else {
        alert('Please fill in all fields.');
    }
}

function clearProductInputs() {
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productImage').value = '';
}

function displayProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${parseFloat(product.price).toFixed(2)}</p>
            <button onclick="deleteProduct(${index})">Delete</button>
        `;
        productList.appendChild(productCard);
    });
}

function deleteProduct(index) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.splice(index, 1); 
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts(); 
}


function displayOrders() {
    const orderList = document.getElementById('orderList');
    orderList.innerHTML = '<p>No orders yet.</p>'; 
}

function displayUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '<p>No users yet.</p>'; 
}


window.onload = () => {
    displayProducts();
    displayOrders();
    displayUsers();
};


function displayOrders() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const orderList = document.getElementById('orderList');
    orderList.innerHTML = ''; 

    
    if (orders.length === 0) {
        orderList.innerHTML = '<p>No orders yet.</p>';
    } else {
        
        orders.forEach((order, index) => {
            const orderCard = document.createElement('div');
            orderCard.className = 'order-card';
            orderCard.innerHTML = `
                <p><strong>Order #${index + 1}</strong></p>
                <p>Product: ${order.productName}</p>
                <p>Quantity: ${order.quantity}</p>
                <p>Total Price: $${parseFloat(order.totalPrice).toFixed(2)}</p>
            `;
            orderList.appendChild(orderCard);
        });
    }
}


window.onload = displayOrders;
