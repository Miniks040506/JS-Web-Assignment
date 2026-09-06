# QuickBite Café — JavaScript DOM Review Assignment

## 1. Project overview

You are given a finished HTML/CSS interface for a small café ordering dashboard named **QuickBite Café**.

Your job is to write the complete JavaScript behavior in `script.js`.

The page is already designed. When you first open the student starter, many areas will look empty or inactive because JavaScript has not been written yet.

By the end of the assignment, a user must be able to:

- browse menu items generated from JavaScript data;
- search the menu;
- filter by category;
- sort the menu;
- add items to a cart;
- increase/decrease quantities;
- remove items or clear the cart;
- see subtotal, discount, service fee and final total update automatically;
- apply promo codes with different conditions;
- open a checkout modal;
- validate customer information;
- place an order;
- reduce menu stock after a successful order;
- see previous orders and session statistics;
- close the modal with buttons, backdrop click or `Escape`;
- switch between light and dark themes.

This is a **JavaScript review project**. Do not redesign the HTML/CSS unless your instructor asks you to.

---

# 2. Files provided

```text
Student_Starter/
├── index.html
├── style.css
├── script.js
└── README.md
```

### `index.html`
Already complete.

It contains all buttons, inputs, containers, IDs and classes required by the assignment.

### `style.css`
Already complete.

It contains the complete responsive visual design for desktop, tablet and mobile.

### `script.js`
Starts empty.

Write the entire application logic here.

### `README.md`
This document describes what the finished application must do.

---

# 3. Scope and restrictions

The project should be completed using the JavaScript concepts covered in class.

You may use normal arrays and objects.

**Do not use `Set` or `Map` in this assignment.**

You do not need:

- a framework;
- a backend;
- an API;
- `fetch`;
- a database;
- classes;
- local storage;
- modules.

All data may exist only while the page is open. Refreshing the page may reset the application.

The goal is to solve the application using JavaScript fundamentals, functions, arrays, objects, DOM manipulation and events.

---

# 4. Menu data specification

Create menu data for the following 12 products.

Each menu item needs enough information for the interface to display:

- a unique ID;
- name;
- category;
- price;
- emoji/image symbol;
- description;
- rating;
- whether it is popular;
- current stock.

Use the following values.

| ID | Product | Category | Price | Emoji | Rating | Popular | Initial stock |
|---:|---|---|---:|---|---:|---|---:|
| 1 | Caramel Cloud Latte | coffee | $5.80 | ☕ | 4.9 | Yes | 8 |
| 2 | Classic Cappuccino | coffee | $4.60 | ☕ | 4.8 | Yes | 10 |
| 3 | Iced Americano | coffee | $3.90 | 🧋 | 4.6 | No | 12 |
| 4 | Hazelnut Cold Brew | coffee | $5.20 | 🥤 | 4.7 | No | 6 |
| 5 | Peach Jasmine Tea | tea | $4.40 | 🍑 | 4.8 | Yes | 9 |
| 6 | Matcha Milk Tea | tea | $5.10 | 🍵 | 4.7 | No | 7 |
| 7 | Honey Lemon Tea | tea | $4.00 | 🍋 | 4.5 | No | 11 |
| 8 | Avocado Toast | food | $7.20 | 🥑 | 4.8 | Yes | 5 |
| 9 | Ham & Cheese Croissant | food | $6.40 | 🥐 | 4.7 | No | 6 |
| 10 | Chicken Pesto Sandwich | food | $7.80 | 🥪 | 4.6 | No | 4 |
| 11 | Tiramisu Cup | dessert | $5.50 | 🍰 | 4.9 | Yes | 5 |
| 12 | Chocolate Cookie | dessert | $2.80 | 🍪 | 4.6 | No | 10 |

You may write short descriptions yourself, but the other values should match the table.

---

# 5. Functional requirements

The following requirements describe the **behavior of the finished application**.

They intentionally do not tell you which array method or exact function structure to use.

Your solution may be organized differently as long as all required behavior works correctly.

---

## FR-01 — Initial page state

When the page first loads:

1. All 12 menu products must appear inside the menu grid.
2. The hero section must show `12` menu items.
3. Category counters must show:
   - All: 12
   - Coffee: 4
   - Tea: 3
   - Food: 3
   - Dessert: 2
