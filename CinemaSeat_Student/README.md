# CineSeat — Multi-Page Movie Ticket Booking Assignment

## Your task

You are given a finished 3-page cinema website interface. The HTML and CSS are already complete. Your job is to make the entire website work by writing **JavaScript only** in `script.js`.

Do not redesign the pages. Do not remove existing elements. You should make the provided UI behave like a small real movie-ticket booking website.

The project has three pages:

1. `index.html` — browse and choose a movie.
2. `booking.html` — choose cinema, showtime and seats, apply a promo code, and confirm the booking.
3. `tickets.html` — view all confirmed tickets, search them, inspect full details, and cancel a booking.

The pages are connected. A choice made on one page must still be available after navigating to another page or refreshing the browser.

---

# PART 1 — Movie data

Create data for at least **6 movies**. Every movie must have enough information for the UI to display:

- unique ID
- title
- genre
- duration in minutes
- rating
- age rating
- short description
- a poster/style identifier if needed by the provided HTML/CSS

The six movies must not all have the same genre, duration, or rating because later features depend on these differences.

### Expected result

When `index.html` first opens, all movies appear automatically inside the movie grid. No movie card should be manually hard-coded into the HTML.

Each visible movie card must show at least:

- movie title
- genre
- rating
- duration
- age rating
- description
- a button that allows the user to choose that movie

The “Now showing” counter in the hero area must display the total number of available movies.

---

# PART 2 — Build the genre filter automatically

The genre select box initially contains only `All genres`.

Your JavaScript must inspect the movie data and add the available genres to that select box.

### Rules

- each genre appears only once
- genres should be displayed alphabetically
- if multiple movies have the same genre, do not create duplicate options

### Example

If the movie data contains Sci-Fi, Romance, Comedy, Sci-Fi, Drama and Comedy, the dropdown should contain:

- All genres
- Comedy
- Drama
- Romance
- Sci-Fi

---

# PART 3 — Search movies

When the user types inside the movie search field, update the visible movie cards immediately.

### Required behavior

- search is based on movie title
- search must ignore uppercase/lowercase differences
- partial words must work
- deleting the text restores matching movies
- an empty search shows all movies allowed by the current genre filter

### Example

If the user types `heart`, a movie named `Paper Hearts` should still appear.

If no movie matches, hide the movie grid content and show the provided empty-state message.

---

# PART 4 — Filter movies by genre

When the user selects a genre, only movies from that genre should remain visible.

`All genres` removes the genre restriction.

Search and genre filtering must work **together**.

### Test case

Suppose the user:

1. selects `Romance`
2. types `paper`

Only Romance movies whose title contains `paper` should appear.

Changing the search text must not reset the selected genre.

---

# PART 5 — Sort the movie list

Make all provided sorting options work.

The website contains options for:

- default order
- highest rating first
- shortest duration first
- title A–Z

Sorting must apply only after the current search and genre conditions have been considered.

### Important

Changing sort order must not permanently destroy or rewrite your original movie data order. Choosing `Default order` should restore the original order of the matching movies.

---

# PART 6 — Choose a movie and continue to booking

When the user clicks `Choose movie` on a movie card:

1. remember which movie was selected
2. navigate to `booking.html`

On `booking.html`, the selected movie information must automatically appear in the selected-movie area and the booking summary.

### Refresh requirement

If the user refreshes `booking.html`, the selected movie must still be known.

If `booking.html` is opened before the user selects a movie, your app must still behave safely. Choose a reasonable fallback such as the first movie instead of allowing the page to crash.

The `Change movie` button must return to `index.html`.

---

# PART 7 — Cinema data

Create at least **3 cinemas**.

Each cinema needs:

- unique ID
- cinema name
- location/area
- at least 4 showtimes

Example structure in the finished UI:

- CineSeat Landmark — Bình Thạnh
- CineSeat Central — District 1
- CineSeat Riverside — Thu Duc

You may use these names or create your own.

---

# PART 8 — Select a cinema

Display all cinemas as selectable buttons/cards in the `Select cinema` area.

Exactly one cinema should be selected at a time.

### Initial state

