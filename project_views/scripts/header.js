
window.addEventListener("scroll", function(){
    var header = document.querySelectorAll("header");
  
    header[0].classList.toggle("sticky", window.scrollY > 0);
    header[1].classList.toggle("sticky", window.scrollY > 0);
    header[2].classList.toggle("sticky", window.scrollY > 0);
    
})
