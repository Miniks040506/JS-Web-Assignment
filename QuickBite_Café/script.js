'use strict';

const body = document.body;
const themeBtn = document.querySelector('#theme-btn');
const themeIcon = document.querySelector('#theme-icon');
const heroItemCount = document.querySelector('#hero-item-count');
const searchInput = document.querySelector('#search-input');
const sortSelect = document.querySelector('#sort-select');
const categoryFilters = document.querySelector('#category-filters');
const menuResultMessage = document.querySelector('#menu-result-message');
const menuGrid = document.querySelector('#menu-grid');
const menuEmpty = document.querySelector('#menu-empty');
const resetMenuBtn = document.querySelector('#reset-menu-btn');
const countAll = document.querySelector('#count-all');
const countCoffee = document.querySelector('#count-coffee');
const countTea = document.querySelector('#count-tea');
const countFood = document.querySelector('#count-food');
const countDessert = document.querySelector('#count-dessert');

const cartCount = document.querySelector('#cart-count');
const clearCartBtn = document.querySelector('#clear-cart-btn');
const cartEmpty = document.querySelector('#cart-empty');
const cartList = document.querySelector('#cart-list');
const promoInput = document.querySelector('#promo-input');
const applyPromoBtn = document.querySelector('#apply-promo-btn');
const promoMessage = document.querySelector('#promo-message');
const subtotalValue = document.querySelector('#subtotal-value');
const discountValue = document.querySelector('#discount-value');
const serviceValue = document.querySelector('#service-value');
const totalValue = document.querySelector('#total-value');
const checkoutBtn = document.querySelector('#checkout-btn');

const historyCount = document.querySelector('#history-count');
const historyItems = document.querySelector('#history-items');
const historyRevenue = document.querySelector('#history-revenue');
const historyList = document.querySelector('#history-list');
const historyEmpty = document.querySelector('#history-empty');

const modalOverlay = document.querySelector('#modal-overlay');
const checkoutModal = document.querySelector('#checkout-modal');
const modalCloseBtn = document.querySelector('#modal-close-btn');
const modalCancelBtn = document.querySelector('#modal-cancel-btn');
const modalItemCount = document.querySelector('#modal-item-count');
const checkoutItems = document.querySelector('#checkout-items');
const customerName = document.querySelector('#customer-name');
const orderType = document.querySelector('#order-type');
const orderNote = document.querySelector('#order-note');
const noteCount = document.querySelector('#note-count');
const checkoutError = document.querySelector('#checkout-error');
const modalTotalValue = document.querySelector('#modal-total-value');
const placeOrderBtn = document.querySelector('#place-order-btn');
const toast = document.querySelector('#toast');

// Application data
let menuItems = [
  { id: 1, name: 'Caramel Cloud Latte', category: 'coffee', price: 5.8, emoji: '☕', description: 'Espresso, milk and caramel foam.', rating: 4.9, popular: true, stock: 8 },
  { id: 2, name: 'Classic Cappuccino', category: 'coffee', price: 4.6, emoji: '☕', description: 'Espresso with silky milk and airy foam.', rating: 4.8, popular: true, stock: 10 },
  { id: 3, name: 'Iced Americano', category: 'coffee', price: 3.9, emoji: '🧋', description: 'Double espresso over ice and chilled water.', rating: 4.6, popular: false, stock: 12 },
  { id: 4, name: 'Hazelnut Cold Brew', category: 'coffee', price: 5.2, emoji: '🥤', description: 'Slow-steeped coffee with hazelnut cream.', rating: 4.7, popular: false, stock: 6 },
  { id: 5, name: 'Peach Jasmine Tea', category: 'tea', price: 4.4, emoji: '🍑', description: 'Jasmine tea with peach and ice.', rating: 4.8, popular: true, stock: 9 },
  { id: 6, name: 'Matcha Milk Tea', category: 'tea', price: 5.1, emoji: '🍵', description: 'Earthy matcha whisked with fresh milk.', rating: 4.7, popular: false, stock: 7 },
  { id: 7, name: 'Honey Lemon Tea', category: 'tea', price: 4.0, emoji: '🍋', description: 'Black tea, lemon and a touch of honey.', rating: 4.5, popular: false, stock: 11 },
  { id: 8, name: 'Avocado Toast', category: 'food', price: 7.2, emoji: '🥑', description: 'Sourdough, avocado, herbs and chili.', rating: 4.8, popular: true, stock: 5 },
  { id: 9, name: 'Ham & Cheese Croissant', category: 'food', price: 6.4, emoji: '🥐', description: 'Buttery croissant with ham and cheese.', rating: 4.7, popular: false, stock: 6 },
  { id: 10, name: 'Chicken Pesto Sandwich', category: 'food', price: 7.8, emoji: '🥪', description: 'Chicken, pesto, tomato and mozzarella.', rating: 4.6, popular: false, stock: 4 },
  { id: 11, name: 'Tiramisu Cup', category: 'dessert', price: 5.5, emoji: '🍰', description: 'Coffee-soaked layers with mascarpone.', rating: 4.9, popular: true, stock: 5 },
  { id: 12, name: 'Chocolate Cookie', category: 'dessert', price: 2.8, emoji: '🍪', description: 'Soft cookie with dark chocolate.', rating: 4.6, popular: false, stock: 10 },
];