When the booking page first loads, automatically select one cinema so the user can continue without an invalid empty state.

### When the cinema changes

The following must happen:

1. the visual selected state moves to the new cinema
2. the list of showtimes changes to that cinema's showtimes
3. a valid showtime becomes selected
4. any currently selected seats are cleared
5. any active promo discount is cleared
6. the booking summary updates

This is important because seats belong to a particular movie + cinema + showtime combination.

---

# PART 9 — Select a showtime

Display the showtimes for the currently selected cinema.

Only one showtime can be selected at once.

When the user changes the showtime:

- the new showtime becomes visually selected
- previously selected seats are cleared
- the promo/discount is cleared
- the seat map updates to show sold seats for the new showtime
- the booking summary updates

---

# PART 10 — Generate the seat map

The page contains an empty seat-grid area. JavaScript must create the seats.

Create **40 seats** arranged as:

- Row A: A1–A8
- Row B: B1–B8
- Row C: C1–C8
- Row D: D1–D8
- Row E: E1–E8

Seat types:

- Rows A, B and C are **Standard**
- Rows D and E are **VIP**

Prices:

- Standard: **90,000 ₫**
- VIP: **130,000 ₫**

The correct visual class from the CSS should make VIP seats look different.

---

# PART 11 — Select and unselect seats

When the user clicks an available seat:

- the seat becomes selected
- its visual appearance changes
- its seat ID appears in the booking summary
- subtotal and total are recalculated

Clicking the same selected seat again must remove it from the selection and recalculate the order.

### Maximum seats

A user can select at most **6 seats** in one booking.

If 6 seats are already selected and the user clicks a seventh available seat:

- do not select the seventh seat
- keep the existing 6 seats selected
- show a useful error message in the seat-message area

---

# PART 12 — Booking summary

The summary panel must always reflect the current state of the booking.

It must show:

- movie title
- cinema name
- showtime
- selected seat IDs
- subtotal
- discount
- final total

If no seats are selected:

- seat value should display a clear empty value such as `—`
- subtotal = 0
- discount = 0
- total = 0
- `Review booking` must be disabled

### Price example

User chooses:

- A1 — Standard = 90,000
- B4 — Standard = 90,000
- D2 — VIP = 130,000

Expected subtotal:

`310,000 ₫`

---

# PART 13 — Promo codes

Implement these three promo codes.

## STUDENT10

Condition: no special seat requirement.

Effect: **10% off subtotal**.

Example:

Subtotal = 300,000 ₫

Discount = 30,000 ₫

Total = 270,000 ₫

## WEEKEND50

Condition: the user must currently have at least **4 seats selected**.

Effect: subtract **50,000 ₫**.

If fewer than 4 seats are selected, the promo must be rejected and an error message shown.

## VIP20

Condition: at least **one selected seat must be VIP**.

Effect: **20% off subtotal**.

If no VIP seat is selected, reject it.

### General promo behavior

- promo codes should ignore uppercase/lowercase differences
- invalid codes show an error
- successful codes show a success message
- only one promo is active at a time
- applying a different valid code replaces the previous code
- final total cannot show stale values

### Important dependency behavior

If a promo stops being valid because the user changes the selected seats, remove that discount automatically.

Examples:

- `WEEKEND50` is active with 4 seats; user removes one seat → promo must be removed
- `VIP20` is active; user removes the only VIP seat → promo must be removed

---

# PART 14 — Review booking modal

Clicking `Review booking` must open the provided modal.

The modal must display a final preview containing at least:

- movie
- cinema
- showtime
- selected seats
- promo code or `None`
- final price

The user must still be able to go back without booking.

The modal must close when:

- user clicks `Go back`
- user clicks the dark backdrop outside the modal
- user presses `Escape`

Closing the modal must **not** clear the current booking selections.

---

# PART 15 — Confirm a booking

When `Confirm & book` is clicked, create a ticket record.

Each ticket must save enough information to rebuild the ticket later on the My Tickets page.

Store at least:

- unique booking ID
- movie ID and title
- movie genre
- cinema ID and name
- cinema location
- showtime
- all selected seat IDs
- which selected seats are Standard
- which selected seats are VIP
- subtotal
- promo code, if any
- discount
- final total
- booking date/time

