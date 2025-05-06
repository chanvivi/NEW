// ------- 放在最外面（全域）-------
function openModal(product) {
  quantity = 1;
  updateQuantityDisplay();

  const imgSrc = product.getAttribute('data-img');
  const name = product.getAttribute('data-name');
  const category = product.getAttribute('data-category');
  const description = product.getAttribute('data-description');
  const price = product.getAttribute('data-price');
  const productTxt = product.getAttribute('data-span');
  const spanContainer = document.querySelector('.data-span');

  // 更新大圖
  const largeImg = document.querySelector('.large-img');
  largeImg.src = imgSrc;
  console.log('largeImg 是否有抓到：', largeImg);

  // 更新文字內容
  spanContainer.innerHTML = '';
  const items = productTxt.split('\n');
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.trim();
    spanContainer.appendChild(li);
  });

  // 更新小圖區域
  const thumbnailsContainer = document.querySelector('.thumbnails');
  thumbnailsContainer.innerHTML = '';
  const thumbs = product.getAttribute('data-thumbs');
  if (thumbs) {
    thumbs.split(',').forEach((thumbSrc, index) => {
      const thumbImg = document.createElement('img');
      thumbImg.src = thumbSrc.trim();
      thumbImg.alt = `小圖${index + 1}`;
      thumbImg.classList.add('small-img', 'thumbnail');
      if (index === 0) thumbImg.classList.add('active');

      // 點小圖換大圖
      thumbImg.addEventListener('click', () => {
        largeImg.src = thumbSrc.trim();
        document
          .querySelectorAll('.thumbnail')
          .forEach(img => img.classList.remove('active'));
        thumbImg.classList.add('active');
      });

      thumbnailsContainer.appendChild(thumbImg);
    });
  }

  // 更新其他 modal 資料
  document.querySelector('.modal-title').innerText = name;
  document.querySelector('.modal-category').innerText = `分類：${category}`;
  document.querySelector('.modal-description').innerText = description;
  document.querySelector('.modal-price').innerText = `${price}`;

  document.getElementById('productModal').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('productModal').classList.remove('show');
  document.body.style.overflow = 'auto';
}

// 初始化卡片點擊事件
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function () {
      openModal(this);
    });
  });
});
