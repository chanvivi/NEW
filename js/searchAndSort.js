// 商品搜尋與分類過濾功能

const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const productCards = document.querySelectorAll('.product-card');

function filterProducts() {
  const keyword = searchInput.value.toLowerCase();
  const category = categoryFilter.value;

  productCards.forEach(card => {
    const name = card.dataset.name.toLowerCase();
    const cat = card.dataset.category;

    const matchesKeyword = name.includes(keyword);
    const matchesCategory = category === 'all' || category === cat;

    if (matchesKeyword && matchesCategory) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

searchInput.addEventListener('input', filterProducts);
categoryFilter.addEventListener('change', filterProducts);