Then navigate to `tickets.html`.

When the tickets page opens after a successful booking, show a visible success message containing the new booking ID.

---

# PART 16 — Sold-seat logic

A confirmed seat must become unavailable for the exact same:

**movie + cinema + showtime**

combination.

Example:

User books A1 for:

- Neon Horizon
- CineSeat Central
- 18:10

After booking, if they return to that exact movie/cinema/showtime, A1 must appear sold and cannot be clicked.

However A1 should still be available for:

- another movie at the same cinema/time
- the same movie at another cinema
- the same movie and cinema at another showtime

Your app therefore needs to distinguish booking schedules correctly instead of treating `A1` as globally sold.

---

# PART 17 — Persist website state

Bookings and sold-seat data must survive a normal browser refresh.

The following scenario must work:

1. book seats A1 and A2
2. arrive at My Tickets
3. refresh the page
4. ticket still exists
5. return to booking page for the same schedule
6. A1 and A2 are still sold

Do not rely only on normal JavaScript variables because those reset whenever a new page loads.

---

# PART 18 — My Tickets page

`tickets.html` must display every confirmed ticket.

Each ticket preview must show at least:

- booking ID
- booking creation date/time
- movie title
- cinema
- showtime
- seat IDs
- total paid

The header navigation should also show the number of currently saved tickets, for example:

`My Tickets (3)`

The hero counter on this page must show the same number.

---

# PART 19 — Empty My Tickets state

If no tickets exist:

- show the provided empty-state section
- hide/leave empty the normal ticket list
- the user should have a clear way to return to browse movies

If tickets exist, the empty state must not remain visible.

---

# PART 20 — Search tickets

The search field on My Tickets must filter existing tickets immediately.

A ticket should match when the search text appears in useful booking information such as:

- booking ID
- movie title
- cinema name
- location
- seat ID

Search must ignore uppercase/lowercase differences and support partial text.

### Example

Searching `A1` should display bookings containing seat A1.

Searching `central` should display bookings at CineSeat Central.

If tickets exist but none match the search, show an appropriate `no matching bookings` message instead of the global `No tickets yet` state.

---

# PART 21 — Sort tickets

Implement all provided sorting choices:

- newest booking first
- showtime order
- highest total first

Sorting should apply after the current search filter.

---

# PART 22 — View full ticket details

Each ticket card has a `Details` button.

Clicking it opens the details modal.

The modal must show the complete booking information, including at least:

- booking ID
- booking date/time
- movie
- cinema and location
- showtime
- all seats
- Standard seats
- VIP seats
- subtotal
- promo code or `None`
- discount
- total paid

The modal closes using its Close button, backdrop click, or Escape key.

---

# PART 23 — Cancel a ticket

Each ticket has a Cancel button.

Do **not** immediately delete the booking when Cancel is clicked.

First open the confirmation modal showing enough information for the user to identify the booking.

If the user chooses `Keep ticket`, close the modal and change nothing.

If the user confirms cancellation:

1. remove that ticket from saved bookings
2. update the ticket counters
3. remove the ticket card from the UI
4. free every seat belonging to that ticket for that exact movie/cinema/showtime
5. if no tickets remain, show the empty state

### Critical test

1. Book D1 and D2 for Movie A, Cinema B, 20:00.
2. Verify D1 and D2 are sold when returning to that schedule.
3. Cancel that ticket from My Tickets.
4. Return to the exact schedule.
5. D1 and D2 must be available again.

---

# PART 24 — Keyboard and modal behavior

The `Escape` key must close any open modal on the booking and tickets pages.

Clicking inside a modal must **not** close it accidentally.

Clicking the modal backdrop should close it.

The promo field should also support pressing Enter to attempt to apply the code.

---

# PART 25 — Avoid duplicate click handling

Several parts of this interface contain many dynamically created elements:

- movie cards
- cinema choices
- showtime choices
- 40 seats
- ticket cards

Your implementation must remain stable after rerendering these areas many times.

### Required outcome

