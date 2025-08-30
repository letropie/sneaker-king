(function(){
  const grid = document.getElementById('product-grid');
  const sortSelect = document.getElementById('sort-select');
  const filterPrice = document.querySelectorAll('[data-filter-price]');
  const filterCategory = document.querySelectorAll('[data-filter-category]');

  let active = [...window.PRODUCTS];

  function render(products){
    grid.innerHTML = '';
    products.forEach(p => {
      const col = document.createElement('div');
      col.className = 'col-12 col-sm-6 col-md-4 d-flex';
      col.innerHTML = `
        <a class="text-decoration-none text-dark w-100" href="product.html?id=${p.id}">
          <div class="product-card p-3 w-100">
            <img src="${p.image}" alt="${p.name}">
            <div class="mt-3">
              ${p.tag ? `<span class="badge badge-bestseller rounded-pill px-2 py-1">${p.tag}</span>` : ''}
              <h6 class="fw-semibold mt-2 mb-1">${p.name}</h6>
              <div class="d-flex justify-content-between align-items-center">
                <span class="text-muted">$${p.price}</span>
                <small class="text-muted">${p.colors} colours</small>
              </div>
            </div>
          </div>
        </a>
      `;
      grid.appendChild(col);
    });
  }

  function applyFilters(){
    const priceRanges = [...filterPrice].filter(cb=>cb.checked).map(cb=>cb.getAttribute('data-filter-price'));
    const categories = [...filterCategory].filter(cb=>cb.checked).map(cb=>cb.getAttribute('data-filter-category'));
    active = window.PRODUCTS.filter(p=>{
      let okPrice = true;
      if(priceRanges.length){
        okPrice = priceRanges.some(r=>{
          if(r==='under100') return p.price < 100;
          if(r==='100to200') return p.price >= 100 && p.price <= 200;
          if(r==='over200') return p.price > 200;
        });
      }
      let okCat = true;
      if(categories.length){
        okCat = categories.includes(p.category);
      }
      return okPrice && okCat;
    });
    applySort();
  }

  function applySort(){
    const val = sortSelect.value;
    const arr = [...active];
    if(val==='price-asc') arr.sort((a,b)=>a.price-b.price);
    if(val==='price-desc') arr.sort((a,b)=>b.price-a.price);
    if(val==='name-asc') arr.sort((a,b)=>a.name.localeCompare(b.name));
    render(arr);
  }

  function renderShop() {
    const products = window.PRODUCTS || [];
    const row = document.querySelector('.row.g-4');
    row.innerHTML = '';

    products.forEach(product => {
      const col = document.createElement('div');
      col.className = 'col-md-4';

      col.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="${product.img}" class="card-img-top" alt="${product.name}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${product.name}</h5>
            <div class="mb-2 text-muted">${product.tag || ''}</div>
            <div class="mb-3 fw-bold fs-5">$${product.price}</div>
            <div class="mt-auto d-grid gap-2">
              <a href="product.html?id=${product.id}" class="btn btn-outline-dark">View</a>
              <button class="btn btn-dark add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            </div>
          </div>
        </div>
      `;
      row.appendChild(col);
    });

    // Add to cart event listeners
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const prodId = parseInt(this.getAttribute('data-id'));
        const product = products.find(p => p.id === prodId);
        if (!product) return;

        let cart = [];
        try {
          cart = JSON.parse(localStorage.getItem('cart')) || [];
        } catch (e) {}

        // Check if product with same name exists
        const idx = cart.findIndex(item => item.name === product.name);
        if (idx > -1) {
          cart[idx].qty += 1;
        } else {
          cart.push({ ...product, qty: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} added to cart!`);
      });
    });
  }

  sortSelect.addEventListener('change', applySort);
  [...filterPrice, ...filterCategory].forEach(cb=>cb.addEventListener('change', applyFilters));

  render(active);
  window.addEventListener('DOMContentLoaded', renderShop);
})();
