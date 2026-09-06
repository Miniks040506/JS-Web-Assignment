'use strict';

// ============================================================
// 1. DATA
// ============================================================

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const recipes = [
  {
    id: 1,
    name: 'Avocado Egg Toast',
    emoji: '🥑',
    category: 'Breakfast',
    difficulty: 'Easy',
    minutes: 15,
    ingredients: ['bread', 'avocado', 'egg', 'lemon', 'salt'],
    tags: ['Quick', 'Vegetarian'],
    chef: { name: 'Mina Park' },
    nutrition: { calories: 420 },
  },
  {
    id: 2,
    name: 'Berry Yogurt Bowl',
    emoji: '🫐',
    category: 'Breakfast',
    difficulty: 'Easy',
    minutes: 10,
    ingredients: ['yogurt', 'berries', 'banana', 'oats', 'honey'],
    tags: ['Quick', 'No-cook'],
    chef: { name: 'Lena Ortiz' },
    nutrition: { calories: 360 },
  },
  {
    id: 3,
    name: 'Tomato Basil Pasta',
    emoji: '🍝',
    category: 'Lunch',
    difficulty: 'Easy',
    minutes: 25,
    ingredients: ['pasta', 'tomato', 'garlic', 'basil', 'olive oil', 'salt'],
    tags: ['Vegetarian', 'Comfort'],
    chef: { name: 'Marco Lee' },
    nutrition: { calories: 610 },
  },
  {
    id: 4,
    name: 'Chicken Rice Bowl',
    emoji: '🍚',
    category: 'Lunch',
    difficulty: 'Medium',
    minutes: 35,
    ingredients: ['rice', 'chicken', 'cucumber', 'carrot', 'soy sauce', 'garlic'],
    tags: ['Protein', 'Meal-prep'],
    chef: { name: 'Noah Tran' },
    nutrition: { calories: 680 },
  },
  {
    id: 5,
    name: 'Crispy Tofu Wrap',
    emoji: '🌯',
    category: 'Lunch',
    difficulty: 'Medium',
    minutes: 30,
    ingredients: ['tortilla', 'tofu', 'lettuce', 'tomato', 'cucumber', 'yogurt'],
    tags: ['Vegetarian', 'Fresh'],
    chef: { name: 'Avery Kim' },
    nutrition: { calories: 520 },
  },
  {
    id: 6,
    name: 'Lemon Garlic Salmon',
    emoji: '🐟',
    category: 'Dinner',
    difficulty: 'Medium',
    minutes: 35,
    ingredients: ['salmon', 'lemon', 'garlic', 'butter', 'broccoli', 'salt'],
    tags: ['Protein', 'Low-carb'],
    chef: { name: 'Eli Stone' },
    nutrition: { calories: 590 },
  },
  {
    id: 7,
    name: 'Mushroom Fried Rice',
    emoji: '🍄',
    category: 'Dinner',
    difficulty: 'Easy',
    minutes: 25,
    ingredients: ['rice', 'mushroom', 'egg', 'soy sauce', 'garlic', 'spring onion'],
    tags: ['Quick', 'Vegetarian'],
    chef: null,
    nutrition: { calories: 560 },
  },
  {
    id: 8,
    name: 'Beef Taco Plate',
    emoji: '🌮',
    category: 'Dinner',
    difficulty: 'Medium',
    minutes: 40,
    ingredients: ['tortilla', 'beef', 'tomato', 'lettuce', 'onion', 'lime'],
    tags: ['Protein', 'Weekend'],
    chef: { name: 'Luis Gomez' },
    nutrition: null,
  },
  {
    id: 9,
    name: 'Banana Oat Pancakes',
    emoji: '🥞',
    category: 'Breakfast',
    difficulty: 'Easy',
    minutes: 20,
    ingredients: ['banana', 'oats', 'egg', 'milk', 'honey'],
    tags: ['Sweet', 'Vegetarian'],
    chef: { name: 'Mia Cole' },
    nutrition: { calories: 470 },
  },
  {
    id: 10,
    name: 'Creamy Pumpkin Soup',
    emoji: '🥣',
    category: 'Dinner',
    difficulty: 'Easy',
    minutes: 30,
    ingredients: ['pumpkin', 'onion', 'garlic', 'milk', 'butter', 'salt'],
    tags: ['Vegetarian', 'Comfort'],
    chef: { name: 'June Harper' },
    nutrition: { calories: 390 },
  },
];

