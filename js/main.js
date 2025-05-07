// Elementos del DOM
const header = document.querySelector("header")
const hamburger = document.getElementById("hamburger")
const mobileMenu = document.getElementById("mobile-menu")
const menuLinks = document.querySelectorAll(".nav-link")
const mobileMenuLinks = document.querySelectorAll(".mobile-nav-link")
const sections = document.querySelectorAll("section")
const contactForm = document.getElementById("form-contact")
const themeToggle = document.getElementById("theme-toggle")
const backToTop = document.getElementById("back-to-top")
const filterBtns = document.querySelectorAll(".filter-btn")
const projectItems = document.querySelectorAll(".project-item")
const testimonialDots = document.querySelectorAll(".testimonial-dot")
const testimonialWrapper = document.querySelector(".testimonial-wrapper")
const skillProgress = document.querySelectorAll(".skill-progress")
const revealElements = document.querySelectorAll(".reveal-element")

// Verificar si el usuario tiene preferencia de tema oscuro
if (
  localStorage.getItem("theme") === "dark" ||
  (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark")
} else {
  document.documentElement.classList.remove("dark")
}

// Función para alternar el tema
function toggleTheme() {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark")
    localStorage.setItem("theme", "light")
  } else {
    document.documentElement.classList.add("dark")
    localStorage.setItem("theme", "dark")
  }
}

// Evento para el botón de tema
themeToggle.addEventListener("click", toggleTheme)

// Función para manejar el menú móvil
function toggleMenu() {
  if (mobileMenu.classList.contains("h-0")) {
    mobileMenu.classList.remove("h-0")
    mobileMenu.classList.add("h-[calc(100vh-60px)]")
    hamburger.classList.add("active")
  } else {
    mobileMenu.classList.add("h-0")
    mobileMenu.classList.remove("h-[calc(100vh-60px)]")
    hamburger.classList.remove("active")
  }
}

// Evento para el botón hamburguesa
hamburger.addEventListener("click", toggleMenu)

// Cerrar menú al hacer clic en un enlace
mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("h-0")
    mobileMenu.classList.remove("h-[calc(100vh-60px)]")
    hamburger.classList.remove("active")
  })
})

// Cambiar estilo del header al hacer scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("py-2")
    header.classList.remove("py-4", "md:py-3")
  } else {
    header.classList.remove("py-2")
    header.classList.add("py-4", "md:py-3")
  }

  // Mostrar/ocultar botón de volver arriba
  if (window.scrollY > 500) {
    backToTop.classList.remove("opacity-0", "invisible")
    backToTop.classList.add("opacity-100", "visible")
  } else {
    backToTop.classList.add("opacity-0", "invisible")
    backToTop.classList.remove("opacity-100", "visible")
  }

  // Actualizar menú activo según la sección visible
  updateActiveMenu()

  // Revelar elementos al hacer scroll
  revealOnScroll()
})

// Función para actualizar el menú activo según la sección visible
function updateActiveMenu() {
  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  menuLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
}

// Botón volver arriba
backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Filtro de proyectos
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remover clase active de todos los botones
    filterBtns.forEach((b) => b.classList.remove("active"))
    // Añadir clase active al botón clickeado
    btn.classList.add("active")

    const filter = btn.getAttribute("data-filter")

    projectItems.forEach((item) => {
      if (filter === "all" || item.classList.contains(filter)) {
        item.style.display = "block"
      } else {
        item.style.display = "none"
      }
    })
  })
})

// Slider de testimonios
let currentTestimonial = 0

function showTestimonial(index) {
  const testimonialItems = document.querySelectorAll(".testimonial-item")
  const itemWidth = testimonialItems[0].offsetWidth
  const translateValue = -index * itemWidth

  testimonialWrapper.style.transform = `translateX(${translateValue}px)`

  // Actualizar dots
  testimonialDots.forEach((dot) => dot.classList.remove("active", "bg-primary-500"))
  testimonialDots[index].classList.add("active", "bg-primary-500")

  currentTestimonial = index
}

testimonialDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showTestimonial(index)
  })
})

// Auto cambio de testimonios
setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonialDots.length
  showTestimonial(currentTestimonial)
}, 5000)

// Animación de barras de progreso de habilidades
function animateSkills() {
  skillProgress.forEach((skill) => {
    const width = skill.getAttribute("data-width")
    skill.style.width = "0%"
    setTimeout(() => {
      skill.style.width = `${width}%`
      skill.style.transition = "width 1s ease-in-out"
    }, 200)
  })
}

// Efecto de escritura para el texto del hero
function typeEffect() {
  const typedTextElement = document.getElementById("typed-text")
  const texts = [
    "Desarrollador Web Full Stack",
    "Apasionado por el Backend",
    "Creador de Soluciones Tecnológicas"
  ];
  let textIndex = 0
  let charIndex = 0
  let isDeleting = false
  const typingSpeed = 100
  const erasingSpeed = 50
  const delayBetweenTexts = 2000

  function type() {
    const currentText = texts[textIndex]

    if (isDeleting) {
      // Borrar texto
      typedTextElement.textContent = currentText.substring(0, charIndex - 1)
      charIndex--

      if (charIndex === 0) {
        isDeleting = false
        textIndex = (textIndex + 1) % texts.length
        setTimeout(type, 500)
      } else {
        setTimeout(type, erasingSpeed)
      }
    } else {
      // Escribir texto
      typedTextElement.textContent = currentText.substring(0, charIndex + 1)
      charIndex++

      if (charIndex === currentText.length) {
        isDeleting = true
        setTimeout(type, delayBetweenTexts)
      } else {
        setTimeout(type, typingSpeed)
      }
    }
  }

  type()
}

// Revelar elementos al hacer scroll
function revealOnScroll() {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const windowHeight = window.innerHeight
    const delay = element.getAttribute("data-delay") || 0

    if (elementTop < windowHeight - 100) {
      setTimeout(() => {
        element.classList.add("animate-fade-in")
        element.style.opacity = "1"
      }, delay)
    }
  })
}

// Validación del formulario de contacto
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Obtener valores del formulario
    const name = document.getElementById("name").value.trim()
    const email = document.getElementById("email").value.trim()
    const subject = document.getElementById("subject").value.trim()
    const message = document.getElementById("message").value.trim()

    // Validación básica
    if (name === "" || email === "" || subject === "" || message === "") {
      alert("Por favor, completa todos los campos.")
      return
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert("Por favor, ingresa un correo electrónico válido.")
      return
    }

    // Aquí iría el código para enviar el formulario
    // Como es un ejemplo, solo mostramos un mensaje de éxito
    alert("¡Mensaje enviado con éxito! Te responderé lo antes posible.")
    contactForm.reset()
  })
}

// Inicializar todo al cargar la página
window.addEventListener("load", () => {
  // Actualizar menú activo al cargar
  updateActiveMenu()

  // Iniciar animación de escritura
  typeEffect()

  // Animar barras de progreso
  animateSkills()

  // Establecer opacidad inicial para elementos animados
  revealElements.forEach((element) => {
    element.style.opacity = "0"
  })

  // Ejecutar animaciones al cargar
  setTimeout(revealOnScroll, 100)

  // Mostrar primer testimonio
  showTestimonial(0)

  // Añadir estilos CSS para los enlaces activos
  const style = document.createElement("style")
  style.textContent = `
    .nav-link.active::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #0ea5e9;
    }
    
    .dark .nav-link.active::after {
      background-color: #38bdf8;
    }
    
    .hamburger.active span:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active span:nth-child(2) {
      opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }
    
    .filter-btn.active {
      background-color: #0ea5e9;
      color: white;
    }
    
    .dark .filter-btn.active {
      background-color: #0284c7;
    }
  `
  document.head.appendChild(style)
})

// Ajustar slider de testimonios al cambiar el tamaño de la ventana
window.addEventListener("resize", () => {
  showTestimonial(currentTestimonial)
})