const promoRules = {
  SAVE10: { type: 'percent', value: 10, minimumSubtotal: 15, message: '10% off orders from $15.' },
  COFFEE5: { type: 'fixed', value: 5, minimumCoffeeQuantity: 3, message: '$5 off with at least 3 coffee drinks.' },
  SWEET20: { type: 'percent', value: 20, minimumSubtotal: 12, requiredCategory: 'dessert', maximumDiscount: 6, message: '20% off with dessert on orders from $12, up to $6.' },
};

const categoryLabels = { coffee: 'Coffee', tea: 'Tea', food: 'Food', dessert: 'Dessert' };

// Application state
let cart = [];
let orders = [];
let nextOrderId = 1001;
let appliedPromoCode = null;
let currentCategory = 'all';
let currentSearch = '';
let currentSort = 'featured';
let toastTimer = null;

//Convenient
const formatMoney = amount => `$${amount.toFixed(2)}`;
const sumBy = (items, callback) => 
    items.reduce((total, item) => total + callback(item), 0);
const findMenuItem = id => menuItems.find(item => item.id === id);
const findCartItem = id => cart.find(item => item.id === id);

const showToast = message => {
    toast.textContent = message;
    toast.classList.remove('hidden');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.add('hidden'), 3000);
};

const getVisibleItems = () => {
    let result = [...menuItems]; //... -> 2 ten/ 2 loai: spread / rest
    
    if (currentCategory !== 'all') {
        result = result.filter(item => item.category === currentCategory);
    }
    
    if (currentSearch) {
        result = result.filter(item => 
            `${item.name} ${item.description} ${item.category}`.toLowerCase().includes(currentSearch));
    }
    
    if (currentSort === 'price-low') result.sort((a, b) => a.price - b.price);
    else if (currentSort === 'price-high') result.sort((a, b) => b.price - a.price);
    else if (currentSort === 'name') result.sort((a, b) => a.name.localeCompare(b.name));
    else if (currentSort === 'rating') result.sort((a, b) => b.rating - a.rating || a.id - b.id);
    else result.sort((a, b) => Number(b.popular) - Number(a.popular) || b.rating - a.rating || a.id - b.id);
    
    return result;
};

const createMenuCardMarkup = (item) => {
    const { id, name, category, price, emoji, description, rating, popular, stock } = item;
    const soldOut = stock === 0;
    
    return `
        <article class="menu-card ${soldOut ? 'sold-out' : ''}">
            <div class="menu-art">
                ${popular && !soldOut ? '<span class="popular-badge">Popular</span>' : ''}
                ${soldOut ? '<span class="stock-badge">Sold out</span>' : ''}
                <span class="menu-emoji" aria-hidden="true">${emoji}</span>
            </div>
            <div class="menu-content">
                <div class="menu-meta">
                    <span>${categoryLabels[category]}</span>
                    <span class="menu-rating">★ ${rating.toFixed(1)} · ${stock} left</span>
                </div>
                <h3>${name}</h3>
                <p class="menu-description">${description}</p>
                <div class="menu-footer">
                    <span class="menu-price">${formatMoney(price)}</span>
                    <button class="add-button" type="button" data-action="add" data-id="${id}" ${soldOut ? 'disabled' : ''}>
                        ${soldOut ? 'Unavailable' : 'Add +'}
                    </button>
                </div>
            </div>
        </article>
    `;
};

const updateCategoryCounts = () => {
    countAll.textContent = menuItems.length;
    countCoffee.textContent = menuItems.filter(item => item.category === 'coffee').length;  
    countTea.textContent = menuItems.filter(item => item.category === 'tea').length;  
    countFood.textContent = menuItems.filter(item => item.category === 'food').length;  
    countDessert.textContent = menuItems.filter(item => item.category === 'dessert').length;  
    heroItemCount.textContent = menuItems.length;
};