const kitchenBasics = ['salt', 'garlic', 'olive oil', 'egg', 'rice'];

// ============================================================
// 2. STATE
// ============================================================

const pantry = new Set();
const favorites = new Set();
const weeklyPlan = new Map();

const filters = {
  search: '',
  category: 'all',
  difficulty: 'all',
  sort: 'match',
  cookableOnly: false,
  favoritesOnly: false,
};

let recipeToPlanId = null;

// Logical assignment operators are part of the lesson.
const appSettings = {
  label: '',
  defaultDay: undefined,
  helperText: '  Weekly meal planner  ',
};

appSettings.label ||= 'MealCraft';
appSettings.defaultDay ??= 'Mon';
appSettings.helperText &&= appSettings.helperText.trim();

// ============================================================
// 3. DOM ELEMENTS
// ============================================================

const recipeGrid = document.querySelector('#recipeGrid');
const recipeEmpty = document.querySelector('#recipeEmpty');
const resultCount = document.querySelector('#resultCount');
const searchInput = document.querySelector('#searchInput');
const categoryFilter = document.querySelector('#categoryFilter');
const difficultyFilter = document.querySelector('#difficultyFilter');
const sortSelect = document.querySelector('#sortSelect');
const cookableBtn = document.querySelector('#cookableBtn');
const favoritesBtn = document.querySelector('#favoritesBtn');

const pantryPreview = document.querySelector('#pantryPreview');
const pantryCountBadge = document.querySelector('#pantryCountBadge');
const ingredientCloud = document.querySelector('#ingredientCloud');
const openPantryBtn = document.querySelector('#openPantryBtn');
const managePantryBtn = document.querySelector('#managePantryBtn');
const clearPantryBtn = document.querySelector('#clearPantryBtn');
const selectBasicsBtn = document.querySelector('#selectBasicsBtn');

const weekList = document.querySelector('#weekList');
const clearPlanBtn = document.querySelector('#clearPlanBtn');
const shoppingList = document.querySelector('#shoppingList');
const shoppingCount = document.querySelector('#shoppingCount');

const statDays = document.querySelector('#statDays');
const statMeals = document.querySelector('#statMeals');
const statPantry = document.querySelector('#statPantry');
const statShopping = document.querySelector('#statShopping');
const heroPlannedCount = document.querySelector('#heroPlannedCount');
const heroProgress = document.querySelector('#heroProgress');

const pantryModal = document.querySelector('#pantryModal');
const planModal = document.querySelector('#planModal');
const detailModal = document.querySelector('#detailModal');
const daySelect = document.querySelector('#daySelect');
const selectedRecipeBox = document.querySelector('#selectedRecipeBox');
const conflictBox = document.querySelector('#conflictBox');
const confirmPlanBtn = document.querySelector('#confirmPlanBtn');
const detailTitle = document.querySelector('#detailTitle');
const detailContent = document.querySelector('#detailContent');
const themeBtn = document.querySelector('#themeBtn');

// ============================================================
// 4. GENERAL HELPERS
// ============================================================

const capitalize = value =>
  value
    .split(' ')
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ');

const findRecipe = id => recipes.find(recipe => recipe.id === Number(id));

const getRecipeIngredientSet = recipe => new Set(recipe.ingredients);

const getMatchData = recipe => {
  const ingredientSet = getRecipeIngredientSet(recipe);
  const matched = ingredientSet.intersection(pantry);
  const missing = ingredientSet.difference(pantry);
  const percent = Math.round((matched.size / ingredientSet.size) * 100);

  return { matched, missing, percent };
};

const getAllIngredients = () => {
  let allIngredients = new Set();

  for (const recipe of recipes) {
    allIngredients = allIngredients.union(new Set(recipe.ingredients));
  }

  return [...allIngredients].sort();
};

const openModal = modal => modal.classList.remove('hidden');
const closeModal = modal => modal.classList.add('hidden');

const closeAllModals = () => {
  closeModal(pantryModal);
  closeModal(planModal);
  closeModal(detailModal);
};

// ============================================================
// 5. PANTRY
// ============================================================

const togglePantryItem = ingredient => {
  pantry.has(ingredient) ? pantry.delete(ingredient) : pantry.add(ingredient);
  renderAll();
};

