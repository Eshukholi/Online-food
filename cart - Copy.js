// Fast Food Jalaun - COMPLETE MENU JavaScript 2026 (menu.js)
// ✅ Add to Cart + Quantity + Cart Count + Toast + Filter + Search + Production Ready

class MenuManager {
  constructor() {
    this.menuItems = [
      { id:1, name:'Cheese Burger', price:99, img:'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300', type:'nonveg' },
      { id:2, name:'Veg Burger', price:79, img:'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300', type:'veg' },
      { id:3, name:'Chicken Pizza', price:199, img:'https://images.unsplash.com/photo-1542994980-2e095c5a832f?w=300', type:'nonveg' },
      { id:4, name:'Cold Drink', price:49, img:'https://images.unsplash.com/photo-1572499299753-08e1f9648e97?w=300', type:'drink' },
      { id:5, name:'French Fries', price:89, img:'https://images.unsplash.com/photo-1579631623459-7a267d7e5774?w=300', type:'veg' },
      { id:6, name:'Paneer Roll', price:129, img:'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300', type:'veg' },
      { id:7, name:'Chicken Nuggets', price:149, img:'https://images.unsplash.com/photo-1603048297194-8f7d9e7f8a5e?w=300', type:'nonveg' },
      { id:8, name:'Oreo Shake', price:119, img:'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300', type:'drink' }
    ];
    
    this.init();
  }
  
  init() {
    this.renderMenu();
    this.updateCartCount();
    this.bindEvents();
  }
  
  renderMenu(items = this.menuItems) {
    const grid = document.getElementById('menu-grid');
    if (!grid) return;
    
    grid.innerHTML = items.map(item => `
      <div class="menu-item" data-id="${item.id}">
        <img src="${item.img}" alt="${item.name}" loading="lazy">
        <h3>${item.name}</h3>
        <div class="price">₹${item.price}</div>
        <button class="add-cart-btn" onclick="menuManager.addToCart(${item.id})">
          <i class="bx bx-cart-add"></i> Add to Cart
        </button>
      </div>
    `).join('');
  }
  
  addToCart(id) {
    const item = this.menuItems.find(m => m.id === id);
    if (!item) return;
    
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    const existing = cart.find(c => c.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    this.updateCartCount();
    this.showToast(`✅ ${item.name} added! (${cart.reduce((sum,c)=>sum+c.quantity,0)} items)`);
  }
  
  updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const countEl = document.getElementById('cart-count');
    if (countEl) {
      countEl.textContent = count;
      countEl.style.display = count ? 'inline' : 'none';
    }
  }
  
  showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.cssText = `
      position:fixed; top:20px; right:20px; background:#00b894; color:white; 
      padding:15px 25px; border-radius:8px; z-index:9999; font-weight:bold;
      animation: slideIn 0.3s ease-out;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
    
    const style = document.createElement('style');
    style.textContent = `@keyframes slideIn { from { transform:translateX(100%); opacity:0; } to { transform:translateX(0); opacity:1; } }`;
    document.head.appendChild(style);
  }
  
  bindEvents() {
    // Search
    const searchInput = document.getElementById('menu-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = this.menuItems.filter(item => 
          item.name.toLowerCase().includes(term)
        );
        this.renderMenu(filtered);
      });
    }
    
    // Filters (if present)
    document.querySelectorAll('.filter-btn')?.forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.filter;
        const filtered = type === 'all' ? 
          this.menuItems : 
          this.menuItems.filter(item => item.type === type);
        this.renderMenu(filtered);
      });
    });
  }
}

// Global access
document.addEventListener('DOMContentLoaded', () => {
  window.menuManager = new MenuManager();
});