// Menu
const renderMenu = () => {
    const visibleItems = getVisibleItems();
    
    menuGrid.innerHTML = visibleItems.map(createMenuCardMarkup).join('');
    menuGrid.classList.toggle('hidden', visibleItems.length === 0);
    menuEmpty.classList.toggle('hidden', visibleItems.length > 0);
    menuResultMessage.textContent = `${visibleItems.length} ${visibleItems.length === 1 ? 'item' : 'items'} shown`;
    
    updateCategoryCounts();
};

const setActiveCategoryButton = category => {
    categoryFilters.querySelectorAll('.category-tab').forEach(button => {
        button.classList.toggle('active', button.dataset.category === category);
    });
};

const resetMenuFilters = () => {
    currentCategory = 'all';
    currentSearch = '';
    currentSort = 'featured';
    searchInput.value = '';
    sortSelect.value = 'featured';
    setActiveCategoryButton('all');
    renderMenu();
}

// Cart
const getSubtotal = () => sumBy(cart, cartItem => {
    const menuItem = findMenuItem(cartItem.id);
    return menuItem ? menuItem.price * cartItem.quantity : 0;
});

const getCategoryQuantity = category => sumBy(cart, cartItem => {
    const menuItem = findMenuItem(cartItem.id);
    return menuItem && menuItem.category === category ? cartItem.quantity : 0; 
});

const cartHasCategory = category => cart.some(cartItem => {
    const menuItem = findMenuItem(cartItem.id);
    return menuItem && menuItem.category === category;
})

const validatePromo = code => {
    const rule = promoRules[code];
    if (!rule) return { valid: false, message: 'Promo code not found.'};
    
    const { minimumSubtotal = 0, minimumCoffeeQuantity = 0, requiredCategory = '' } = rule;
    const subtotal = getSubtotal();
    
    if (subtotal < minimumSubtotal) {
        return { valid: false, message: `Subtotal must be at least ${formatMoney(minimumSubtotal)}.`};
    }
    if (minimumCoffeeQuantity && getCategoryQuantity('coffee') < minimumCoffeeQuantity) {
        return { valid: false, message: `Add at least ${minimumCoffeeQuantity} coffee drinks.` };
    }
    if (requiredCategory && !cartHasCategory(requiredCategory)) {
        return { valid: false, message: `Add at least one ${categoryLabels[requiredCategory].toLowerCase()} item.`}
    }
    
    return { valid: true, message: rule.message };
};

const recheckAppliedPromo = () => {
    if (!appliedPromoCode) return;
    if (validatePromo(appliedPromoCode).valid) return; 
    
    appliedPromoCode = null;
    promoInput.value = '';
    promoMessage.textContent = 'Promo removed because its conditions are no longer met.';
    promoMessage.classList.add('error');
};

const createCartItemMarkup = cartItem => {
    const menuItem = findMenuItem(cartItem.id);
    if (!menuItem) return '';
    const { id, name, price, emoji, stock } = menuItem;

    return `
        <article class="cart-item">
            <div class="cart-item-main">
                <div class="cart-item-title"><span class="cart-item-emoji">${emoji}</span><h3>${name}</h3></div>
                <small>${formatMoney(price)} each · ${stock} available</small>
                <div class="quantity-row">
                    <button class="qty-button" type="button" data-action="decrease" data-id="${id}">−</button>
                    <span class="quantity-number">${cartItem.quantity}</span>
                    <button class="qty-button" type="button" data-action="increase" data-id="${id}" ${cartItem.quantity >= stock ? 'disabled' : ''}>+</button>
                    <button class="remove-button" type="button" data-action="remove" data-id="${id}">Remove</button>
                </div>
            </div>
            <strong class="cart-line-total">${formatMoney(price * cartItem.quantity)}</strong>
        </article>
    `;
}

const getCartQuantity = () => sumBy(cart, item => item.quantity);

const getDiscount = subtotal => {
    if (!appliedPromoCode) return 0;
    const rule = promoRules[appliedPromoCode];
    if (!rule) return 0;
    
    let discount = rule.type === 'percent' ? subtotal * (rule.value / 100) : rule.value;
    if (rule.maximumDiscount) {
        discount = Math.min(discount, rule.maximumDiscount);
    }
    
    return Math.min(discount, subtotal);
}

const addAmounts = (...amounts) => amounts.reduce((sum, amount) => sum + amount, 0);

const getTotals = () => {
    const subtotal = getSubtotal();
    const discount = getDiscount(subtotal);
    const afterDiscount = Math.max(0, subtotal - discount);
    const serviceFee = cart.length === 0 ? 0 : Math.max(0.5, afterDiscount * 0.05);
    const total = addAmounts(afterDiscount, serviceFee);
    return { subtotal, discount, serviceFee, total };
}

