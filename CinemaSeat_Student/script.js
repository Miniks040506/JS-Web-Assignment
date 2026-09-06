// CineSeat Multi-Page Teacher Solution
// All pages use this single file. Each page initializes only its own features.

const MOVIES = [
  {
    id: 1,
    title: "Neon Horizon",
    genre: "Sci-Fi",
    duration: 128,
    rating: 8.7,
    age: "T13",
    posterClass: "",
    description: "A rescue pilot follows a mysterious signal beyond Earth's last orbital city.",
  },
  {
    id: 2,
    title: "Paper Hearts",
    genre: "Romance",
    duration: 104,
    rating: 8.1,
    age: "T13",
    posterClass: "alt2",
    description: "Two university students keep finding anonymous notes inside the same library book.",
  },
  {
    id: 3,
    title: "The Last Lantern",
    genre: "Adventure",
    duration: 116,
    rating: 8.5,
    age: "P",
    posterClass: "alt3",
    description: "A brother and sister cross a flooded kingdom to return a legendary lantern.",
  },
  {
    id: 4,
    title: "Midnight Recipe",
    genre: "Comedy",
    duration: 97,
    rating: 7.9,
    age: "P",
    posterClass: "alt4",
    description: "A struggling chef accidentally turns a tiny night market stall into the city's hottest restaurant.",
  },
  {
    id: 5,
    title: "Echo Room",
    genre: "Thriller",
    duration: 111,
    rating: 8.4,
    age: "T16",
    posterClass: "alt5",
    description: "A sound engineer hears a voice in a recording that should have been completely silent.",
  },
  {
    id: 6,
    title: "Blue Current",
    genre: "Drama",
    duration: 121,
    rating: 8.2,
    age: "T13",
    posterClass: "alt6",
    description: "A young swimmer returns home and rebuilds a relationship with her former coach.",
  },
];

const CINEMAS = [
  { id: "c1", name: "CineSeat Landmark", location: "Bình Thạnh", showtimes: ["10:15", "13:30", "16:45", "20:00"] },
  { id: "c2", name: "CineSeat Central", location: "District 1", showtimes: ["09:45", "12:50", "18:10", "21:20"] },
  { id: "c3", name: "CineSeat Riverside", location: "Thu Duc", showtimes: ["11:00", "14:20", "17:40", "20:50"] },
];

const PRICES = { standard: 90000, vip: 130000 };
const MAX_SEATS = 6;
const STORAGE_KEYS = {
  selectedMovie: "cineseat_selected_movie",
  tickets: "cineseat_tickets",
  occupied: "cineseat_occupied_seats",
};

const makeSeatDefinitions = () => {
    const rows = ["A", "B", "C", "D", "E"];
    return rows.flatMap((row) => 
        Array.from({ length: 8 }, (_, index) => ({
            id: `${row}${index + 1}`,
            row,
            number: index + 1,
            type: ["D", "E"].includes(row) ? "vip" : "standard",
        })),
    );
};

const SEATS = makeSeatDefinitions();

const makeBookingId = () => {
    const random = Math.floor(1000 + Math.random() * 9000); //[0,1) -> [1000, 9999)
    return `CS-${Date.now().toString().slice(-6)}-${random}`;
};

// Convenient function
const getJSON = (key, fallback) => {
    try {
        const value = JSON.parse(localStorage.getItem(key));
        return value ?? fallback;
    } catch (error) {
        return fallback;
    }
};
const setJSON = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const byId = (id) => document.getElementById(id);
const getMovie = (id) => MOVIES.find((movie) => movie.id === id);
const getCinema = (id) => CINEMAS.find((cinema) => cinema.id === id);
const getOccupiedMap = () => getJSON(STORAGE_KEYS.occupied, {});
const saveOccupiedMap = (map) => setJSON(STORAGE_KEYS.occupied, map);
const bookingKey = (movieId, cinemaId, showtime) => `${movieId}|${cinemaId}|${showtime}`;
const money = (value) => new Intl.NumberFormat("vi-VN").format(value) + " ₫";
const getTickets = () => getJSON(STORAGE_KEYS.tickets, []);
const saveTickets = (tickets) => setJSON(STORAGE_KEYS.tickets, tickets);

const updateTicketCount = () => {
    const node = byId("ticketCount");
    if (!node) return;
    const count = getTickets().length;
    node.textContent = count ? `(${count})` : "";
};


