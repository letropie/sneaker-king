/**
 * Central product list so all pages stay in sync.
 * Add fields as needed (id, name, brand, price, colors, tags, images).
 */
window.PRODUCTS = [
  {
    id: 1,
    name: "Nike Air Max 270",
    price: 120,
    img: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/AIR+MAX+270.png",
    tag: "Best Seller"
  },
  {
    id: 2,
    name: "Adidas Ultraboost",
    price: 140,
    img: "https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/a74dde047a96470988501ad069f62e2e_9366/ultraboost-5-strung-shoes.jpg",
    tag: "New Arrival"
  },
  {
    id: 3,
    name: "Puma RS-X",
    price: 110,
    img: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/390776/01/sv01/fnd/EEA/fmt/png/RS-X-Efekt-PRM-Sneakers",
    tag: "Trending"
  },
  {
    id: 4,
    name: "New Balance 574",
    price: 100,
    img: "https://www.newbalance.com/dw/image/v2/AAGI_PRD/on/demandware.static/-/Library-Sites-NBUS-NBCA/default/dw4cf2eab6/images/page-designer/2025/Wayfinding/NB-4905_Multi_Tile_574M.jpg",
    tag: "Classic"
  },
  {
    id: 5,
    name: "Converse Chuck Taylor",
    price: 80,
    img: "assets/img/chucktaylor.jpg",
    tag: "Icon"
  },
  {
    id: 6,
    name: "Vans Old Skool",
    price: 75,
    img: "assets/img/oldskool.jpg",
    tag: "Popular"
  },
  {
    id: 7,
    name: "Reebok Club C",
    price: 90,
    img: "assets/img/clubc.jpg",
    tag: "Classic"
  },
  {
    id: 8,
    name: "Jordan 1 Mid",
    price: 150,
    img: "assets/img/jordan1mid.jpg",
    tag: "Hot"
  },
  {
    id: 9,
    name: "Asics Gel-Lyte III",
    price: 105,
    img: "assets/img/gellyte3.jpg",
    tag: "Comfort"
  },
  {
    id: 10,
    name: "Saucony Jazz Original",
    price: 95,
    img: "assets/img/jazzoriginal.jpg",
    tag: "Retro"
  }
];

/**
 * Render featured products from data.js
 */
window.addEventListener('DOMContentLoaded', function() {
  const products = window.PRODUCTS || [];
  // Example: show first 3 products as featured
  const featured = products.slice(0, 3);
  const row = document.getElementById('featured-products');
  row.innerHTML = '';
  featured.forEach(product => {
    const col = document.createElement('div');
    col.className = 'col-md-4';
    const productLink = `product.html?id=${product.id}`;
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <a href="${productLink}">
          <img src="${product.img}" class="card-img-top" alt="${product.name}">
        </a>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${product.name}</h5>
          <div class="mb-2 text-muted">${product.tag || ''}</div>
          <div class="mb-3 fw-bold fs-5">$${product.price}</div>
          <div class="mt-auto d-grid gap-2">
            <a href="${productLink}" class="btn btn-outline-dark">View</a>
            <button class="btn btn-dark add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
    row.appendChild(col);
  });

  // Add to cart event listeners for featured
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const prodId = parseInt(this.getAttribute('data-id'));
      const product = products.find(p => p.id === prodId);
      if (!product) return;

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
      // Simple feedback
      alert(`${product.name} added to cart!`);
    });
  });
});
