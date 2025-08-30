(function(){
  window.addEventListener('DOMContentLoaded', function() {
    // Get product id from URL
    const params = new URLSearchParams(window.location.search);
    const prodId = parseInt(params.get('id'));

    // Find product from PRODUCTS in data.js
    const product = (window.PRODUCTS || []).find(p => p.id === prodId);

    if (!product) {
      document.querySelector('main.container').innerHTML = '<div class="alert alert-danger">Product not found.</div>';
      return;
    }

    // Render product details
    const main = document.querySelector('main.container');
    main.innerHTML = `
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="shop.html">Shop</a></li>
          <li class="breadcrumb-item active" aria-current="page">${product.name}</li>
        </ol>
      </nav>
      <div class="row g-4">
        <div class="col-lg-6">
          <img src="${product.img}" alt="${product.name}" class="img-fluid rounded shadow-sm">
        </div>
        <div class="col-lg-6">
          <h2 id="prod-name">${product.name}</h2>
          <div class="mb-2 text-muted">${product.tag || ''}</div>
          <div class="mb-3 fw-bold fs-4" id="prod-price">$${product.price}</div>
          <div class="d-grid d-sm-flex gap-2">
            <button class="btn btn-dark btn-lg" id="add-to-cart">Add to cart</button>
            <a class="btn btn-outline-dark btn-lg" href="shop.html">Back to shop</a>
            <a class="btn btn-success btn-lg" href="contact.html" id="go-to-contact" style="display:none;">Go to Contact & Order</a>
          </div>
        </div>
      </div>
      <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
        <div id="toast" class="toast align-items-center text-white bg-success border-0" role="alert"></div>
      </div>
    `;

    // Add to cart logic
    document.getElementById('add-to-cart').addEventListener('click', function() {
      let cart = [];
      try {
        cart = JSON.parse(localStorage.getItem('cart')) || [];
      } catch (e) {}

      const idx = cart.findIndex(item => item.name === product.name);
      if (idx > -1) {
        cart[idx].qty += 1;
      } else {
        cart.push({ ...product, qty: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));

      // Show toast
      const toastEl = document.getElementById('toast');
      toastEl.textContent = `${product.name} added to cart!`;
      toastEl.classList.add('show');
      setTimeout(() => toastEl.classList.remove('show'), 2000);

      // Show "Go to Contact & Order" button
      document.getElementById('go-to-contact').style.display = 'inline-block';
    });

    // Show "Go to Contact & Order" if cart has items
    let cart = [];
    try {
      cart = JSON.parse(localStorage.getItem('cart')) || [];
    } catch (e) {}
    if (cart.length > 0) {
      document.getElementById('go-to-contact').style.display = 'inline-block';
    }
  });
})();