// Init functions for pages
function initMoviesPage() {
    const movieGrid = byId("movieGrid");
    if (!movieGrid) return;
    
    const searchInput = byId("searchInput");
    const genreFilter = byId("genreFilter");
    const sortSelect = byId("sortSelect");
    const movieEmpty = byId("movieEmpty");
    
    byId("movieCount").textContent = MOVIES.length;
    
    // spread operator: [...]
    // [...new Set(array)]
    // array genre = array cua movie . map
    const genres = [...new Set(MOVIES.map(movie => movie.genre))].sort();
    genres.forEach((genre) => {
        const option = document.createElement("option");
        option.value = genre;
        option.textContent = genre;
        genreFilter.append(option);
    });
    
    const renderMovies = () => {
        const keyword = searchInput.value.trim().toLowerCase();
        const genre = genreFilter.value;
        const sort = sortSelect.value;
        
        let visible = MOVIES.filter((movie) => {
            const matchesSearch = movie.title.toLowerCase().includes(keyword);
            const matchesGenre = genre === "all" || movie.genre === genre;
            return matchesGenre && matchesSearch;
        });
        
        visible = [...visible];
        if (sort === "rating-desc") visible.sort((a, b) => b.rating - a.rating);
        if (sort === "duration-asc") visible.sort((a, b) => a.duration - b.duration);
        if (sort === "title-asc") visible.sort((a, b) => a.title.localeCompare(b.title));
        
        movieGrid.innerHTML = visible.map((movie) => `
            <article class="movie-card" data-movie-id="${movie.id}">
                <div class="poster ${movie.posterClass}"><span class="poster-badge">${movie.genre}</span></div>
                <div class="movie-body">
                <h3>${movie.title}</h3>
                <p class="muted">${movie.description}</p>
                <div class="tags">
                    <span class="tag">★ ${movie.rating}</span>
                    <span class="tag">${movie.duration} min</span>
                    <span class="tag">${movie.age}</span>
                </div>
                <button class="btn btn-primary choose-movie" data-movie-id="${movie.id}">Choose movie</button>
                </div>
            </article>
        `).join("");
        
        movieEmpty.classList.toggle("hidden", visible.length > 0);
    }; 
    
    // tag/field/control
    [searchInput, genreFilter, sortSelect].forEach((control) => {
        control.addEventListener(control.tagName === "INPUT" ? "input" : "change", renderMovies);
    });
    
    movieGrid.addEventListener("click", (event) => {
        const button = event.target.closest(".choose-movie"); 
        if (!button) return;
        const movieId = Number(button.dataset.movieId);
        setJSON(STORAGE_KEYS.selectedMovie, movieId);
        window.location.href = "booking.html";
    });
    
    renderMovies();
}

