let currentIndex = 0;
const slides = document.querySelectorAll('.slider a');
const cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartDisplay();

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
}

setInterval(nextSlide, 5000);

function toggleDropdown() {
  const dropdown = document.getElementById("productDropdown");
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

document.addEventListener("click", function (e) {
  const dropdown = document.getElementById("productDropdown");
  const button = document.querySelector(".dropbtn");
  if (!button.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.style.display = "none";
  }
});

document.querySelectorAll('.product').forEach(prod => {
  const name = prod.querySelector('h3').innerText;
  const price = parseFloat(prod.querySelector('.price').innerText.replace('лв.', '').trim());

  prod.querySelector('button').addEventListener('click', () => {
    const item = cart.find(p => p.name === name);
    if (item) {
      item.qty += 1;
    } else {
      cart.push({ name, price, qty: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    showAddedMessage(name, price);
  });
});

document.querySelector('.search-box button').addEventListener('click', () => {
  const term = document.querySelector('.search-box input').value.toLowerCase();
  document.querySelectorAll('.product').forEach(prod => {
    const name = prod.querySelector('h3').innerText.toLowerCase();
    prod.style.display = name.includes(term) ? 'block' : 'none';
  });
});

function updateCartDisplay() {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartLink = document.getElementById('cartLink');
  if (cartLink) cartLink.innerHTML = `<span class="cart-icon">🛒</span> Количка / ${total.toFixed(2)}лв.`;

}

function showAddedMessage(name, price) {
  let msg = document.createElement('div');
  msg.className = 'success-login';
  msg.style.position = 'fixed';
  msg.style.top = '10px';
  msg.style.right = '20px';
  msg.style.backgroundColor = '#4caf50';
  msg.style.color = 'white';
  msg.style.padding = '10px 20px';
  msg.style.borderRadius = '4px';
  msg.style.fontWeight = 'bold';
  msg.style.zIndex = '999';
  msg.textContent = `Продукт "${name}", на стойност ${price.toFixed(2)}лв., беше добавен в количката Ви успешно.`;
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 3000);
}

setTimeout(function () {
  const loginMsg = document.getElementById("loginMsg");
  if (loginMsg) {
    loginMsg.style.display = "none";
  }
}, 3000);

const clearBtn = document.createElement('button');
clearBtn.textContent = 'Изчисти количката';
clearBtn.addEventListener('click', () => {
  cart.length = 0;
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
});

const cartBox = document.querySelector('.cart-box');
if (cartBox) cartBox.appendChild(clearBtn);


document.querySelectorAll('.buy-button').forEach(btn => {
  btn.addEventListener('click', () => {
    const name = btn.getAttribute('data-name');
    const price = parseFloat(btn.getAttribute('data-price'));

    const stored = JSON.parse(localStorage.getItem('cart')) || [];
    const item = stored.find(p => p.name === name);
    if (item) {
      item.qty += 1;
    } else {
      stored.push({ name, price, qty: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(stored));

    cart.length = 0;
    cart.push(...stored);
    updateCartDisplay();

    const msg = document.createElement('div');
    msg.className = 'success-login';
    msg.textContent = `Продукт "${name}", на стойност ${price.toFixed(2)}лв., беше добавен в количката Ви успешно.`;
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 3000);
  });
});