If the user changes filters, cinemas, showtimes, seats, or ticket search repeatedly, one click must still perform one action only.

The app must not start adding duplicate actions or running the same booking logic multiple times after rerenders.

---

# PART 26 — Full scenario test

Your finished project should pass this complete workflow:

1. Open `index.html`.
2. Six movie cards appear.
3. Search for a movie.
4. Filter by genre.
5. Sort by rating.
6. Clear filters.
7. Choose a movie.
8. Booking page shows that movie.
9. Change cinema.
10. Choose a showtime.
11. Select A1, B2, D3 and D4.
12. Summary shows the correct mix of Standard and VIP prices.
13. Apply `VIP20`.
14. Total decreases by 20%.
15. Remove D3 and D4.
16. Because no VIP seats remain, the VIP discount disappears.
17. Select D5 again.
18. Apply `STUDENT10`.
19. Open Review Booking.
20. Close it with Escape; selections remain.
21. Open it again and confirm.
22. My Tickets opens with a success message.
23. The new ticket appears.
24. Refresh the page; the ticket remains.
25. Open Details and verify all values.
26. Search using one of the seat IDs.
27. Clear search.
28. Cancel the booking and confirm.
29. The ticket disappears.
30. Return to the same booking schedule; the previously booked seats are available again.

---

# PART 27 — Code quality expectations

Your app is much larger than the previous single-page assignment. Do not place the entire project inside one giant click handler.

Your JavaScript should be organized into clear responsibilities such as:

- data
- state
- rendering
- calculations
- storage
- event handling
- modal behavior
- page initialization

Names should describe what values/functions are for.

Avoid unnecessarily repeating the same logic in multiple places. If the same calculation or lookup is needed in different features, make that behavior reusable.

Do not change the HTML every time you need data. Treat your JavaScript data/state as the source of information and update the UI from it.

---

# Optional challenges

These are not required for the base assignment.

## Challenge A — Booking date selector

Allow the user to select a cinema date. Sold seats must then also depend on the date.

## Challenge B — Movie favorites

Allow users to favorite movies from the Movies page and add a `Favorites only` filter.

## Challenge C — Ticket status

Instead of deleting cancelled tickets, keep them in history with a `Cancelled` status while still freeing the seats.

## Challenge D — Multiple ticket types

Before selecting seats, allow the user to choose Adult/Student/Child ticket quantities with different prices.

## Challenge E — Prevent impossible past showtimes

Use the current time and disable showtimes that have already passed today.

---

# Submission checklist

Before submitting, verify all of the following:

- [ ] All movie cards are generated by JavaScript.
- [ ] Search movies works.
- [ ] Genre filter works.
- [ ] Movie sorting works.
- [ ] Search + filter + sort work together.
- [ ] Choosing a movie opens the booking page.
- [ ] Selected movie survives refresh/navigation.
- [ ] Three cinemas are available.
- [ ] Cinema selection changes its showtimes.
- [ ] Showtime selection works.
- [ ] 40 seats are generated.
- [ ] Standard and VIP seats have different prices.
- [ ] Seats can be selected/unselected.
- [ ] Maximum 6-seat rule works.
- [ ] Booking summary is always correct.
- [ ] STUDENT10 works.
- [ ] WEEKEND50 validates 4-seat requirement.
- [ ] VIP20 validates VIP-seat requirement.
- [ ] Invalid promo messages work.
- [ ] Promo is removed if its condition becomes invalid.
- [ ] Review modal works.
- [ ] Escape closes modals.
- [ ] Confirming creates a ticket.
- [ ] Every ticket gets a unique booking ID.
- [ ] Tickets survive page refresh.
- [ ] Sold seats survive page refresh.
- [ ] Sold seats are specific to movie + cinema + showtime.
- [ ] My Tickets counter is correct.
- [ ] Ticket search works.
- [ ] Ticket sorting works.
- [ ] Ticket Details modal works.
- [ ] Cancel confirmation works.
- [ ] Cancelling frees the seats again.
- [ ] Empty states work.
- [ ] Repeated rerendering does not cause duplicate actions.
- [ ] Browser console contains no uncaught errors during normal use.