function initBookingPage() {
    const seatGrid = byId("seatGrid");
    if (!seatGrid) return;
    
    let selectedMovieId = Number(getJSON(STORAGE_KEYS.selectedMovie, 0));
    if (!getMovie(selectedMovieId)) selectedMovieId = MOVIES[0].id;
    
    let selectedCinemaId = CINEMAS[0].id;
    let selectedShowtime = CINEMAS[0].showtimes[0];
    let selectedSeats = [];
    let promo = null;
    
    const selectedMovieSummary = byId("selectedMovieSummary");
    const cinemaList = byId("cinemaList");
    const showtimeList = byId("showtimeList");
    const promoMessage = byId("promoMessage");
    const promoInput = byId("promoInput");
    const confirmModal = byId("confirmModal");
    const seatMessage = byId("seatMessage");
    
    const currentMovie = () => getMovie(selectedMovieId);
    const currentCinema = () => getCinema(selectedCinemaId);
    
    const renderMovieSummary = () => {
        const movie = currentMovie();
        selectedMovieSummary.innerHTML = `
            <div class="movie-thumb ${movie.posterClass}">${movie.genre}</div>
            <div><div class="eyebrow">Selected movie</div><h2>${movie.title}</h2>
            <p class="muted">★ ${movie.rating} • ${movie.duration} min • ${movie.age}</p>
            <p class="muted">${movie.description}</p></div>
        `;
    };
    
    const renderCinemas = () => {
        cinemaList.innerHTML = CINEMAS.map((cinema) => `
            <button class="choice ${cinema.id === selectedCinemaId ? "selected" : ""}" data-cinema-id="${cinema.id}">
                <strong>${cinema.name}</strong><br><small>${cinema.location}</small>
            </button>
        `).join("");
    };
    
    const renderShowtimes = () => {
        const cinema = currentCinema();
        if (!cinema.showtimes.includes(selectedShowtime)) {
            selectedShowtime = cinema.showtimes[0];
        }
        showtimeList.innerHTML = cinema.showtimes.map((time) => `
            <button class="choice ${time === selectedShowtime ? "selected" : ""}" data-showtime="${time}">${time}</button>
        `).join("");
    };
    
    const currentOccupiedSeats = () => {
        const map = getOccupiedMap();
        return map[bookingKey(selectedMovieId, selectedCinemaId, selectedShowtime)] || [];
    }; //array
    
    const selectedSeatObjects = () => SEATS.filter((seat) => selectedSeats.includes(seat.id)); //array
    
    const renderSeats = () => {
        const occupied = currentOccupiedSeats();
        seatGrid.innerHTML = SEATS.map((seat) => {
            const isOccupied = occupied.includes(seat.id);
            const isSelected = selectedSeats.includes(seat.id);
            return `<button class="seat ${seat.type === "vip" ? "vip" : ""} ${isSelected ? "selected" : ""} ${isOccupied ? "occupied" : ""}" data-seat-id="${seat.id}" ${isOccupied ? "disabled" : ""}>${seat.id}</button>`;
        }).join("");
    }; // .dataset.seatId
    
    // recheck promo 
    const subtotal = () => selectedSeatObjects().reduce((sum, seat) => sum + PRICES[seat.type], 0);
    
    const discountAmount = () => {
        const sub = subtotal();
        if (!promo) return 0; //falsy
        if (promo.code === "STUDENT10") return Math.round(sub * 0.1);
        if (promo.code === "WEEKEND50" && selectedSeats.length >= 4) return 50000;
        if (promo.code === "VIP20" && selectedSeatObjects().some((seat) => seat.type === "vip")) 
            return Math.round(sub * 0.2);
        return 0;
    };
    
    const validatePromo = (code) => {
        const normalize = code.trim().toUpperCase();
        if (!normalize)  
            return { ok: false, message: "Enter a promo code first."};
        if (normalize === "STUDENT10") 
            return { ok: true, code: normalize, message: "10% student discount applied."};
        if (normalize === "WEEKEND50") {
            if (selectedSeats.length < 4) 
                return { ok: false, message: "WEEKEND50 requires at least 4 selected seats."};
            return { ok: true, code: normalize, message: "50,000 đ discount applied."};
        }
        if (normalize === "VIP20") {
            const hasVip = selectedSeatObjects().some((seat) => seat.type === "vip");
            if (!hasVip) 
                return { ok: false, message: "VIP20 requires at least one VIP seat."}
            return { ok: true, code: normalize, message: "20% VIP discount applied."}
        }
        return { ok: false, message: "Promo code is not valid."}
    }; //zod
    
    const recheckPromo = () => {
        if (!promo) return;
        const result = validatePromo(promo.code);
        if (!result.ok) {
            promo = null;
            promoMessage.textContent = result.message + " Discount removed.";
            promoMessage.className = "message error";
        }
    };
    
    // summary
    const renderSummary = () => {
        const movie = currentMovie();
        const cinema = currentCinema();
        const sub = subtotal();
        const discount = discountAmount();
        
        byId("sumMovie").textContent = movie.title;
        byId("sumCinema").textContent = cinema.name;
        byId("sumShowtime").textContent = selectedShowtime;
        byId("sumSeats").textContent = selectedSeats.length ? selectedSeats.join(", ") : "-";
        byId("sumSubtotal").textContent = money(sub);
        byId("sumDiscount").textContent = discount ? `-${money(discount)}` : money(0);
        byId("sumTotal").textContent = money(sub - discount);
        byId("bookBtn").disabled = selectedSeats.length === 0;
    };
    
    const resetSeatsAfterScheduleChange = () => {
        selectedSeats = [];
        promo = null;
        promoInput.value = "";
        promoMessage.textContent = "";
        seatMessage.textContent = "";
        renderSeats();
        renderSummary();
    };
    
    // cinema + showtime click
    cinemaList.addEventListener("click", (event) => {
        const button = event.target.closest("[data-cinema-id]");
        if (!button || button.dataset.cinemaId === selectedCinemaId) return;
        selectedCinemaId = button.dataset.cinemaId;
        selectedShowtime = currentCinema().showtimes[0];
        renderCinemas();
        renderShowtimes();
        resetSeatsAfterScheduleChange();
    });
    
    showtimeList.addEventListener("click", (event) => {
        const button = event.target.closest("[data-showtime]");
        if (!button || button.dataset.showtime === selectedShowtime) return;
        selectedShowtime = button.dataset.showtime;
        renderShowtimes();
        resetSeatsAfterScheduleChange(); 
    });
    
    seatGrid.addEventListener("click", (event) => {
        const button = event.target.closest("[data-seat-id]");
        if (!button || button.disabled) return;
        
        const seatId = button.dataset.seatId;
        const alreadySelected = selectedSeats.includes(seatId);
        
        if (alreadySelected) {
            selectedSeats = selectedSeats.filter((id) => id !== seatId);
            seatMessage.textContent = `${seatId} removed.`;
            seatMessage.className = "message";
        } else {
            if (selectedSeats.length >= MAX_SEATS) {
                seatMessage.textContent = `You can select at most ${MAX_SEATS} seats.`;
                seatMessage.className = "message error";
                return;
            }
            selectedSeats.push(seatId);
            seatMessage.textContent = `${seatId} selected.`;
            seatMessage.className = "message";
        }
        
        recheckPromo();
        renderSeats();
        renderSummary();
    });
    
    byId("applyPromoBtn").addEventListener("click", () => {
        const result = validatePromo(promoInput.value);
        if (result.ok) {
            promo = {code: result.code};
            promoInput.value = result.code;
            promoMessage.textContent = result.message;
            promoMessage.className = "message success";
        } else {
            promo = null;
            promoMessage.textContent = result.message;
            promoMessage.className = "message error";
        }
        renderSummary();
    });
    
    promoInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") 
            byId("applyPromoBtn").click();
    });
    
    byId("changeMovieBtn").addEventListener("click", () => {
        window.location.href = "index.html";
    });
    
    const showReviewBookingModal = () => {
        if (!selectedSeats.length) return;
        
        const movie = currentMovie();
        const cinema = currentCinema();
        const sub = subtotal();
        const discount = discountAmount();
        
        byId("modalBookingDetails").innerHTML = `
            <div class="detail-grid">
                <div class="detail-item"><small>Movie</small><strong>${movie.title}</strong></div>
                <div class="detail-item"><small>Cinema</small><strong>${cinema.name}</strong></div>
                <div class="detail-item"><small>Showtime</small><strong>${selectedShowtime}</strong></div>
                <div class="detail-item"><small>Seats</small><strong>${selectedSeats.join(", ")}</strong></div>
                <div class="detail-item"><small>Promo</small><strong>${promo ? promo.code : "None"}</strong></div>
                <div class="detail-item"><small>Total</small><strong>${money(sub - discount)}</strong></div>
            </div>
        `;
        
        confirmModal.classList.remove("hidden");
    };
    
    const closeReviewBookingModal = () => confirmModal.classList.add("hidden");
    
    byId("bookBtn").addEventListener("click", showReviewBookingModal);
    byId("closeModalBtn").addEventListener("click", closeReviewBookingModal);
    
    confirmModal.addEventListener("click", (event) => {
        if (event.target === confirmModal) closeReviewBookingModal();
    });
    
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !confirmModal.classList.contains("hidden")) {
            closeReviewBookingModal();
        }
    });
    
    byId("confirmBookingBtn").addEventListener("click", () => {
        const latestOccupied = currentOccupiedSeats();
        const conflict = selectedSeats.some((seatId) => latestOccupied.includes(seatId));
        if (conflict) {
            closeReviewBookingModal();
            seatMessage.textContent = "One of these seats was just booked. Please select again.";
            seatMessage.className = "message error";
            selectedSeats = selectedSeats.filter((id) => !latestOccupied.includes(id));
            renderSeats();
            renderSummary();
            return;
        }
        
        const movie = currentMovie();
        const cinema = currentCinema();
        const sub = subtotal();
        const discount = discountAmount();
        
        const ticket = {
            id: makeBookingId(),
            movieId: movie.id,
            movieTitle: movie.title,
            genre: movie.genre,
            cinemaId: cinema.id,
            cinemaName: cinema.name,
            cinemaLocation: cinema.location,
            showtime: selectedShowtime,
            seats: [...selectedSeats],
            standardSeats: selectedSeatObjects()
                .filter((seat) => seat.type === "standard")
                .map((seat) => seat.id),   
            vipSeats: selectedSeatObjects()
                .filter((seat) => seat.type === "vip")
                .map((seat) => seat.id),
            subtotal: sub,
            promoCode: promo?.code || null,
            discount,
            total: sub - discount,
            bookedAt: new Date().toISOString(),  
        };
        
        const tickets = getTickets();
        tickets.unshift(ticket); //them 1 or n elements vao dau mang -> return new length
        saveTickets(tickets);
        
        const occupiedMap = getOccupiedMap();
        const key = bookingKey(selectedMovieId, selectedCinemaId, selectedShowtime);
        occupiedMap[key] = [...new Set([...(occupiedMap[key] || []), ...selectedSeats])];
        saveOccupiedMap(occupiedMap);
        
        sessionStorage.setItem("cineseat_last_booking", ticket.id);
        window.location.href = "tickets.html";
    });
    
    // show 
    // renderSummary();
    renderMovieSummary();
    renderCinemas();
    renderShowtimes();
    renderSeats();
    renderSummary();
}

