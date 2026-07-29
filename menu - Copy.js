// menu.js - FastFood Jalaun Menu Logic
// ✅ Production Ready - Cart Sync + HD Images + Mobile Toasts + Error Handling
// January 2026 - Jalaun Street Food Ready!

const menuItems = [
  {id:1, name:'Chicken Biryani', price:120, img:'Chicken Biryani.jpg'},
  {id:2, name:'Veg Samosa (2pcs)', price:40, img:'veg samosa.jpg'},
  {id:3, name:'Paneer Tikka', price:150, img:'paneer tikka.jpg'},
  {id:4, name:'Chicken Roll', price:80, img:'Chicken Roll.jpg'},
  {id:5, name:'Aloo Tikki', price:30, img:'aloo tikki.jpg'},
  {id:6, name:'Pani Puri (8pcs)', price:35, img:'pani puri.jpg'},
  {id:7, name:'Butter Chicken', price:180, img:'butter chicken.jpg'},
  {id:8, name:'Dosa', price:60, img:'dosa.jpg'},
  {id:9, name:'Chicken 65', price:140, img:'chicken 65.jpg'},
  {id:10, name:'Idli Sambhar', price:50, img:'Idli sambhar.jpg'},
  {id:11, name:'Mutton Biryani', price:200, img:'Mutton bir.jpg'},
  {id:12, name:'cold coffee', price:15, img:'cold coffee.jpg'}
];

function renderMenu() {
  const grid = document.getElementById('menu-grid');
  if (!grid) return console.error('Menu grid not found');
  
  grid.innerHTML = menuItems.map(item => `
    <div class="food-card">
      <img src="${item.img}" alt="${item.name}" class="food-img" loading="lazy" onerror="this.src='https://via.placeholder.com/400x200/ddd?text=${encodeURIComponent(item.name)}'">
      <div class="food-info">
        <h3 class="food-name">${item.name}</h3>
        <div class="food-price">₹${item.price}</div>
        <button class="add-btn" onclick="addToCart(${item.id})">
          🛒 Add to Cart
        </button>
      </div>
    </div>
  `).join('');
}

function addToCart(id) {
  try {
    const item = menuItems.find(i => i.id === id);
    if (!item) return console.error('Item not found:', id);
    
    let cart = JSON.parse(localStorage.getItem('fastfood_cart') || '[]');
    const existing = cart.find(c => c.id === id);
    
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({...item, quantity: 1});
    }
    
    localStorage.setItem('fastfood_cart', JSON.stringify(cart));
    
    // Trigger cart update across tabs
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    
    // Success toast notification
    showToast(`✅ ${item.name} added to cart!`);
    
  } catch (error) {
    console.error('Add to cart error:', error);
    showToast('❌ Error adding item. Try again.', true);
  }
}

function showToast(message, isError = false) {
  const toast = document.createElement('div');
  toast.textContent = message;
  Object.assign(toast.style, {
    position: 'fixed',
    top: '80px',
    right: '20px',
    background: isError ? 'rgba(244,67,54,0.95)' : 'rgba(76,175,80,0.95)',
    color: 'white',
    padding: '1rem 1.5rem',
    borderRadius: '25px',
    zIndex: '9999',
    fontWeight: '500',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
    transform: 'translateX(400px)',
    transition: 'transform 0.3s ease'
  });
  
  document.body.appendChild(toast);
  setTimeout(() => toast.style.transform = 'translateX(0)', 10);
  
  setTimeout(() => {
    toast.style.transform = 'translateX(400px)';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// Listen for cart updates (cross-tab sync)
window.addEventListener('storage', () => {
  if (window.NavManager) {
    new window.NavManager().updateCartCount();
  }
});

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  renderMenu();
  // Trigger initial cart count update
  if (window.NavManager) {
    new window.NavManager().updateCartCount();
  }
});
