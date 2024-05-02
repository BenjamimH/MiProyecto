let cartItems = [];
let cartTotal = 0;

function addToCart(productId) {
    let product = document.getElementById(productId);
    let productName = product.querySelector('h3').innerText;
    let productPrice = parseFloat(product.querySelector('.price').innerText.replace('$', ''));
    cartItems.push({ id: productId, name: productName, price: productPrice });
    cartTotal += productPrice;
    updateCart();
}

function removeFromCart(itemId) {
    let itemIndex = cartItems.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        cartTotal -= cartItems[itemIndex].price;
        cartItems.splice(itemIndex, 1);
        updateCart();
    }
}

function updateCart() {
    let cartItemsList = document.getElementById('cart-items');
    cartItemsList.innerHTML = '';

    if (cartItems.length === 0) {
        cartTotal = 0; // Establece el total en 0 si no hay elementos en el carrito
    }

    cartItems.forEach(item => {
        let li = document.createElement('li');
        li.innerText = `${item.name} - $${item.price.toFixed(2)}`;
        let removeButton = document.createElement('button');
        removeButton.innerText = 'Eliminar';
        removeButton.onclick = function() { removeFromCart(item.id); };
        li.appendChild(removeButton);
        cartItemsList.appendChild(li);
    });

    document.getElementById('cart-total').innerText = `$${cartTotal.toFixed(2)}`;
}

document.getElementById('pay-button').addEventListener('click', function() {
    if (cartTotal === 0) {
        let cartItemsList = document.getElementById('cart-items');
        cartItemsList.innerHTML = '';
        let li = document.createElement('li');
        li.innerText = 'Error, Asegúrese de que haya productos agregados al carrito antes de pagar.';
        cartItemsList.appendChild(li);
        document.getElementById('cart-total').innerText = '$0';
    }

    document.getElementById('pay-button').addEventListener('click', function() {
        if (cartTotal === 0) {
            let cartItemsList = document.getElementById('cart-items');
            cartItemsList.innerHTML = '';
            let li = document.createElement('li');
            li.innerText = 'Error: Asegúrese de que haya productos agregados al carrito.';
            cartItemsList.appendChild(li);
            document.getElementById('cart-total').innerText = '$0.00';
        } else {
            document.getElementById('payment-dialog').style.display = 'block';
        }
    });
    
    
    document.getElementById('confirm-payment').addEventListener('click', function(event) {
        let fields = document.querySelectorAll('#payment-form input');
        fields.forEach(function(field) {
            let alertId = field.id + '-alert';
            let alert = document.getElementById(alertId);
    
            if (field.value.trim() === '') {
                alert.style.display = 'block';
            } else {
                alert.style.display = 'none';
            }
        });
    
        // Si hay algún campo vacío, evita que se envíe el formulario
        let emptyFields = document.querySelectorAll('#payment-form input:invalid');
        if (emptyFields.length > 0) {
            event.preventDefault();
        }
    });
                   
        
});


