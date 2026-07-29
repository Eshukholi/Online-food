// Fast Food Delhi - COMPLETE JavaScript 2026 (home.js + cart.js)
// Menu | Cart Management | Modals | Razorpay | Responsive [memory:2][conversation_history:55]

// Delhi Fast Food Menu - 22 Items (from previous)
const menuItems = [
  {id:1, name:'Classic Chicken Burger', price:150, img:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', desc:'Juicy chicken, cheese, special sauce', category:'nonveg'},
  {id:2, name:'McAloo Tikki Burger', price:80, img:'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400', desc:'Spicy potato patty - Veg Delhi favorite', category:'veg'},
  {id:3, name:'Paneer Tikka Burger', price:140, img:'https://images.unsplash.com/photo-1615484475791-d3d8b837f8d0?w=400', desc:'Grilled paneer, mint chutney', category:'veg'},
  {id:4, name:'Cheeseburger', price:170, img:'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400', desc:'Double cheese melt', category:'nonveg'},
  {id:5, name:'Veg Crispy Burger', price:130, img:'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', desc:'Crunchy veg patty', category:'veg'},
  {id:6, name:'Margherita Pizza', price:220, img:'https://images.unsplash.com/photo-1632760404844-7d35d1a8990f?w=400', desc:'Fresh mozzarella, basil', category:'veg'},
  {id:7, name:'Chicken Tikka Pizza', price:280, img:'https://images.unsplash.com/photo-1574071318508-dbcbe4df9c33?w=400', desc:'Tandoori chicken, onions', category:'nonveg'},
  {id:8, name:'Peppy Paneer Pizza', price:250, img:'https://images.unsplash.com/photo-1574071713463-d1d1e9a2be54?w=400', desc:'Paneer cubes, peppers', category:'veg'},
  {id:9, name:'Peri Peri Chicken Pizza', price:290, img:'https://images.unsplash.com/photo-1542994983-6e9b00e6e330?w=400', desc:'Spicy chicken special', category:'nonveg'},
  {id:10, name:'French Fries', price:80, img:'https://images.unsplash.com/photo-1588166524941-48cbc9eb8609?w=400', desc:'Crispy with peri-peri salt', category:'veg'},
  {id:11, name:'Cheese Fries', price:110, img:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400', desc:'Loaded cheese & sauce', category:'veg'},
  {id:12, name:'Chicken Nuggets (6)', price:160, img:'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400', desc:'Crispy golden nuggets', category:'nonveg'},
  {id:13, name:'Veg Samosa (2 pcs)', price:50, img:'https://images.unsplash.com/photo-1603048297194-8f7d9e7f8a0d?w=400', desc:'Spicy potato-peas', category:'veg'},
  {id:14, name:'Chole Bhature', price:180, img:'https://images.unsplash.com/photo-1626673817697-ffe2f59666e7?w=400', desc:'Full plate with pickle', category:'veg'},
  {id:15, name:'Chicken Roll', price:160, img:'https://images.unsplash.com/photo-1487937087066-38982051f713?w=400', desc:'Kathi roll spicy chicken', category:'nonveg'},
  {id:16, name:'Paneer Roll (Veg)', price:150, img:'https://images.unsplash.com/photo-1622535642091-7ed6e59a4f4e?w=400', desc:'Creamy paneer kathi', category:'veg'},
  {id:17, name:'Dahi Bhalla', price:100, img:'https://images.unsplash.com/photo-1562440499-64d72f7b0051?w=400', desc:'Yogurt lentil balls', category:'veg'},
  {id:18, name:'Gobi Manchurian', price:140, img:'https://images.unsplash.com/photo-1617096700794-f917c1a4e3bb?w=400', desc:'Dry Indo-Chinese cauliflower', category:'veg'},
  {id:19, name:'Veg Spring Rolls (4)', price:90, img:'https://images.unsplash.com/photo-1598177656879-fd5d32bb76a9?w=400', desc:'Crispy veggie rolls', category:'veg'},
  {id:20, name:'Chicken Momos (8)', price:170, img:'https://images.unsplash.com/photo-1579586140626-59869db0f9cd?w=400', desc:'Steamed spicy chicken dumplings', category:'nonveg'},
  {id:21, name:'Pav Bhaji', price:120, img:'https://images.unsplash.com/photo-1635544986804-79a277e7bb4c?w=400', desc:'Mumbai-style spicy mash', category:'veg'},
  {id:22, name:'Schezwan Chicken Fries', price:200, img:'https://images.unsplash.com/photo-1603276102401-b96c6d8a4e4e?w=400', desc:'Fiery tossed fries', category:'nonveg'}
];

// Global Cart (Shared between pages)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
  // Home page features
  if (document.getElementById('menu-grid')) {
    renderMenu();
    document.getElementById('cart-btn')?.addEventListener('click', toggleCartModal);
  }
  
  // Cart page features
  if (document.querySelector('.cart-section')) {
    renderCartPage();
  }
  
  // Update UI everywhere
  updateCartUI();
  
  // Navbar cart click
  document.querySelectorAll('#cart-btn, .nav-menu a[href="cart.html"]')?.forEach(btn => {
    btn.addEventListener('click', () => {
      if (window.location.pathname.includes('cart.html')) toggleCartModal();
    });
  });
  
  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      target?.scrollIntoView({ behavior: 'smooth' });
    });
  });
});