const renderPantryPreview = () => {
  pantryCountBadge.textContent = pantry.size;
  pantryPreview.innerHTML = '';

  if (pantry.size === 0) {
    pantryPreview.innerHTML = '<span class="placeholder-text">No ingredients selected yet.</span>';
    return;
  }

  for (const ingredient of [...pantry].slice(0, 7)) {
    pantryPreview.insertAdjacentHTML(
      'beforeend',
      `<span class="mini-chip">${capitalize(ingredient)}</span>`
    );
  }

  pantry.size > 7 &&
    pantryPreview.insertAdjacentHTML(
      'beforeend',
      `<span class="mini-chip">+${pantry.size - 7}</span>`
    );
};

const renderIngredientCloud = () => {
  ingredientCloud.innerHTML = '';

  for (const ingredient of getAllIngredients()) {
    const activeClass = pantry.has(ingredient) ? 'active' : '';

    ingredientCloud.insertAdjacentHTML(
      'beforeend',
      `<button class="ingredient-chip ${activeClass}" data-ingredient="${ingredient}" type="button">
        ${capitalize(ingredient)}
      </button>`
    );
  }
};

const addKitchenBasics = () => {
  for (const ingredient of kitchenBasics) pantry.add(ingredient);
  renderAll();
};

const clearPantry = () => {
  pantry.clear();
  renderAll();
};

// ============================================================
// 6. FILTERING AND SORTING
// ============================================================

const getVisibleRecipes = () => {
  const search = filters.search.toLowerCase().trim();

  const visible = recipes.filter(recipe => {
    const searchableText = `${recipe.name} ${recipe.ingredients.join(' ')} ${recipe.tags.join(' ')}`.toLowerCase();
    const matchesSearch = searchableText.includes(search);
    const matchesCategory = filters.category === 'all' || recipe.category === filters.category;
    const matchesDifficulty =
      filters.difficulty === 'all' || recipe.difficulty === filters.difficulty;
    const matchesFavorite = !filters.favoritesOnly || favorites.has(recipe.id);
    const matchesCookable = !filters.cookableOnly || getMatchData(recipe).missing.size === 0;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesDifficulty &&
      matchesFavorite &&
      matchesCookable
    );
  });

  return [...visible].sort((a, b) => {
    if (filters.sort === 'time') return a.minutes - b.minutes;
    if (filters.sort === 'name') return a.name.localeCompare(b.name);

    const matchA = getMatchData(a).percent;
    const matchB = getMatchData(b).percent;
    return matchB - matchA || a.minutes - b.minutes;
  });
};

// ============================================================
// 7. RECIPE CARDS
// ============================================================

const createRecipeCardMarkup = recipe => {
  const { matched, missing, percent } = getMatchData(recipe);
  const isFavorite = favorites.has(recipe.id);
  const ready = missing.size === 0;

  return `
    <article class="recipe-card" data-id="${recipe.id}">
      <div class="recipe-top">
        <span class="recipe-emoji">${recipe.emoji}</span>
        <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-action="favorite" type="button" aria-label="Favorite">
          ${isFavorite ? '♥' : '♡'}
        </button>
      </div>
      <div class="recipe-body">
        <div class="recipe-meta">
          <span>${recipe.category}</span>
          <span>${recipe.minutes} min · ${recipe.difficulty}</span>
        </div>
        <h3>${recipe.name}</h3>
        <div class="recipe-tags">
          ${recipe.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <div class="match-row">
          <span class="match-score ${ready ? 'ready' : ''}">${ready ? 'Ready to cook' : `${percent}% pantry match`}</span>
          <span>${matched.size}/${recipe.ingredients.length}</span>
        </div>
        <div class="recipe-actions">
          <button class="detail-btn" data-action="detail" type="button">Details</button>
          <button class="plan-btn" data-action="plan" type="button">Plan meal</button>
        </div>
      </div>
    </article>
  `;
};

const renderRecipes = () => {
  const visible = getVisibleRecipes();
  recipeGrid.innerHTML = visible.map(createRecipeCardMarkup).join('');
  resultCount.textContent = `${visible.length} ${visible.length === 1 ? 'recipe' : 'recipes'}`;

  recipeGrid.classList.toggle('hidden', visible.length === 0);
  recipeEmpty.classList.toggle('hidden', visible.length !== 0);

  cookableBtn.classList.toggle('active', filters.cookableOnly);
  favoritesBtn.classList.toggle('active', filters.favoritesOnly);
  favoritesBtn.textContent = `${filters.favoritesOnly ? '♥' : '♡'} Favorites`;
};

