document.addEventListener('DOMContentLoaded', function () {
  // 先抓一些 HTML 裡會用到的元素
  const cartSidebar = document.getElementById('cartSidebar'); // 側邊的購物車區塊
  const cartItemsList = document.getElementById('cartItemsList'); // 購物車清單
  const emptyCartMessage = document.getElementById('emptyCartMessage'); // "購物車空囉" 這段文字
  const cartItemTemplate = document.getElementById('cart-item-template'); // 每個商品的樣板
  const cartLinks = document.querySelectorAll('.cart-link'); // 點購物車圖示的按鈕（可能有多個）
  const addToCartBtn = document.getElementById('addToCartBtn'); // 加入購物車的按鈕（只有在商品頁會出現）

  // 如果這個頁面根本沒有購物車元素，下面的程式就不執行，避免報錯
  if (
    !cartSidebar ||
    !cartItemsList ||
    !emptyCartMessage ||
    !cartItemTemplate
  ) {
    return;
  }

  // 從 localStorage 拿購物車資料（用 JSON 格式存的）
  function getCartData() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }

  // 把購物車資料存進 localStorage
  function saveCartToLocalStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // 把購物車的內容畫到畫面上
  function renderCart() {
    const cart = getCartData();
    cartItemsList.innerHTML = ''; // 清空原本的列表

    const checkoutBtn = document.getElementById('checkoutBtn'); //結帳按鈕

    // 如果購物車是空的，就顯示「購物車空囉～」
    if (cart.length === 0) {
      emptyCartMessage.style.display = 'block';
      if (checkoutBtn) checkoutBtn.style.display = 'none'; //⬅️ 購物車空的時候隱藏按鈕
    } else {
      emptyCartMessage.style.display = 'none';
      if (checkoutBtn) checkoutBtn.style.display = 'inline-block'; //⬅️ 有商品就顯示按鈕
      // 把每個商品一個一個插進來（最新的會排最上面）
      cart
        .slice()
        .reverse()
        .forEach((item, index) => {
          const clone = cartItemTemplate.content.cloneNode(true); // 複製樣板
          clone.querySelector('.item-img').src = item.img;
          clone.querySelector('.item-img').alt = item.name;
          clone.querySelector('.item-name').textContent = item.name;
          clone.querySelector('.item-qty').textContent = `${item.quantity}x`;
          clone.querySelector('.item-price').textContent = item.price;
          clone
            .querySelector('.delete-btn')
            .setAttribute('data-index', cart.length - 1 - index);
          cartItemsList.appendChild(clone);
        });
    }

    // 更新購物車右上角的數字（商品總筆數）
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.innerText = cart.length;
  }

  // 如果這頁有「加入購物車」按鈕，就加事件監聽
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function () {
      const name = document.querySelector('.modal-title').innerText;
      const price = document.querySelector('.modal-price').innerText;
      let img = document.querySelector('.small-img')
        ? document.querySelector('.small-img').src
        : document.querySelector('.large-img').src;
      const qty = parseInt(document.getElementById('quantity').value);

      const product = { name, price, img, quantity: qty };

      const cart = getCartData();
      const existingProduct = cart.find(item => item.name === product.name);
      if (existingProduct) {
        existingProduct.quantity += qty; // 有的話就加數量
      } else {
        cart.push(product); // 沒有的話就新增
      }

      saveCartToLocalStorage(cart); // 存起來
      renderCart(); // 重新畫出來
      cartSidebar.classList.add('active'); // 打開側邊購物車
    });
  }

  // 點購物車圖示時，打開側邊購物車
  cartLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault(); // 阻止連結預設動作
      renderCart(); // 畫出購物車內容
      cartSidebar.classList.add('active'); // 打開側欄
    });
  });

  // 點擊非側邊欄/按鈕/購物車圖示時，就關掉購物車側欄
  document.addEventListener('click', function (event) {
    const sidebar = document.getElementById('cartSidebar');
    const isInsideSidebar = sidebar && sidebar.contains(event.target);
    const isAddToCartButton = event.target.closest('#addToCartBtn') !== null;
    const isCartLink = event.target.closest('#cartLink') !== null;

    if (isAddToCartButton || isCartLink) {
      // 顯示側邊欄
      event.preventDefault(); // 防止頁面跳轉
      sidebar?.classList.add('active');
      return; // ✅ 防止往下執行關閉邏輯
    }

    if (!isInsideSidebar) {
      // 點擊其他地方關掉
      sidebar?.classList.remove('active');
      console.log('移除');
    }
  });

  // 點垃圾桶就刪除該商品
  cartItemsList.addEventListener('click', function (e) {
    const deleteBtn = e.target.closest('.delete-btn');
    if (deleteBtn) {
      e.stopPropagation(); // 停止事件冒泡
      const index = parseInt(deleteBtn.getAttribute('data-index'));
      const cart = getCartData();
      cart.splice(index, 1); // 從陣列裡移除該項目
      saveCartToLocalStorage(cart);
      renderCart(); // 重新畫一次
    }
  });

  renderCart(); // 一開始就先把購物車畫出來（如果有資料的話）
});
