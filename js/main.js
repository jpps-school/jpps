document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });  

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        });
    });

    // Announcement Slider
    
 function renderNoticeFunctions(){
    const announcementCards = document.querySelectorAll('.announcement-card');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentAnnouncement = 0;

    function showAnnouncement(index) {
        announcementCards.forEach(card => card.classList.remove('active'));
        announcementCards[index].classList.add('active');
        currentAnnouncement = index;
    }

    nextBtn.addEventListener('click', function() {
        let nextIndex = currentAnnouncement + 1;
        if (nextIndex >= announcementCards.length) {
            nextIndex = 0;
        }
        showAnnouncement(nextIndex);
        clearInterval(announcementInterval);
        announcementInterval = setInterval(autoSlide, 5000);
    });

    prevBtn.addEventListener('click', function() {
        let prevIndex = currentAnnouncement - 1;
        if (prevIndex < 0) {
            prevIndex = announcementCards.length - 1;
        }
        showAnnouncement(prevIndex);
        clearInterval(announcementInterval);
        announcementInterval = setInterval(autoSlide, 5000);
    });
    
    //function for announcementInterval
    function autoSlide(){
        let nextIndex = currentAnnouncement + 1;
        if (nextIndex >= announcementCards.length) {
            nextIndex = 0;
        }
        showAnnouncement(nextIndex);
    }    
    //Auto rotate announcements
    let announcementInterval = setInterval( autoSlide, 5000);

    // Pause on hover
    const announcementSlider = document.querySelector('.announcement-slider');
    announcementSlider.addEventListener('mouseenter', function() {
        clearInterval(announcementInterval);
    });
    announcementSlider.addEventListener('touchstart', function() {
        clearInterval(announcementInterval);
    });

    announcementSlider.addEventListener('mouseleave', function() {
        announcementInterval = setInterval(autoSlide, 5000);
    });
    announcementSlider.addEventListener('touchend', function() {
        announcementInterval = setInterval(autoSlide,  5000);
    });
 }
    
    
    //Fetching data for notices 
    let noticeBox = document.querySelector(".announcement-slider");
        fetch("https://opensheet.elk.sh/157doN3yo8TZeXSUFv4QKBRApofWHCCEVTo8Wh1LVtug/Notice").then(res=> res.json()).then(data=>{
        if(data.length == 0){
            return;
        }
        data.forEach((notice,index)=>{
            const wrapper = document.createElement("div");
            wrapper.classList.add("announcement-card");
            wrapper.innerHTML = `
                <div class="date-badge">${notice.Date}</div>
                <h3>${notice.Title}</h3>
                <p>${notice.Subject}</p>
                <a href="#announcement.html" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>`
            if(index === 0){
                wrapper.classList.add("active");
            }           
            noticeBox.appendChild(wrapper);
        })     
        renderNoticeFunctions();
    })


    // Testimonial Slider
 function renderTestimonialFunctions(){
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;    

    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showTestimonial(index);
        });
    });

    // Auto rotate testimonials
    setInterval(() => {
        let nextIndex = currentTestimonial + 1;
        if (nextIndex >= testimonials.length) {
            nextIndex = 0;
        }
        showTestimonial(nextIndex);
    }, 8000);
 }
    
let testimonialBox = document.querySelector(".testimonial-slider"); 
let testimonialDots = document.querySelector(".testimonial-dots"); 
    fetch("https://opensheet.elk.sh/1jtuFQ5c6_LzSeU2capFx5XcxTHzazN5_uWWf0ei6hko/Sheet1").then(res=> res.json()).then(data=>{
    if(data.length == 0){
        return;
    }
    data.forEach((testimonial,index)=>{
        const wrapper = document.createElement("div");
        const dot = document.createElement("span");
        dot.classList.add("dot");
        wrapper.classList.add("testimonial");
        wrapper.innerHTML =`
        <div class="quote">${testimonial.Subject}</div>
        <div class="author">
            <img src="img/testimonial.png" alt="Parent">
            <div class="author-info">
                 <h4>${testimonial.Name}</h4>
                 <p>${testimonial.About}</p>
            </div>
        </div>`       
        if(index === 0){
            wrapper.classList.add("active");
            dot.classList.add("active");
        }
        testimonialBox.appendChild(wrapper);  
        testimonialDots.appendChild(dot);
    });
    renderTestimonialFunctions();
});

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.feature-card, .quick-link-card, .section-title', '.facility-card', '.teacher-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight * 0.8;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Set initial state for animated elements
    document.querySelectorAll('.feature-card, .quick-link-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    document.querySelector('.section-title').style.opacity = '0';
    document.querySelector('.section-title').style.transform = 'translateY(-30px)';
    document.querySelector('.section-title').style.transition = 'opacity 0.5s ease, transform 0.5s ease';

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});

// Gallery Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});


 // Mobile Menu Toggle
 function toggleDrawer() {
    document.getElementById('navDrawer').classList.toggle('open');
    document.getElementById('drawerOverlay').classList.toggle('show');
    
    if(document.body.style.overflow == 'hidden'){
        document.body.style.overflow = 'scroll'
    }else{
        document.body.style.overflow = 'hidden'
    }
  }
  
  function toggleLinkCluster(element){
      element.classList.toggle("active");
      element.nextElementSibling.classList.toggle("active");
  }


const subscriptionForm = document.querySelector("#subscriptionForm");
subscriptionForm.addEventListener("submit", function(e) {
  e.preventDefault(); // prevent default form submission

  const overlay = document.querySelector("#formOverlay");
  overlay.style.display = "grid";
  const form = e.target;
  const formData = new FormData(form); // gather all input fields

  fetch("https://script.google.com/macros/s/AKfycby8HdfeXlVXXdQ8PBU0E8qNgMzf87aUvVcwX2DdE5_lSAUdPRGUvNhjFu29OtoUY-HdEQ/exec", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(response => {
    overlay.style.display = "none";
    alert(response.status)
    form.reset();
  })
  .catch(error => {
    alert("Submission failed.");
  });
});



  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/jpps/sw.js')
  }

  let box = document.getElementById("install-box");
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  setTimeout(()=>{
      box.style.display = 'flex';
      requestAnimationFrame(()=>{
          box.style.transform ="translate(-50%, 0px)";
      });
  },500);
  setTimeout(()=>{
      box.style.transform ="translate(-50%, -90px)";
      setTimeout(()=>{
          box.style.display="none";
      },500);
  },3500);
},{once:true});

document.getElementById('install-btn').addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();   
    deferredPrompt = null;
    box.style.transform ="translate(-50%, -90px)";
    setTimeout(()=>{
       box.style.display="none";
    },500);
  }
});