const toggleFavorite = id => {
  favorites.has(id) ? favorites.delete(id) : favorites.add(id);
  renderRecipes();
};

// ============================================================
// 8. RECIPE DETAILS
// ============================================================

const openRecipeDetails = id => {
  const recipe = findRecipe(id);
  if (!recipe) return;

  const { matched } = getMatchData(recipe);
  const chefName = recipe.chef?.name ?? 'MealCraft Kitchen';
  const calories = recipe.nutrition?.calories ?? 'N/A';

  detailTitle.textContent = recipe.name;
  detailContent.innerHTML = `
    <div class="detail-hero">
      <span>${recipe.emoji}</span>
      <div>
        <strong>${recipe.category} · ${recipe.difficulty}</strong>
        <p class="muted">${recipe.minutes} minutes · ${calories} calories · by ${chefName}</p>
      </div>
    </div>
    <p class="eyebrow">INGREDIENTS</p>
    <div class="detail-ingredients">
      ${recipe.ingredients
        .map(
          ingredient => `
            <span class="detail-ingredient ${matched.has(ingredient) ? 'have' : ''}">
              ${matched.has(ingredient) ? '✓ ' : ''}${capitalize(ingredient)}
            </span>`
        )
        .join('')}
    </div>
  `;

  openModal(detailModal);
};

// ============================================================
// 9. WEEKLY PLAN
// ============================================================

const renderDayOptions = () => {
  daySelect.innerHTML = days
    .map(day => `<option value="${day}">${day}</option>`)
    .join('');
};

const updatePlanConflict = () => {
  const day = daySelect.value;
  const existingRecipeId = weeklyPlan.get(day);
  const existingRecipe = findRecipe(existingRecipeId);

  if (!existingRecipe) {
    conflictBox.classList.add('hidden');
    conflictBox.innerHTML = '';
    confirmPlanBtn.textContent = 'Add to plan';
    return;
  }

  conflictBox.classList.remove('hidden');
  conflictBox.innerHTML = `<strong>${day} is already planned.</strong><br>${existingRecipe.emoji} ${existingRecipe.name} will be replaced if you continue.`;
  confirmPlanBtn.textContent = 'Replace meal';
};

const openPlanForRecipe = id => {
  const recipe = findRecipe(id);
  if (!recipe) return;

  recipeToPlanId = recipe.id;
  selectedRecipeBox.innerHTML = `
    <span>${recipe.emoji}</span>
    <div><strong>${recipe.name}</strong><small>${recipe.minutes} min · ${recipe.category}</small></div>
  `;

  const firstEmptyDay = days.find(day => !weeklyPlan.has(day));
  daySelect.value = firstEmptyDay ?? appSettings.defaultDay;
  updatePlanConflict();
  openModal(planModal);
};

const confirmPlan = () => {
  const recipe = findRecipe(recipeToPlanId);
  const day = daySelect.value;

  if (!recipe || !day) return;

  weeklyPlan.set(day, recipe.id);
  closeModal(planModal);
  recipeToPlanId = null;
  renderAll();
};

const removePlannedDay = day => {
  weeklyPlan.delete(day);
  renderAll();
};

const clearWeek = () => {
  weeklyPlan.clear();
  renderAll();
};

const renderWeek = () => {
  weekList.innerHTML = '';

  for (const day of days) {
    const recipeId = weeklyPlan.get(day);
    const recipe = findRecipe(recipeId);

    weekList.insertAdjacentHTML(
      'beforeend',
      `
        <div class="day-row">
          <span class="day-name">${day}</span>
          <div class="day-meal">
            ${
              recipe
                ? `<strong>${recipe.emoji} ${recipe.name}</strong><small>${recipe.minutes} min · ${recipe.category}</small>`
                : '<span class="day-empty">No meal planned</span>'
            }
          </div>
          ${
            recipe
              ? `<button class="remove-plan-btn" data-day="${day}" type="button" aria-label="Remove">×</button>`
              : ''
          }
        </div>
      `
    );
  }
};

// ============================================================
// 10. SHOPPING LIST AND STATISTICS
// ============================================================

const getPlannedRecipes = () => {
  const plannedRecipes = [];

  for (const recipeId of weeklyPlan.values()) {
    const recipe = findRecipe(recipeId);
    recipe && plannedRecipes.push(recipe);
  }

  return plannedRecipes;
};

