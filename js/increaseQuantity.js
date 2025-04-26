const decreaseButton = document.getElementById('decrease');
const increaseButton = document.getElementById('increase');
const quantityDisplay = document.getElementById('quantity');

function increaseQuantity() {
    quantityDisplay.classList.add('quantity-updating');
    setTimeout(() => {
        quantity++;
        quantityDisplay.textContent = quantity;
        quantityDisplay.classList.remove('quantity-updating');
    }, 150);
}

function decreaseQuantity() {
    if (quantity > 1) {
        quantityDisplay.classList.add('quantity-updating');
        setTimeout(() => {
            quantity--;
            quantityDisplay.textContent = quantity;
            quantityDisplay.classList.remove('quantity-updating');
        }, 150);
    }
}

// 把按鈕與函式綁在一起
increaseButton.addEventListener('click', increaseQuantity);
decreaseButton.addEventListener('click', decreaseQuantity);