4. The `All` category button must appear active.
5. Sorting must begin on `Featured`.
6. The cart must be empty.
7. Cart count must show `0`.
8. Subtotal, discount, service fee and total must all show `$0.00`.
9. `Clear all` must be disabled.
10. `Review order` must be disabled.
11. Order history must show its empty state.
12. Order statistics must all begin at zero.

### Acceptance check

Opening `index.html` should immediately produce a complete menu without the user clicking anything.

---

## FR-02 — Menu card information

Every visible menu card must show:

- product emoji;
- category;
- rating;
- current stock remaining;
- product name;
- short description;
- formatted price;
- add button.

Popular products must display a visible `Popular` badge while they are available.

A price such as `5.8` must appear as `$5.80`, not `$5.8`.

---

## FR-03 — Category filtering

The category buttons are:

- All
- Coffee
- Tea
- Food
- Dessert

When a category is selected:

1. That category button becomes active.
2. The previous category button loses its active state.
3. Only products belonging to the selected category remain visible.
4. The result text updates to the number of currently visible products.

### Example

If `Coffee` is selected with no search text:

- exactly 4 products should be visible;
- result text should report 4 items.

Selecting `All` must restore all products that also match the current search/sort settings.

---

## FR-04 — Live search

The search field must update results **while the user types**.

Search must be case-insensitive.

The user should be able to find a menu item using text from:

- product name;
- description;
- category.

Leading/trailing spaces should not break searching.

### Examples

Typing:

```text
latte
```

should find `Caramel Cloud Latte`.

Typing:

```text
COFFEE
```

should still work.

Typing text that matches nothing must show the menu empty state.

---

## FR-05 — Sorting

The sort dropdown must support all options already present in the HTML.

### Featured

Popular products appear before non-popular products.

Within a sensible tie, higher-rated products may appear first.

### Price: Low to high

Cheapest product appears first.

### Price: High to low

Most expensive product appears first.

### Name: A–Z

Products appear in alphabetical order.

### Top rated

Highest rating appears first.

Sorting must not permanently destroy or corrupt the original menu data.

---

## FR-06 — Search + category + sort must work together

The controls are not separate demos.

They must combine correctly.

### Test scenario

1. Select `Coffee`.
2. Type `ice` in search.
3. Choose `Price: Low to high`.

The menu should only show coffee items matching the search, ordered by price.

Changing one control must preserve the other active controls.

---

## FR-07 — Reset menu filters

When no products match, the empty state includes `Reset menu filters`.

Clicking it must:

- return category to `All`;
- clear the search box;
- return sorting to `Featured`;
- restore the normal menu results.

---

## FR-08 — Stock display and sold-out state

Each product has a stock value.

The card must show how many units remain.

When stock reaches `0`:

- the product still remains visible in the menu;
- the card clearly shows `Sold out`;
- the add button becomes disabled;
- the user cannot add more of that product.

The stock value is reduced only after a successful completed order, not merely when an item is placed in the cart.

---

## FR-09 — Add item to cart

Clicking a product's `Add +` button must add one unit of that product to the cart.

### First add

If the product is not already in the cart:

- create one cart row;
- quantity begins at `1`.

### Repeated add

If the same product is already in the cart:

- do not create another duplicate row;
- increase the quantity of the existing cart row instead.

### Example

Click `Add +` on `Classic Cappuccino` three times.

Expected cart:

```text
Classic Cappuccino × 3
```

Not:

```text
Classic Cappuccino × 1
Classic Cappuccino × 1
Classic Cappuccino × 1
```

A short toast/message should confirm that the product was added.

---

## FR-10 — Cart count

The number next to `Your cart` represents **total units**, not number of different products.

### Example

Cart contains:

- Cappuccino × 2
- Cookie × 3

Cart count must show:

```text
5
```

not `2`.

---

## FR-11 — Cart row information

Each cart row must show:

- product emoji;
- product name;
- unit price;
- current available stock;
- current quantity;
- decrease button;
- increase button;
- remove button;
- line total.

Line total is:

```text
unit price × quantity
```

### Example

Chocolate Cookie is `$2.80`.

At quantity `3`, its row total must show:

```text
$8.40
```

---

## FR-12 — Increase quantity

Clicking `+` in the cart increases quantity by one.

The application must then immediately update:

- cart row quantity;
- row total;
- cart count;
- subtotal;
- discount if applicable;
- service fee;
- final total.

Quantity may never exceed current product stock.

If the cart already contains the maximum available quantity:

- the increase button should be disabled or prevented from increasing;
- the user must receive sensible feedback if an increase is attempted.

---

## FR-13 — Decrease quantity

Clicking `−` decreases quantity by one.

If quantity changes from `2` to `1`, keep the row.

If quantity changes from `1` to `0`, remove the product completely from the cart.

All summary values must update immediately.

---

## FR-14 — Remove one product

Clicking `Remove` deletes that product from the cart regardless of its quantity.

Other cart items remain unchanged.

---

## FR-15 — Clear the entire cart

`Clear all` must:

- remove every cart item;
- reset cart count to 0;
- reset prices to `$0.00`;
- remove any active promo;
- clear the promo field/message;
- show the cart empty state;
- disable checkout again.

The button should be disabled while the cart is already empty.

---

## FR-16 — Subtotal

Subtotal is the sum of every cart line before discounts or service fee.

### Example

Cart:

- Cappuccino × 2 → `$9.20`
- Cookie × 1 → `$2.80`

Subtotal:

```text
$12.00
```

Subtotal must recalculate every time the cart changes.

---

## FR-17 — Promo code input behavior

Promo input must:

- ignore leading/trailing spaces;
- accept lowercase or uppercase input;
- treat codes case-insensitively;
- visually normalize the entered code to uppercase;
- allow the user to click `Apply`;
- also allow the user to press `Enter` while inside the promo input.

Only one promo may be active at a time.

Entering a new valid promo replaces the previous one.

---

## FR-18 — Promo rule: SAVE10

Code:

```text
SAVE10
```

Condition:

- subtotal must be at least `$15.00`.

Discount:

- 10% of subtotal.

### Example

Subtotal `$20.00`:

```text
Discount = $2.00
```

If subtotal is below `$15.00`, the code must not apply and the user must see a useful error message.

---

## FR-19 — Promo rule: COFFEE5

Code:

```text
COFFEE5
```

Condition:

- cart must contain at least **3 coffee units in total**.

The three units may be the same drink or different coffee drinks.

Discount:

```text
$5.00
```

### Valid example

- Cappuccino × 2
- Americano × 1

Total coffee units = 3, so the code is valid.

Tea, food and dessert quantities do not count toward this requirement.

---

## FR-20 — Promo rule: SWEET20

Code:

```text
SWEET20
```

Conditions:

- subtotal must be at least `$12.00`;
- cart must contain at least one dessert product.

Discount:

- 20% of subtotal;
- maximum discount is `$6.00`.

### Example A

Subtotal `$20.00` with dessert:

```text
20% = $4.00
Discount = $4.00
```

### Example B

Subtotal `$50.00` with dessert:

```text
20% = $10.00
Maximum allowed = $6.00
Discount = $6.00
```

---

## FR-21 — Invalid promo

For an unknown code such as:

```text
HELLO50
```

The application must:

- not apply a discount;
- show a clear error message;
- leave the order totals correct.

Applying a promo to an empty cart must also show a sensible message instead of producing an incorrect discount.

---

## FR-22 — Active promo must be revalidated

A promo cannot remain active if the user later changes the cart so its condition is no longer true.

### Scenario A — SAVE10

1. Subtotal is `$18.00`.
2. Apply `SAVE10`.
3. Remove products until subtotal becomes `$10.00`.

Expected:

- promo is automatically removed;
- discount returns to `$0.00`;
- the user sees a message explaining why.

### Scenario B — COFFEE5

1. Cart contains 3 coffee units.
2. Apply `COFFEE5`.
3. Reduce coffee quantity to 2.

Expected:

- promo becomes invalid and is removed.

This behavior must happen automatically after cart changes.

---

## FR-23 — Service fee and total

Service fee is calculated **after discount**.

If the cart is empty:

```text
Service fee = $0.00
```

Otherwise:

```text
service fee = 5% of the amount after discount
```

but the minimum service fee is:

```text
$0.50
```

Final total:

```text
subtotal - discount + service fee
```

All monetary values must show exactly two decimal places.

---

## FR-24 — Checkout button state

`Review order` must be disabled when the cart is empty.

Once the cart contains at least one product, it becomes enabled.

