//Live code here
///////////////////////////////////////////////////////////
// Sticky Navigation
const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);
    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  }, {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: '-80px',
  }
);
obs.observe(sectionHeroEl);


// Smooth Scrolling Animation

const allLinks = document.querySelectorAll("a:link");
console.log(allLinks);
allLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    // console.log(e);
    e.preventDefault();

    const href = link.getAttribute('href');
    // console.log(href);

    // Scroll back to top
    if (href === "#") window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      // console.log(sectionEl);
      sectionEl.scrollIntoView({
        behavior: "smooth"
      })
    }

    // Close Mobile Navigation
    if (link.classList.contains('main-nav-link'))
      headerEl.classList.toggle("nav-open");
  });
});

const listHarga = {
  cpu: {
    "i3": 3000000,
    "i5": 3500000,
    "i7": 4500000
  },
  memory: {
    "512gb": 1000000,
    "1tb": 2000000
  },
  ram: {
    "8gb": 1000000,
    "16gb": 1500000,
    "32gb": 3000000
  },
  vga: {
    "rtx3050": 6500000,
    "rtx3060": 7500000,
    "rtx3070": 10000000,
    "rtx3080": 12000000
  },
  monitor: {
    "16in": 2500000,
    "19in": 3000000,
    "24in": 4000000,
    "32in": 7000000
  },
  keyboard: {
    "60%red": 1000000,
    "60%brown": 1000000,
    "60%blue": 1000000,
    "65%red": 1500000,
    "65%brown": 1500000,
    "65%blue": 1500000,
    "100%red": 2500000,
    "100%brown": 2500000,
    "100%blue": 2500000
  }
}
let addPricei3 = document.getElementById("i3")
addPricei3.innerHTML += `<li class="meal-attribute">
<ion-icon class="meal-icon" name="cash-outline"></ion-icon>
<span>Price: &colon; <strong> Rp. ${new Intl.NumberFormat(['ban', 'id']).format(listHarga.cpu.i3)},- </strong></span
>
</li>`

let addPricei5 = document.getElementById("i5")
addPricei5.innerHTML += `<li class="meal-attribute">
<ion-icon class="meal-icon" name="cash-outline"></ion-icon>
<span>Price: &colon; <strong> Rp. ${new Intl.NumberFormat(['ban', 'id']).format(listHarga.cpu.i5)},- </strong></span
></li>`

let addPricei7 = document.getElementById("i7")
addPricei7.innerHTML += `<li class="meal-attribute">
<ion-icon class="meal-icon" name="cash-outline"></ion-icon>
<span>Price: &colon; <strong> Rp. ${new Intl.NumberFormat(['ban', 'id']).format(listHarga.cpu.i7)},- </strong></span
>
</li>`

// DOM
// Total Harga
function submitForm(event) {
  event.preventDefault();

}

const checkout = document.querySelector('#checkout')
const modal_container = document.getElementById('modal_container')
const close = document.getElementById('close')
const cancel = document.getElementById('cancel')

checkout.addEventListener('click', (event) => {
  event.preventDefault()
  let ramHtml = document.getElementById("ram").value
  let memoryHtml = document.getElementById("memory").value
  let cpuHtml = document.getElementById("cpu").value
  let vgaHtml = document.getElementById("vga").value
  let monitorHtml = document.getElementById("monitor").value
  let keyboardHtml = document.getElementById("keyboard").value
  if (ramHtml !== '' && memoryHtml !== '' && cpuHtml !== '' && vgaHtml !== '' && monitorHtml !== '' && keyboardHtml !== '') {
    let totalPrice = parseInt(listHarga.cpu[cpuHtml]) + parseInt(listHarga.ram[ramHtml]) + parseInt(listHarga.memory[memoryHtml]) + parseInt(listHarga.keyboard[keyboardHtml]) + parseInt(listHarga.vga[vgaHtml]) + parseInt(listHarga.monitor[monitorHtml])
    let total = document.getElementById("total")
    total.innerText = `Rp ${new Intl.NumberFormat(['ban', 'id']).format(totalPrice)},-`

    let orderCode = document.getElementById("code")
    let generateRandom5Digit = Math.floor(10000 + Math.random() * 90000);
    orderCode.innerText = generateRandom5Digit
    modal_container.classList.add('show')
  }
})

cancel.addEventListener('click', () => {
  modal_container.classList.remove('show')
})



const name = document.getElementById('name')
const address = document.getElementById('address')
const confirm1 = document.getElementById('confirm')
const code = document.getElementById('code')

confirm1.onclick = function (event) {
  event.preventDefault()
  let ramHtml = document.getElementById("ram").value
  let memoryHtml = document.getElementById("memory").value
  let cpuHtml = document.getElementById("cpu").value
  let vgaHtml = document.getElementById("vga").value
  let monitorHtml = document.getElementById("monitor").value
  let keyboardHtml = document.getElementById("keyboard").value
  let totalPrice = parseInt(listHarga.cpu[cpuHtml]) + parseInt(listHarga.ram[ramHtml]) + parseInt(listHarga.memory[memoryHtml]) + parseInt(listHarga.keyboard[keyboardHtml]) + parseInt(listHarga.vga[vgaHtml]) + parseInt(listHarga.monitor[monitorHtml])
  const key = code.innerText
  const value = name.value
  const value1 = address.value
  if (key && value) {
    localStorage.setItem(key, [value, value1, ramHtml, memoryHtml, cpuHtml, vgaHtml, monitorHtml, keyboardHtml, totalPrice])
    location.reload
    modal_container.classList.remove('show')
  }
}

const order = document.getElementById("btn-status");
order.onclick = function (event) {
  event.preventDefault();
  const orderCode = document.getElementById("order-code").value;
  const text = document.getElementById("order-list");

  for (const key in localStorage) {
    const cancel_order = document.getElementById('cancel-order')
    if (orderCode == key) {
      const orderResult = localStorage.getItem(key).split(",");
      const word = `Nama: ${orderResult[0]}\nAddress: ${orderResult[1]}\nRAM: ${orderResult[2]}\nMemory: ${orderResult[3]}\nProcessor: ${orderResult[4]}\nVGA: ${orderResult[5]}\nMonitor: ${orderResult[6]}\nKeyboard: ${orderResult[7]}\nTotal payment: Rp ${new Intl.NumberFormat(['ban', 'id']).format(Number(orderResult[8]))},-\n Transfer to Virtual Account 875412345${orderCode}`
      console.log(word);
      text.innerText = word;
      cancel_order.classList.add('show')
      break;
    } else {
      cancel_order.classList.remove('show')
      text.innerText = `Order doesn't exist`
    }
  }
}

const cancelOrder = document.getElementById("cancel-order");
cancelOrder.onclick = function (event) {
  event.preventDefault();
  const text = document.getElementById("order-list");
  const orderCode = document.getElementById("order-code").value;
  localStorage.removeItem(orderCode);
  text.innerText = `Order has been cancelled`
}