const renderCart = () => {
    recheckAppliedPromo();
    cartList.innerHTML = cart.map(createCartItemMarkup).join('');
    cartCount.textContent = getCartQuantity();
    cartEmpty.classList.toggle('hidden', cart.length > 0);
    cartList.classList.toggle('hidden', cart.length === 0);
    clearCartBtn.disabled = cart.length === 0;
    checkoutBtn.disabled = cart.length === 0;
    
    const { subtotal, discount, serviceFee, total } = getTotals();
    subtotalValue.textContent = formatMoney(subtotal);
    discountValue.textContent = formatMoney(discount);
    serviceValue.textContent = formatMoney(serviceFee);
    totalValue.textContent = formatMoney(total);
};

const addToCart = id => {
    const menuItem = findMenuItem(id);
    if (!menuItem || menuItem.stock === 0) return;
    
    const existing = findCartItem(id);
    if (existing && existing.quantity >= menuItem.stock) {
        showToast(`Only ${menuItem.stock} ${menuItem.name} available.`);
        return;
    }
    
    cart = existing 
        ? cart.map(item => (item.id === id) ? { ...item, quantity: item.quantity + 1} : item)
        : [...cart, { id, quantity: 1 }];
        
    renderCart();
    showToast(`${menuItem.name} added to cart.`);
}

const changeQuantity = (id, change) => {
    const cartItem = findCartItem(id);
    const menuItem = findMenuItem(id);
    if (!cartItem || !menuItem) return;
    
    const nextQuantity = cartItem.quantity + change;
    if (nextQuantity > menuItem.stock) {
        showToast(`Only ${menuItem.stock} ${menuItem.name} available.`);
        return;
    }
    
    cart = nextQuantity <= 0
        ? cart.filter(item => item.id !== id)
        : cart.map(item => (item.id === id) ? { ...item, quantity: nextQuantity} : item);
        
    renderCart();
};

const removeFromCart = id => {
    cart = cart.filter(item => item.id !== id);
    renderCart();
};

const clearCart = () => {
    cart = [];
    appliedPromoCode = null;
    promoInput.value = '';
    promoMessage.textContent = '';
    promoMessage.classList.remove('error');
    renderCart();
    showToast('Cart cleared');
};

// Promotion
const applyPromo = () => {
    const code = promoInput.value.trim().toUpperCase();
    promoInput.value = code;
    promoMessage.classList.remove('error');
    
    if (!code || cart.length === 0) {
        appliedPromoCode = null;
        promoMessage.textContent = !code ? 'Enter a promo code first' : 'Add items before applying a promo';
        promoMessage.classList.add('error');
        renderCart();
        return;
    }
    
    const result = validatePromo(code);
    if (!result.valid) {
        appliedPromoCode = null;
        promoMessage.textContent = result.message;
        promoMessage.classList.add('error');
        renderCart();
        return;
    }
    
    appliedPromoCode = code;
    promoMessage.textContent = `${code} applied - ${result.message}`;
    renderCart();
}

// Order + Checkout
const openCheckout = () => {
    if (cart.length === 0) return;
    
    checkoutItems.innerHTML = cart.map(cartItem => {
        const menuItem = findMenuItem(cartItem.id);
        return `
            <div class="checkout-item">
                <div>
                    <strong>${menuItem.emoji} ${menuItem.name}</strong>
                    <small>${cartItem.quantity} × ${formatMoney(menuItem.price)}</small>
                </div>
                <strong>${formatMoney(menuItem.price * cartItem.quantity)}</strong>
            </div>
        `;
    }).join('');
    
    const quantity = getCartQuantity();
    modalItemCount.textContent = `${quantity} ${quantity === 1 ? 'item' : 'items'}`;
    modalTotalValue.textContent = formatMoney(getTotals().total);
    checkoutError.textContent = '';
    modalOverlay.classList.remove('hidden');
    checkoutModal.classList.remove('hidden');
    body.classList.add('modal-open');
    customerName.focus();
};

const closeCheckout = () => {
    modalOverlay.classList.add('hidden');
    checkoutModal.classList.add('hidden');
    body.classList.remove('modal-open');
};

const validateCheckout = () => {
    const name = customerName.value.trim();
    if (name.length < 2 || name.length > 30) return 'Customer name must be 2–30 characters.';
    if (orderNote.value.trim().length > 100) return 'Order note cannot exceed 100 characters.';
    return '';
};  

