const decreaseButton = document.getElementById('decrease');
const increaseButton = document.getElementById('increase');
const quantityDisplay = document.getElementById('quantity');

let quantity = 1; // 初始化數量

function updateQuantityDisplay() {
    quantityDisplay.value = quantity;
}


function increaseQuantity() {
    quantityDisplay.classList.add('quantity-updating');
    setTimeout(() => {
        quantity++;
        quantityDisplay.value = quantity;
        quantityDisplay.classList.remove('quantity-updating');
    }, 150);
}

function decreaseQuantity() {
    if (quantity > 1) {
        quantityDisplay.classList.add('quantity-updating');
        setTimeout(() => {
            quantity--;
            quantityDisplay.value = quantity;
            quantityDisplay.classList.remove('quantity-updating');
        }, 150);
    }
}

// 手動輸入
quantityDisplay.addEventListener('input', function() {
    let inputVal = parseInt(quantityDisplay.value);

    if (!isNaN(inputVal) && inputVal >= 1) {
        quantity = inputVal;
    } else {
        quantity = 1;
    }
    updateQuantityDisplay();
});

// 把按鈕與函式綁在一起
increaseButton.addEventListener('click', increaseQuantity);
decreaseButton.addEventListener('click', decreaseQuantity);


// 點小圖換大圖
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.querySelector('#productModal');
    const largeImg = modal.querySelector('.large-img');

    // 產品卡片點擊，打開modal
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function () {
            const imgSrc = this.querySelector('img').src;
            largeImg.src = imgSrc;
            modal.classList.remove('hidden');
        });
    });

    // 【新增】縮圖點擊換大圖
    modal.addEventListener('click', function (e) {
        if (e.target.classList.contains('thumbnail')) {
            const newSrc = e.target.src;
            largeImg.src = newSrc;
        }
    });
});
