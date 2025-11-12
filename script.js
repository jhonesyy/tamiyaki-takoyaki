// --- CART FUNCTIONALITY ---
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price) {
    let item = cart.find(i => i.name === name);
    if (item) item.qty++;
    else cart.push({ name, price, qty: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} added to cart!`);
    loadCart();
    updateCheckout();
}

function loadCart() {
    const container = document.getElementById('cart-items');
    if (!container) return;
    container.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.qty;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            ${item.name} - ₱${item.price} x ${item.qty} 
            <button onclick="removeFromCart('${item.name}')">Remove</button>
        `;
        container.appendChild(div);
    });
    const totalElem = document.getElementById('total');
    if(totalElem) totalElem.innerText = `Total: ₱${total}`;
}

function removeFromCart(name) {
    cart = cart.filter(i => i.name !== name);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    updateCheckout();
}

function updateCheckout() {
    const container = document.getElementById('checkout-items');
    if (!container) return;
    container.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.qty;
        const div = document.createElement('div');
        div.innerText = `${item.name} - ₱${item.price} x ${item.qty}`;
        container.appendChild(div);
    });
    const totalElem = document.getElementById('checkout-total');
    if(totalElem) totalElem.innerText = `Total: ₱${total}`;
}

function completeOrder() {
    if(cart.length === 0){
        alert("Your cart is empty!");
        return;
    }
    const method = document.getElementById('payment-method').value;
    const receiptDiv = document.getElementById('receipt');
    const receiptContent = document.getElementById('receipt-content');

    const total = cart.reduce((sum, i) => sum + i.price*i.qty, 0);
    const itemsList = cart.map(i => `${i.name} x ${i.qty} - ₱${i.price*i.qty}`).join('<br>');

    receiptContent.innerHTML = `
        <strong>Payment Method:</strong> ${method}<br>
        <strong>Items:</strong><br>${itemsList}<br>
        <strong>Total:</strong> ₱${total}<br>
        <strong>Thank you for ordering!</strong>
    `;
    receiptDiv.style.display = 'block';
    cart = [];
    localStorage.removeItem('cart');
    loadCart();
    updateCheckout();
}

function printReceipt() {
    const content = document.getElementById('receipt-content').innerHTML;
    const myWindow = window.open('', '', 'width=400,height=600');
    myWindow.document.write(`<html><body>${content}</body></html>`);
    myWindow.document.close();
    myWindow.print();
}

// --- PROFILE FUNCTIONALITY ---
let user = JSON.parse(localStorage.getItem('user')) || {
    name: 'John Doe',
    email: 'johndoe@example.com',
    address: '123 Street, Tanay, Rizal'
};

function loadProfile() {
    const nameElem = document.getElementById('profile-name');
    const emailElem = document.getElementById('profile-email');
    const addressElem = document.getElementById('profile-address');
    if(nameElem) nameElem.innerText = user.name;
    if(emailElem) emailElem.innerText = user.email;
    if(addressElem) addressElem.innerText = user.address;

    const editName = document.getElementById('edit-name');
    const editEmail = document.getElementById('edit-email');
    const editAddress = document.getElementById('edit-address');
    if(editName) editName.value = user.name;
    if(editEmail) editEmail.value = user.email;
    if(editAddress) editAddress.value = user.address;
}

function saveProfile(e){
    e.preventDefault();
    user.name = document.getElementById('edit-name').value;
    user.email = document.getElementById('edit-email').value;
    user.address = document.getElementById('edit-address').value;
    localStorage.setItem('user', JSON.stringify(user));
    alert('Profile updated!');
    window.location.href = 'profile.html';
}

// --- INITIALIZE ---
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    updateCheckout();
    loadProfile();

    const editForm = document.getElementById('editForm');
    if(editForm) editForm.addEventListener('submit', saveProfile);
});
