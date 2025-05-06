// 頁面一打開就更新購物車的小紅圈數字
document.addEventListener('DOMContentLoaded', function () {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCountElement = document.getElementById('cart-count');

  // 更新購物車數字顯示
  if (cartCountElement) {
    cartCountElement.innerText = cart.length;

    // 顯示紅圈，避免閃爍
    cartCountElement.style.display = 'inline-block';
  }
});