function initTicketsPage() {
    const ticketList = byId("ticketList");
    if (!ticketList) return;
    
    const ticketSearch = byId("ticketSearch");
    const ticketSort = byId("ticketSort");
    const ticketEmpty = byId("ticketEmpty");
    const detailModal = byId("detailModal");
    const cancelModal = byId("cancelModal");
    let pendingCancelId = null;
    
    const lastBooking = sessionStorage.getItem("cineseat_last_booking");
    if (lastBooking) {
        const flash = document.createElement("div");
        flash.className = "flash";
        flash.textContent = `Booking ${lastBooking} comfirmed successfully.`;
        ticketList.before(flash);
        sessionStorage.removeItem("cineseat_last_booking");
    }
    
    const renderTickets = () => {
        const keyword = ticketSearch.value.trim().toLowerCase();
        const sort = ticketSort.value;
        
        let tickets = getTickets().filter((ticket) => {
            const searchable = `${ticket.id} ${ticket.movieTitle} ${ticket.cinemaName} ${ticket.cinemaLocation} ${ticket.seats.join(" ")}`.toLowerCase();
            return searchable.includes(keyword);
        });
        
        tickets = [...tickets];
        if (sort === "newest") tickets.sort((a, b) => new Date(b.bookedAt) - new Date(a.bookedAt));
        if (sort === "showtime") tickets.sort((a, b) => a.showtime.localeCompare(b.showtime));
        if (sort === "price-desc") tickets.sort((a, b) => b.total - a.total);
        
        byId("activeTicketCount").textContent = getTickets().length;
        ticketEmpty.classList.toggle("hidden", tickets.length > 0 || getTickets().length > 0);
        
        if (!tickets.length && getTickets().length > 0) {
            ticketList.innerHTML = `<div class="empty">No bookings match your search.</div>`;
            return;
        }
    
        ticketList.innerHTML = tickets.map((ticket) => `
            <article class="ticket" data-ticket-id="${ticket.id}">
                <div class="ticket-code">
                    <span class="muted">Booking ID</span>
                    <strong>${ticket.id}</strong>
                    <small>${new Date(ticket.bookedAt).toLocaleString("vi-VN")}</small>
                </div>
                <div class="ticket-info">
                    <div class="eyebrow">${ticket.genre}</div>
                    <h3>${ticket.movieTitle}</h3>
                    <div class="ticket-meta"><span>${ticket.cinemaName}</span><span>${ticket.showtime}</span><span>Seats ${ticket.seats.join(", ")}</span><span>${money(ticket.total)}</span></div>
                </div>
                <div class="ticket-actions">
                    <button class="btn btn-secondary view-ticket" data-ticket-id="${ticket.id}">Details</button>
                    <button class="btn btn-danger cancel-ticket" data-ticket-id="${ticket.id}">Cancel</button>
                </div>
            </article>
        `).join("");
    };
    
    const closeDetail = () => detailModal.classList.add("hidden");
    const closeCancel = () => {
        pendingCancelId = null;
        cancelModal.classList.add("hidden");
    };
    
    const openDetails = (ticketId) => {
        const ticket = getTickets().find((item) => item.id === ticketId);
        if (!ticket) return;
        
        byId("detailTitle").textContent = ticket.movieTitle;
        byId("detailContent").innerHTML = `
            <div class="detail-grid">
                <div class="detail-item"><small>Booking ID</small><strong>${ticket.id}</strong></div>
                <div class="detail-item"><small>Booked at</small><strong>${new Date(ticket.bookedAt).toLocaleString("vi-VN")}</strong></div>
                <div class="detail-item"><small>Cinema</small><strong>${ticket.cinemaName}</strong></div>
                <div class="detail-item"><small>Location</small><strong>${ticket.cinemaLocation}</strong></div>
                <div class="detail-item"><small>Showtime</small><strong>${ticket.showtime}</strong></div>
                <div class="detail-item"><small>Seats</small><strong>${ticket.seats.join(", ")}</strong></div>
                <div class="detail-item"><small>Standard seats</small><strong>${ticket.standardSeats.length ? ticket.standardSeats.join(", ") : "None"}</strong></div>
                <div class="detail-item"><small>VIP seats</small><strong>${ticket.vipSeats.length ? ticket.vipSeats.join(", ") : "None"}</strong></div>
                <div class="detail-item"><small>Subtotal</small><strong>${money(ticket.subtotal)}</strong></div>
                <div class="detail-item"><small>Promo</small><strong>${ticket.promoCode || "None"}</strong></div>
                <div class="detail-item"><small>Discount</small><strong>${money(ticket.discount)}</strong></div>
                <div class="detail-item"><small>Total paid</small><strong>${money(ticket.total)}</strong></div>
            </div>
        `;
        
        detailModal.classList.remove("hidden");
    };
    
    const openCancel = (ticketId) => {
        const ticket = getTickets().find((item) => item.id === ticketId);
        if (!ticket) return;
        
        pendingCancelId = ticketId;
        byId("cancelSummary").innerHTML = `
            <p><strong>${ticket.movieTitle}</strong> • ${ticket.cinemaName} • ${ticket.showtime}</p><p>Seats: <strong>${ticket.seats.join(", ")}</strong></p>
        `;
        
        cancelModal.classList.remove("hidden");
    };
    
    ticketList.addEventListener("click", (event) => {
        const viewButton = event.target.closest(".view-ticket");
        if (viewButton) return openDetails(viewButton.dataset.ticketId);
        
        const cancelButton = event.target.closest(".cancel-ticket");
        if (cancelButton) return openCancel(cancelButton.dataset.ticketId);
    });
    
    byId("confirmCancelBtn").addEventListener("click", () => {
        const tickets = getTickets();
        const ticket = tickets.find((item) => item.id === pendingCancelId);
        if (!ticket) return closeCancel();
        
        saveTickets(tickets.filter((item) => item.id !== pendingCancelId));
        
        const occupiedMap = getOccupiedMap();
        const key = bookingKey(ticket.movieId, ticket.cinemaId, ticket.showtime);
        occupiedMap[key] = (occupiedMap[key] || []).filter((seatId) => !ticket.seats.includes(seatId));
        
        if (!occupiedMap[key].length) delete occupiedMap[key];
        saveOccupiedMap(occupiedMap);
        
        closeCancel();
        updateTicketCount();
        renderTickets();
    });
    
    byId("closeDetailBtn").addEventListener("click", closeDetail);
    byId("keepTicketBtn").addEventListener("click", closeCancel);
    
    [detailModal, cancelModal].forEach((modal) => {
        modal.addEventListener("click", (event) => {
            if (event.target = modal) {
                modal.classList.add("hidden");
            }
        });
    });
    
    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;
        if (!detailModal.classList.contains("hidden")) closeDetail();
        if (!cancelModal.classList.contains("hidden")) closeCancel();
    });
    
    ticketSearch.addEventListener("input", renderTickets);
    ticketSort.addEventListener("change", renderTickets);
    
    renderTickets();
}

// initialize page
updateTicketCount();

// movies page
initMoviesPage();

// booking page
initBookingPage(); 

// ticket page
initTicketsPage();
