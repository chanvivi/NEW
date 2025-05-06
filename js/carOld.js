// // 初始化購物車陣列（從 localStorage 讀取）
// let cart = JSON.parse(localStorage.getItem('cart')) || [];

// document.addEventListener('DOMContentLoaded', function () {
//   const addToCartBtn = document.getElementById('addToCartBtn');
//   const sidebar = document.getElementById('cartSidebar');
//   const cartList = document.getElementById('cartItemsList');

//   // 加入購物車按鈕事件
//   addToCartBtn.addEventListener('click', function () {
//     const name = document.querySelector('.modal-title').innerText;
//     const price = document.querySelector('.modal-price').innerText;
//     let img = document.querySelector('.small-img')
//       ? document.querySelector('.small-img').src
//       : document.querySelector('.large-img').src;
//     const qty = parseInt(document.getElementById('quantity').value);

//     const product = { name, price, img, quantity: qty };

//     // 檢查是否已存在同商品
//     const existingProduct = cart.find(item => item.name === product.name);
//     if (existingProduct) {
//       existingProduct.quantity += qty;
//     } else {
//       cart.push(product);
//     }

//     updateCartDisplay();
//     saveCartToLocalStorage();

//     // 顯示購物車側邊欄
//     sidebar?.classList.add('active');
//   });

//   // 點擊非側邊欄/按鈕/購物車圖示時，關閉側邊欄
//   document.addEventListener('click', function (event) {
//     const isInsideSidebar = sidebar && sidebar.contains(event.target);
//     const isAddToCartButton = event.target.closest('#addToCartBtn') !== null;
//     const isCartLink = event.target.closest('#cartLink') !== null;

//     if (isAddToCartButton || isCartLink) {
//       // 顯示側邊欄
//       event.preventDefault(); // 防止頁面跳轉
//       sidebar?.classList.add('active');
//       return; // ✅ 防止往下執行關閉邏輯
//     }

//     if (!isInsideSidebar) {
//       // 點擊其他地方關掉
//       sidebar?.classList.remove('active');
//       console.log('移除');
//     }
//   });

//   // 使用事件委託處理購物車內刪除按鈕
//   cartList.addEventListener('click', function (event) {
//     if (event.target.classList.contains('delete-btn')) {
//       event.stopPropagation(); // 停止事件冒泡
//       const index = parseInt(event.target.dataset.index);
//       cart.splice(index, 1);
//       saveCartToLocalStorage();
//       updateCartDisplay();
//     }
//   });

//   // 初次載入時更新購物車顯示
//   updateCartDisplay();
// });

// // 儲存購物車至 localStorage
// function saveCartToLocalStorage() {
//   localStorage.setItem('cart', JSON.stringify(cart));
// }

// // 更新購物車顯示
// function updateCartDisplay() {
//   const cartList = document.getElementById('cartItemsList');
//   const template = document.getElementById('cart-item-template');
//   const emptyMessage = document.getElementById('emptyCartMessage');
//   const checkoutNo = document.getElementById('checkoutNo');
//   cartList.innerHTML = '';

//   const reversedCart = [...cart].reverse();

//   if (cart.length === 0) {
//     emptyMessage.style.display = 'block';
//     checkoutNo.style.display = 'none';
//   } else {
//     emptyMessage.style.display = 'none';
//     checkoutNo.style.display = 'block';

//     reversedCart.forEach((item, reversedIndex) => {
//       const clone = template.content.cloneNode(true);
//       const originalIndex = cart.length - 1 - reversedIndex;

//       clone.querySelector('.item-img').src = item.img;
//       clone.querySelector('.item-img').alt = item.name;
//       clone.querySelector('.item-name').textContent = item.name;
//       clone.querySelector('.item-qty').textContent = `${item.quantity}x`;
//       clone.querySelector('.item-price').textContent = item.price;
//       clone.querySelector('.delete-btn').dataset.index = originalIndex;

//       cartList.appendChild(clone);
//     });
//   }
//   // 選單購物車數字顯示
//   const cartCountElement = document.getElementById('cart-count');
//   cartCountElement.innerText = cart.length;
// }
