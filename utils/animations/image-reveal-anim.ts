import { gsap } from "gsap";

function imageRevealAnimation() {
   const tp_img_reveal = document.querySelectorAll(".tp_img_reveal");
   if(tp_img_reveal.length > 0) {
     tp_img_reveal.forEach((img_reveal) => {
       let image = img_reveal.querySelector("img");
       let tl = gsap.timeline({
         scrollTrigger: {
           trigger: img_reveal,
           start: "top 70%",
         }
       });
       
       tl.set(img_reveal, { autoAlpha: 1 });
       
       tl.from(img_reveal, {
         xPercent: -100,
         ease: "power2.out",
         duration: 1.5
       });
       
       tl.from(image, {
         xPercent: 100,
         scale: 1.5,
         delay: -1.5,
         ease: "power2.out",
         duration: 1.5
       });
     });
   }
}

export { imageRevealAnimation };