If all products are removed again, it becomes disabled again.

---

## FR-25 — Open checkout modal

Clicking `Review order` with a non-empty cart opens the checkout modal.

The modal must display:

- every product currently in the cart;
- quantity of each product;
- unit price;
- line total;
- total item quantity;
- final amount to pay.

The amount shown in the modal must match the cart total exactly.

---

## FR-26 — Customer name validation

Customer name is required.

Rules:

- remove spaces at the beginning/end before validation;
- minimum length: 2 characters;
- maximum length: 30 characters.

If invalid:

- order must not be created;
- modal stays open;
- an error message appears.

---

## FR-27 — Order type

The checkout modal allows:

- Dine in
- Takeaway

The selected order type must be saved with the completed order and shown later in order history.

---

## FR-28 — Order note

Order note is optional.

Maximum length:

```text
100 characters
```

The live character counter must update as the user types.

Examples:

```text
0/100
37/100
100/100
```

The note belongs to the completed order, not to future orders.

---

## FR-29 — Place order

When `Place order` is clicked and checkout data is valid:

1. Create one completed order.
2. Give the order a unique increasing order number beginning at `1001`.
3. Save the customer name.
4. Save order type.
5. Save optional note.
6. Save promo code if one was used.
7. Save the ordered products and quantities.
8. Save subtotal, discount, service fee and total.
9. Reduce stock for each purchased menu item.
10. Add the new order to order history.
11. Clear the current cart.
12. Clear the promo.
13. Reset checkout form fields.
14. Close the modal.
15. Update the menu cards with the new stock.
16. Update order-history statistics.
17. Show a success toast/message.

The newest order should appear before older orders.

---

## FR-30 — Order data must remain correct after cart reset

A completed order must keep its own information.

After an order is completed, changing the next cart must not modify the old order.

### Example

Order #1001 contains:

```text
Cappuccino × 2
Cookie × 1
```

After placing it, start another cart and add:

```text
Americano × 4
```

Order #1001 must still display its original products, quantities and total.

---

## FR-31 — Stock reduction after checkout

Stock decreases only after a successful order.

### Example

Initial Cookie stock:

```text
10
```

Complete an order containing:

```text
Chocolate Cookie × 3
```

New menu stock:

```text
7
```

Adding/removing items from an unconfirmed cart must **not** permanently change menu stock.

---

## FR-32 — Prevent ordering more than available stock

The user can never have a product quantity larger than its available stock.

### Example

If Chicken Pesto Sandwich stock is `4`:

- quantity 1, 2, 3, 4 are allowed;
- quantity 5 is not allowed.

The app must prevent the increase before checkout.

---

## FR-33 — Order history cards

Every completed order should create a visible history card showing at least:

- order number;
- customer name;
- dine-in/takeaway;
- total number of items;
- names of purchased products;
- total paid;
- promo code used, or an indication that no promo was used.

Before any order exists, show the provided order-history empty state.

After the first order, hide that empty state.

---

## FR-34 — Session statistics

The three statistics above order history must update after every completed order.

### Orders

Number of successfully completed orders.

### Items sold

Total units across all completed orders.

### Total spent

Sum of the final totals of all completed orders.

### Example

Order #1: 3 items, total `$18.00`

Order #2: 2 items, total `$12.50`

Statistics:

```text
Orders: 2
Items sold: 5
Total spent: $30.50
```

---

## FR-35 — Close checkout modal

The checkout modal must close when the user:

- clicks the `×` button;
- clicks `Back`;
- clicks the dark overlay outside the modal;
- presses the `Escape` key.

Closing without placing the order must not delete the cart.

When the user opens checkout again, the cart must still be there.

---

## FR-36 — Theme toggle

The button in the top-right corner toggles between light and dark appearance.

When dark mode is active:

- the `dark` class should be reflected on the page as expected by the provided CSS;
- the icon should visually indicate the opposite/light action.

Clicking again returns to light mode.

Theme persistence after refresh is **not required**.

---

# 6. Required combined scenarios

Your project is not complete if each feature works only in isolation.

Test these full workflows.

---

## Scenario 1 — Search → add → edit → checkout

