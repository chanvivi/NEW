
function openModal(product) {

    // 每次打開 modal，數量重置，剩餘程式碼請看js/increaseQuantity.js
    quantity = 1;
    quantityDisplay.textContent = quantity;


    // 取得所有資料
    const imgSrc = product.getAttribute('data-img');
    const name = product.getAttribute('data-name');
    const category = product.getAttribute('data-category');
    const description = product.getAttribute('data-description');
    const price = product.getAttribute('data-price');
    const productTxt = product.getAttribute('data-span');
  
    // 放到 modal 中
    document.querySelector('.large-img').src = imgSrc;
    document.querySelector('.modal-title').innerText = name;
    document.querySelector('.modal-category').innerText = `分類：${category}`;
    document.querySelector('.modal-description').innerText = description;
    document.querySelector('.modal-price').innerText = `${price}`;
    document.querySelector('.data-span').innerText = productTxt;

  
    // 顯示 modal
    document.getElementById("productModal").classList.add("show");
    document.body.style.overflow = "hidden";
  }
  
  function closeModal() {
    document.getElementById("productModal").classList.remove("show");
    document.body.style.overflow = "auto";
  }
  

  document.addEventListener("DOMContentLoaded", function () {
    const modal = document.querySelector('#productModal');
    const largeImg = modal.querySelector('.large-img');

  
    // 當你點擊產品卡片時再觸發以下邏輯 解決大圖問題
    document.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', function () {
        const imgSrc = this.querySelector('img').src;
        largeImg.src = imgSrc;
        modal.classList.remove('hidden');
      });
    });
  });
