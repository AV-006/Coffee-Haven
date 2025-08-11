const modeToggle = document.getElementById("modeToggle");
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  modeToggle.textContent = "☀️";
}
modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    modeToggle.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    modeToggle.textContent = "🌙";
  }
});

const navLinks = document.querySelectorAll("#navLinks a");
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
    loadPage(link.dataset.page);
  });
});

const features = [
  { title: "Espresso", desc: "Rich and bold espresso shot." },
  { title: "Latte", desc: "Smooth coffee with milk." },
  { title: "Cappuccino", desc: "Perfectly frothed coffee delight." },
];

function loadPage(page) {
  const content = document.getElementById("content");
  if (page === "home") {
    content.innerHTML = `
      <section class="hero">
        <h1>Welcome to Coffee Haven</h1>
        <p>Your daily dose of freshly brewed coffee.</p>
        <button>Order Now</button>
      </section>
      <section class="features">
        <h2>Our Specialties</h2>
        <div class="card-container">
          ${features
            .map(
              (f) => `
            <div class="card">
              <h3>${f.title}</h3>
              <p>${f.desc}</p>
            </div>`
            )
            .join("")}
        </div>
      </section>
    `;
  } else if (page === "menu") {
    content.innerHTML = `
      <section>
        <h2>Our Menu</h2>
        <div class="card-container">
          <div class="card"><h3>Americano</h3><p>Hot water with espresso.</p></div>
          <div class="card"><h3>Mocha</h3><p>Chocolate flavored coffee delight.</p></div>
          <div class="card"><h3>Flat White</h3><p>Smooth microfoam coffee.</p></div>
        </div>
      </section>
    `;
  } else if (page === "contact") {
    content.innerHTML = `
      <section class="contact">
        <h2>Contact Us</h2>
        <form id="contactForm">
          <input type="text" id="name" placeholder="Name" required>
          <input type="email" id="email" placeholder="Email" required>
          <textarea id="message" placeholder="Message" required></textarea>
          <button type="submit">Send</button>
        </form>
      </section>
    `;
    document
      .getElementById("contactForm")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();
        if (!name || !email || !message) {
          alert("Please fill all fields.");
          return;
        }
        localStorage.setItem(
          "contactData",
          JSON.stringify({ name, email, message })
        );
        alert("Message saved locally!");
        this.reset();
      });
  }
}

loadPage("home");