1. Load page.
2. Search `cappuccino`.
3. Add Classic Cappuccino.
4. Clear the search field.
5. Add two Chocolate Cookies.
6. Increase Cappuccino to quantity 2.
7. Verify cart count = 4.
8. Verify all line totals and subtotal.
9. Click `Review order`.
10. Enter a valid customer name.
11. Select `Takeaway`.
12. Add a short note.
13. Place order.

Expected:

- order appears in history;
- cart becomes empty;
- history stats update;
- purchased stock decreases.

---

## Scenario 2 — Promo becomes invalid

1. Add enough products to make subtotal greater than `$15`.
2. Apply `SAVE10`.
3. Verify 10% discount.
4. Remove products until subtotal is below `$15`.

Expected:

- promo automatically disappears;
- discount returns to zero;
- total recalculates;
- user receives an explanation message.

---

## Scenario 3 — Coffee promotion

1. Add Cappuccino × 2.
2. Add Iced Americano × 1.
3. Apply `COFFEE5`.
4. Verify `$5.00` discount.
5. Decrease one coffee.

Expected:

- total coffee quantity becomes 2;
- `COFFEE5` is automatically removed.

---

## Scenario 4 — Stock becomes sold out

Chicken Pesto Sandwich begins with stock `4`.

1. Add 4 to the cart.
2. Verify quantity cannot increase to 5.
3. Complete checkout successfully.

Expected after checkout:

- stock becomes 0;
- product remains in menu;
- card shows `Sold out`;
- add button is disabled.

---

## Scenario 5 — Controls combine

1. Choose `Dessert`.
2. Type `cookie`.
3. Choose `Price: High to low`.
4. Clear search.
5. Switch category to `All`.

At every step, result count and visible products must remain consistent with all active controls.

---

# 7. Edge cases you must handle

Your solution should not break in these situations:

- Search contains only spaces.
- Search has uppercase letters.
- Search returns zero products.
- User repeatedly clicks add until stock limit.
- User clicks minus when quantity is 1.
- User removes the final cart item.
- User clears the cart while a promo is active.
- User enters promo with extra spaces.
- User enters promo in lowercase.
- User enters an unknown promo.
- User applies promo to an empty cart.
- User removes items after a valid promo was applied.
- Discount is larger than subtotal.
- User opens checkout and closes it without ordering.
- Customer name is empty.
- Customer name is only one character.
- Customer name contains surrounding spaces.
- Order note reaches 100 characters.
- Multiple completed orders exist.
- A menu product reaches stock zero.

The console should not show uncaught JavaScript errors during normal use.

---

# 8. UI rules

The HTML and CSS already provide the visual design.

Your JavaScript must preserve it.

Do not replace the provided interface with `prompt()`, `alert()` or console-only interaction.

Important visual states already prepared in CSS include:

- active category;
- empty menu;
- empty cart;
- sold-out product;
- disabled buttons;
- promo success/error message;
- checkout modal;
- overlay;
- toast;
- dark mode;
- responsive layout.

Your JavaScript is responsible for applying/removing the correct content and classes at the right time.

---

# 9. Code-quality expectations

The application should not be written as one giant event listener.

Your code should be divided into understandable responsibilities such as:

- rendering the menu;
- rendering the cart;
- calculating prices;
- validating promotions;
- changing quantities;
- opening/closing checkout;
- creating an order;
- rendering history.

Avoid copying the same calculation into many unrelated places.

If one value can be calculated from the current data, prefer keeping one clear source of truth instead of manually updating several disconnected variables.

Use meaningful variable and function names.

Comments should explain non-obvious logic rather than narrating every line.

---

# 10. What this assignment is intended to review

You are expected to combine previously learned JavaScript knowledge into one application.

The project includes opportunities to practice:

- variables and constants;
- strings, numbers and booleans;
- operators;
- conditions;
- functions;
- arrow functions;
- arrays;
- objects;
- loops/iteration;
- callbacks;
- higher-order logic;
- DOM selection;
- changing text/content;
- creating dynamic HTML;
- classes;
- forms and input values;
- click events;
- input/change events;
- keyboard events;
- destructuring;
- default values;
- spread syntax;
- rest parameters;
- template literals;
- string processing;
- array transformations and calculations.

Again, **`Set` and `Map` are not part of this assignment**.

---

# 11. Suggested implementation order

This is an implementation sequence, not a code solution.

Do not try to build everything at once.

### Stage 1 — Data + initial menu

