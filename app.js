document.addEventListener('DOMContentLoaded', () => {

  // ---- NAVIGATION LOGIC ----
  const screens = {
    'welcome-screen': document.getElementById('welcome-screen'),
    'brand-screen': document.getElementById('brand-screen'),
    'location-screen': document.getElementById('location-screen'),
    'products-screen': document.getElementById('products-screen'),
    'detail-screen': document.getElementById('detail-screen')
  };

  function navigateTo(targetId) {
    // Hide all
    Object.values(screens).forEach(screen => {
      screen.classList.remove('active');
    });
    // Show target
    if (screens[targetId]) {
      screens[targetId].classList.add('active');
    }
  }

  // Bind Buttons
  document.getElementById('btn-explore').addEventListener('click', () => navigateTo('brand-screen'));
  document.getElementById('btn-products').addEventListener('click', () => navigateTo('products-screen'));

  // Bind Location Map
  const btnLocation = document.getElementById('btn-location');
  if (btnLocation) {
    btnLocation.addEventListener('click', () => navigateTo('location-screen'));
  }

  document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget.getAttribute('data-target');
      navigateTo(target);
      
      // Reset Light to OFF if leaving detail screen
      if (target === 'products-screen') {
        setLight(false);
      }
    });
  });

  // ---- PRODUCTS DATA ----
  // Updated with the new sets of lights
  const products = [
    { id: 1, name: "Dual Wood Pendant", img: "images/product1.jpg", desc: "Elegant matching double wooden pendants with large diffused glass bulbs. Perfect for dining areas." },
    { id: 2, name: "Rectangular Strip Light", img: "images/product2.jpg", desc: "A sleek, long wooden profile with an embedded LED strip giving a modern aesthetic." },
    { id: 3, name: "Pointed Bead Wood Pendant", img: "images/product3.jpg", desc: "A beautifully crafted artistic stacked bead wooden pendant with an exposed filament." },
    { id: 4, name: "Round Profile Light", img: "images/product4.png", desc: "Minimalist rounded wooden profile suspended elegantly, providing intense linear illumination." },
    { id: 5, name: "Round Profile Angled", img: "images/product5.png", desc: "Another view of our iconic rounded wooden strip light showcasing premium wood grain." },
    { id: 6, name: "Timber Bead Pendant", img: "images/product6.png", desc: "A beautiful layered wooden bead pendant light hanging elegantly." },
    { id: 7, name: "Spiral Wood Bulb", img: "images/product7.png", desc: "A cozy spiral patterned wooden light fixture over a filament bulb." },
    { id: 8, name: "Layered Wood Pendant", img: "images/product8.png", desc: "Modern layered wood design with a warm exposed bulb." },
    { id: 9, name: "Tri-Pendant Wood Lights", img: "images/product9.png", desc: "A set of three distinct geometric wooden pendant lights hanging in harmony." },
    { id: 10, name: "Modern Wood Disc Pendant", img: "images/product10.png", desc: "A sleek, minimalistic wooden disc pendant surrounding a frosted globe." }
  ];

  // Render Product Grid
  const productGrid = document.getElementById('productGrid');
  
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}" class="product-img" onerror="this.src='https://via.placeholder.com/150/1a1818/ff9900/?text=Image'">
      <div class="product-name">${product.name}</div>
      <div class="view-product-btn">See Product</div>
    `;
    
    // Open detail screen on click
    card.addEventListener('click', () => {
      openDetailScreen(product);
    });

    productGrid.appendChild(card);
  });

  // ---- DETAIL SCREEN LOGIC ----

  function openDetailScreen(product) {
    document.getElementById('detailTitle').textContent = product.name;
    document.getElementById('detailDesc').textContent = product.desc;
    
    // Set Image
    const detailImg = document.getElementById('detailImage');
    detailImg.src = product.img;
    detailImg.onerror = function() {
      this.src = 'https://via.placeholder.com/400x500/1a1818/ff9900/?text=Image+Needed';
    };

    setLight(false);
    navigateTo('detail-screen');
  }

  // Two Option Logic (Light ON / OFF)
  const btnLightOn = document.getElementById('btn-light-on');
  const btnLightOff = document.getElementById('btn-light-off');
  const detailImg = document.getElementById('detailImage');
  const detailGlow = document.getElementById('detailGlow');

  btnLightOn.addEventListener('click', () => setLight(true));
  btnLightOff.addEventListener('click', () => setLight(false));

  function setLight(isOn) {
    if (isOn) {
      detailImg.classList.add('light-on');
      detailGlow.classList.add('active');
      btnLightOn.classList.add('active-on');
      btnLightOn.classList.remove('active-off');
      btnLightOff.classList.remove('active-off');
      btnLightOff.classList.add('ctrl-btn');
    } else {
      detailImg.classList.remove('light-on');
      detailGlow.classList.remove('active');
      btnLightOn.classList.remove('active-on');
      btnLightOff.classList.add('active-off');
    }
  }

});