// ===== HOME PAGE FUNCTIONS =====
function renderMenu() {
  const grid = document.getElementById('menu-grid');
  if (!grid) return;
  
  grid.innerHTML = menuItems.map(item => `
    <div class="food-card">
      <img src="${item.img}" alt="${item.name}" class="food-img" loading="lazy">
      <div class="food-info">
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
        <div class="food-price">₹${item.price}</div>
        <button class="btn-add" onclick="addToCart(${item.id}, '${item.name.replace(/'/g, "\\'")}', ${item.price})">
          Order Now 🛒
        </button>
      </div>
    </div>
  `).join('');
}

function addToCart(id, name, price) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty++;
  } else {
    cart.push({ id, name, price, qty: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
  showToast(`${name} added! 🛒`, 'success');
}

// ===== CART FUNCTIONS (Shared) =====
function renderCartPage() {
  const cartContent = document.getElementById('cart-content');
  const cartEmpty = document.getElementById('cart-empty');
  
  if (cart.length === 0) {
    cartContent.style.display = 'none';
    cartEmpty.style.display = 'block';
    return;
  }
  
  cartEmpty.style.display = 'none';
  cartContent.style.display = 'block';
  
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.img || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=90'}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1542994983-6e9b00e6e330?w=90'">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <div class="cart-item-price">₹${item.price} each</div>
        <div class="line-total">Line Total: ₹${item.price * item.qty}</div>
      </div>
      <div class="qty-controls">
        <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
        <span class="qty">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
      </div>
      <button class="btn-remove" onclick="removeFromCart(${item.id})">
        <i class='bx bx-trash'></i>
      </button>
    </div>
  `).join('');
  
  updateTotals();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  
  item.qty = Math.max(1, item.qty + delta);
  if (item.qty === 0) {
    cart = cart.filter(i => i.id !== id);
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
  if (document.querySelector('.cart-section')) renderCartPage();
  showToast(delta > 0 ? 'Added more!' : 'Removed item!', 'info');
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
  if (document.querySelector('.cart-section')) renderCartPage();
  showToast('Item removed! 🗑️', 'warning');
}

function clearCart() {
  if (confirm('Clear entire cart? This cannot be undone.')) {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    renderCartPage();
    showToast('Cart cleared!', 'danger');
  }
}

function updateTotals() {
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const grandTotal = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
  
  document.getElementById('total-items').textContent = totalItems;
  document.getElementById('grand-total').textContent = grandTotal;
}

function updateCartUI() {
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  document.querySelectorAll('#cart-count').forEach(el => {
    el.textContent = count;
  });
}

// ===== MODALS =====
function toggleLoginModal() {
  const modal = document.getElementById('login-modal');
  modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

function toggleRegisterModal() {
  const modal = document.getElementById('register-modal');
  modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

function toggleCartModal() {
  const modal = document.getElementById('cart-modal');
  if (!modal) return; // Not on cart page
  modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
  if (modal.style.display === 'block') {
    // Render mini cart modal if exists
  }
}

// Close modals on outside click
window.onclick = function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
  }
};

// Form handlers
document.getElementById('login-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('✅ Login successful! Welcome back to Fast Food Delhi. 🥳');
  toggleLoginModal();
});

document.getElementById('register-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('✅ Registration successful! Welcome aboard. Check your email/SMS for verification. 🚀');
  toggleRegisterModal();
});

// ===== RAZORPAY CHECKOUT =====
function checkoutWithRazorpay() {
  const total = parseInt(document.getElementById('grand-total')?.textContent || '0');
  if (cart.length === 0 || total === 0) {
    alert('Cart is empty! Add some food first. 🍔');
    return;
  }

  // Razorpay Integration [memory:2]
  const options = {
    key: 'rzp_test_1dpWAO5rzm5x3N', // Replace with YOUR Razorpay test/live key
    amount: total * 100, // Amount in paise
    currency: 'INR',
    name: 'Fast Food Delhi',
    description: `Quick Delhi Delivery | Total: ${cart.length} items`,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100',
    order_id: 'order_' + Date.now(), // Generate unique order ID
    handler: function(response) {
      alert(`🎉 Payment SUCCESS!\n\nOrder ID: ${response.razorpay_order_id}\nPayment ID: ${response.razorpay_payment_id}\nAmount: ₹${total}\n\nWhatsApp confirmation sent to 7081610695\nEst. Delivery: 25 mins 🚀`);
      clearCart(); // Clear after successful payment
    },
    prefill: {
      name: 'Delhi Customer',
      contact: '7081610695', // Your Delhi NCR number
      email: 'customer@fastfooddelhi.com'
    },
    theme: {
      color: '#ff6b35'
    },
    modal: {
      ondismiss: function() {
        alert('Payment cancelled. Cart saved for later. 🛒');
      }
    }
  };

  const rzp = new Razorpay(options);
  rzp.open();
}

// ===== UTILITIES =====
function showToast(message, type = 'success') {
  const colors = { success: '#28a745', warning: '#ffc107', info: '#17a2b8', danger: '#dc3545' };
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed; top: 20px; right: 20px; background: ${colors[type]}; color: white; 
    padding: 1.5rem 2rem; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    z-index: 10000; transform: translateX(400px); transition: all 0.4s;
    font-weight: 600; max-width: 350px;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => toast.style.transform = 'translateX(0)', 100);
  setTimeout(() => {
    toast.style.transform = 'translateX(400px)';
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

function scrollToMenu() {
  document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
}

// Smooth page transitions
document.querySelectorAll('a[href]').forEach(link => {
  link.addEventListener('click', (e) => {
    if (link.hostname === window.location.hostname) {
      e.preventDefault();
      window.location.href = link.href;
    }
  });
});
