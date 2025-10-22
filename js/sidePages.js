document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
      preloader.classList.add('fade-out');
      setTimeout(() => {
          preloader.style.display = 'none';
      }, 500);
      
    document.querySelector(".hero-scroll").addEventListener("click", () => {
      window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth"
      });
    });
    
    document.addEventListener("scroll", ()=>{
      let scrollBtn = document.querySelector(".scroll-top");
      if(!scrollBtn){
        scrollBtn = document.createElement("div");
        scrollBtn.className = "scroll-top";
        scrollBtn.textContent = "↑"
        scrollBtn.addEventListener("click", ()=>{
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          })
        })
        document.body.appendChild(scrollBtn);
      }
      if(window.scrollY > 100){
        scrollBtn.classList.add("active");
      }else{
        scrollBtn.classList.remove("active");
      }
    })


    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
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