const createOrderSnapshot = () => {
    const totals = getTotals();
    const itemSnapshots = cart.map(cartItem => {
        const { id, name, price, emoji, category } = findMenuItem(cartItem.id);
        return { id, name, price, emoji, category, quantity: cartItem.quantity};
    });
    
    return {
        id: nextOrderId,
        customer: customerName.value.trim(),
        type: orderType.value,
        note: orderNote.value.trim(),
        promoCode: appliedPromoCode,
        items: itemSnapshots,
        ...totals //spread -> rest
    };
};

const placeOrder = () => {
    const error = validateCheckout();
    if (error) {
        checkoutError.textContent = error;
        return;
    }
    
    const order = createOrderSnapshot();
    orders = [order, ...orders]; //spread
    nextOrderId ++;
    menuItems = menuItems.map(menuItem => {
        const orderedItem = order.items.find(item => item.id === menuItem.id);
        return orderedItem
            ? { ...menuItem, stock: Math.max(0, menuItem.stock - orderedItem.quantity) }
            : menuItem;
    });
    
    cart = [];
    appliedPromoCode = null;
    promoInput.value = '';
    promoMessage.textContent = '';
    customerName.value = '';
    orderType.value = 'dine-in';
    orderNote.value = '';
    noteCount.textContent = '0';
    
    closeCheckout();
    renderMenu();
    renderCart();
    renderHistory();
    showToast(`Order #${order.id} placed for ${order.customer}.`)
};

//History
const renderHistory = () => {
    historyList.innerHTML = orders.map(order => {
        const itemQuantity = sumBy(order.items, item => item.quantity);
        const names = order.items.map(item => item.name).join(', ');
        return `
        <article class="history-card">
            <div class="history-order-id">#${String(order.id).slice(-3)}</div>
            <div>
                <h3>${order.customer}</h3>
                <p>${order.type === 'dine-in' ? 'Dine in' : 'Takeaway'} · ${itemQuantity} ${itemQuantity === 1 ? 'item' : 'items'} · ${names}</p>
            </div>
            <div class="history-card-price">
                <strong>${formatMoney(order.total)}</strong>
                <span>${order.promoCode || 'No promo'}</span>
            </div>
        </article>`;
    }).join('');
    
    historyList.classList.toggle('hidden', orders.length === 0);
    historyEmpty.classList.toggle('hidden', orders.length > 0);
    historyCount.textContent = orders.length;
    historyItems.textContent = sumBy(orders, order => sumBy(order.items, item => item.quantity));
    historyRevenue.textContent = formatMoney(sumBy(orders, order => order.total));
};

// Events
searchInput.addEventListener('input', event => {
    currentSearch = event.target.value.trim().toLowerCase();
    renderMenu(); 
});

sortSelect.addEventListener('change', event => {
    currentSort = event.target.value;
    renderMenu();
});

categoryFilters.addEventListener('click', event => {
    const button = event.target.closest('.category-tab');
    if (!button) return;
    currentCategory = button.dataset.category;
    setActiveCategoryButton(currentCategory);
    renderMenu();
});

menuGrid.addEventListener('click', event => {
    const button = event.target.closest('button[data-action]');
    if (button) addToCart(Number(button.dataset.id));
});

cartList.addEventListener('click', event => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    
    const id = Number(button.dataset.id);
    if (button.dataset.action === 'increase') changeQuantity(id, 1);
    if (button.dataset.action === 'decrease') changeQuantity(id, -1);
    if (button.dataset.action === 'remove') removeFromCart(id);
});

resetMenuBtn.addEventListener('click', resetMenuFilters);
clearCartBtn.addEventListener('click', clearCart);
applyPromoBtn.addEventListener('click', applyPromo);
checkoutBtn.addEventListener('click', openCheckout);
modalCancelBtn.addEventListener('click', closeCheckout);
modalCloseBtn.addEventListener('click', closeCheckout);
modalOverlay.addEventListener('click', closeCheckout);
placeOrderBtn.addEventListener('click', placeOrder);

promoInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') applyPromo();
});

themeBtn.addEventListener('click', event => {
    body.classList.toggle('dark');
    themeIcon.textContent = body.classList.contains('dark') ? '☀' : '☾';
});

orderNote.addEventListener('input', event => {
    noteCount.textContent = event.target.value.length;
    checkoutError.textContent = '';
});

customerName.addEventListener('input', event => {
    checkoutError.textContent = '';
});


document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !checkoutModal.classList.contains('hidden')) {
        closeCheckout();
    }
});

// Render
renderMenu();
renderCart();
renderHistory();