Get all 12 products visible correctly.

### Stage 2 — Menu controls

Complete category, search, sort and empty-state behavior.

### Stage 3 — Cart basics

Add products, render cart rows and calculate cart count.

### Stage 4 — Quantity + totals

Finish increase, decrease, remove, clear, subtotal, service fee and total.

### Stage 5 — Promotion system

Implement all promo conditions and automatic revalidation.

### Stage 6 — Checkout modal

Render order review and validate the customer form.

### Stage 7 — Complete orders

Create order data, reduce stock and reset current-order state.

### Stage 8 — History + statistics

Render completed orders and calculate session totals.

### Stage 9 — Interaction polish

Finish toast, `Enter`, `Escape`, backdrop close and theme toggle.

### Stage 10 — Full regression testing

Run all scenarios and edge cases from this README.

---

# 12. Submission checklist

Before submitting, confirm every item below.

## Menu

- [ ] 12 products render from JavaScript.
- [ ] Product cards show correct data.
- [ ] Popular badges work.
- [ ] Category counts are correct.
- [ ] Category filter works.
- [ ] Search works live.
- [ ] Search is case-insensitive.
- [ ] All sort options work.
- [ ] Search/filter/sort combine correctly.
- [ ] Empty results state works.
- [ ] Reset filters works.
- [ ] Stock is displayed.
- [ ] Sold-out state works.

## Cart

- [ ] Add to cart works.
- [ ] Duplicate products increase quantity instead of creating duplicate rows.
- [ ] Cart count uses total units.
- [ ] Increase quantity works.
- [ ] Stock limit is respected.
- [ ] Decrease quantity works.
- [ ] Quantity 0 removes the row.
- [ ] Remove works.
- [ ] Clear all works.
- [ ] Empty-cart state works.

## Price calculation

- [ ] Line totals are correct.
- [ ] Subtotal is correct.
- [ ] Service fee is correct.
- [ ] Total is correct.
- [ ] Money always displays two decimals.

## Promotions

- [ ] SAVE10 works.
- [ ] COFFEE5 works.
- [ ] SWEET20 works.
- [ ] Invalid code shows error.
- [ ] Lowercase promo input works.
- [ ] Enter applies promo.
- [ ] Active promo is removed when its conditions stop being true.

## Checkout

- [ ] Checkout disabled when cart is empty.
- [ ] Checkout modal opens.
- [ ] Review contains correct products/quantities.
- [ ] Modal total matches cart total.
- [ ] Customer name validation works.
- [ ] Order type is saved.
- [ ] Note counter works.
- [ ] Place order works.
- [ ] Stock decreases after ordering.
- [ ] Cart resets after ordering.
- [ ] Promo resets after ordering.
- [ ] Modal closes after ordering.

## History

- [ ] Completed orders are displayed.
- [ ] Newest order appears first.
- [ ] Old orders do not change when a new cart is created.
- [ ] Order count is correct.
- [ ] Items sold is correct.
- [ ] Total spent is correct.

## Other interaction

- [ ] `×` closes modal.
- [ ] `Back` closes modal.
- [ ] Overlay click closes modal.
- [ ] Escape closes modal.
- [ ] Closing modal does not erase cart.
- [ ] Theme toggle works.
- [ ] No normal-use console errors.
- [ ] No `Set` or `Map` is used.

---

# 13. Optional bonus challenges

Complete these only after every required feature works.

### Bonus A — Most ordered product

Add a statistic showing the product with the highest sold quantity in this session.

### Bonus B — Low-stock warning

Give products with stock `1–2` a special low-stock visual state.

### Bonus C — Order-history filter

Allow history to show:

- all orders;
- dine-in only;
- takeaway only.

### Bonus D — Simple order cancellation

Allow the most recent order to be cancelled and return its quantities to stock.

If you build this, make sure statistics also update correctly.

### Bonus E — Theme persistence

Remember the selected theme after refresh.

This bonus may require knowledge beyond the core assignment.

---

# 14. Definition of done

The assignment is finished when a user can complete this full flow without errors:

> Open the café → find products → add multiple quantities → edit the cart → apply a valid promotion → see correct totals → review checkout → enter valid customer information → place the order → see stock change → see the order in history → start another independent order.

The interface should feel like one connected application, not a collection of separate JavaScript exercises.