const getShoppingSet = () => {
  let shoppingSet = new Set();

  for (const recipe of getPlannedRecipes()) {
    const missing = getRecipeIngredientSet(recipe).difference(pantry);
    shoppingSet = shoppingSet.union(missing);
  }

  return shoppingSet;
};

const renderShoppingList = () => {
  const shoppingSet = getShoppingSet();
  shoppingCount.textContent = `${shoppingSet.size} ${shoppingSet.size === 1 ? 'item' : 'items'}`;
  shoppingList.innerHTML = '';

  if (weeklyPlan.size === 0) {
    shoppingList.innerHTML = '<span class="placeholder-text">Plan a meal to build your shopping list.</span>';
    return;
  }

  if (shoppingSet.size === 0) {
    shoppingList.innerHTML = '<span class="placeholder-text">You already have everything you need 🎉</span>';
    return;
  }

  for (const ingredient of [...shoppingSet].sort()) {
    shoppingList.insertAdjacentHTML(
      'beforeend',
      `<span class="shopping-item">${capitalize(ingredient)}</span>`
    );
  }
};

const renderStats = () => {
  const uniqueMeals = new Set(weeklyPlan.values());
  const shoppingSet = getShoppingSet();
  const progress = Math.round((weeklyPlan.size / days.length) * 100);

  statDays.textContent = weeklyPlan.size;
  statMeals.textContent = uniqueMeals.size;
  statPantry.textContent = pantry.size;
  statShopping.textContent = shoppingSet.size;
  heroPlannedCount.textContent = `${weeklyPlan.size} / ${days.length}`;
  heroProgress.style.width = `${progress}%`;
};

// ============================================================
// 11. MAIN RENDER
// ============================================================

const renderAll = () => {
  renderPantryPreview();
  renderIngredientCloud();
  renderRecipes();
  renderWeek();
  renderShoppingList();
  renderStats();
};

// ============================================================
// 12. EVENT HANDLERS
// ============================================================

searchInput.addEventListener('input', event => {
  filters.search = event.target.value;
  renderRecipes();
});

categoryFilter.addEventListener('change', event => {
  filters.category = event.target.value;
  renderRecipes();
});

difficultyFilter.addEventListener('change', event => {
  filters.difficulty = event.target.value;
  renderRecipes();
});

sortSelect.addEventListener('change', event => {
  filters.sort = event.target.value;
  renderRecipes();
});

cookableBtn.addEventListener('click', () => {
  filters.cookableOnly = !filters.cookableOnly;
  renderRecipes();
});

favoritesBtn.addEventListener('click', () => {
  filters.favoritesOnly = !filters.favoritesOnly;
  renderRecipes();
});

recipeGrid.addEventListener('click', event => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;

  const card = button.closest('.recipe-card');
  const id = Number(card?.dataset.id);
  const action = button.dataset.action;

  if (action === 'favorite') toggleFavorite(id);
  if (action === 'detail') openRecipeDetails(id);
  if (action === 'plan') openPlanForRecipe(id);
});

ingredientCloud.addEventListener('click', event => {
  const button = event.target.closest('[data-ingredient]');
  button && togglePantryItem(button.dataset.ingredient);
});

weekList.addEventListener('click', event => {
  const button = event.target.closest('[data-day]');
  button && removePlannedDay(button.dataset.day);
});

const showPantry = () => openModal(pantryModal);
openPantryBtn.addEventListener('click', showPantry);
managePantryBtn.addEventListener('click', showPantry);
clearPantryBtn.addEventListener('click', clearPantry);
selectBasicsBtn.addEventListener('click', addKitchenBasics);
clearPlanBtn.addEventListener('click', clearWeek);
confirmPlanBtn.addEventListener('click', confirmPlan);
daySelect.addEventListener('change', updatePlanConflict);

document.addEventListener('click', event => {
  const closeButton = event.target.closest('.modal-close');
  const backdrop = event.target.classList.contains('modal-backdrop');

  if (closeButton || backdrop) closeAllModals();
});

document.addEventListener('keydown', event => {
  event.key === 'Escape' && closeAllModals();
});

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeBtn.textContent = document.body.classList.contains('dark') ? '☀' : '☾';
});

// ============================================================
// 13. INITIALIZE
// ============================================================

renderDayOptions();
renderAll();
