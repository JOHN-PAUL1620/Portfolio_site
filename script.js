const modal=document.querySelector("#modal"), player=document.querySelector("#player");
document.querySelectorAll(".card").forEach(c=>c.addEventListener("click",()=>{
 player.src=c.dataset.video;document.querySelector("#modalType").textContent=c.dataset.type;
 document.querySelector("#modalTitle").textContent=c.dataset.title;modal.classList.add("open");document.body.style.overflow="hidden";player.play().catch(()=>{});
}));
function close(){modal.classList.remove("open");player.pause();player.removeAttribute("src");player.load();document.body.style.overflow=""}
document.querySelector(".close").onclick=close;modal.onclick=e=>{if(e.target===modal)close()};document.onkeydown=e=>{if(e.key==="Escape")close()};
const navbar=document.querySelector(".navbar");
const progress=document.querySelector(".progress");
function updateScrollDetails(){
 const maxScroll=document.documentElement.scrollHeight-innerHeight;
 progress.style.transform=`scaleX(${maxScroll>0?scrollY/maxScroll:0})`;
 navbar.classList.toggle("is-scrolled",scrollY>24);
}
window.addEventListener("scroll",updateScrollDetails,{passive:true});
updateScrollDetails();

const sectionLinks=[...document.querySelectorAll('.navbar nav a[href^="#"]')];
const sectionObserver=new IntersectionObserver(entries=>{
 entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  sectionLinks.forEach(link=>{
   const active=link.hash===`#${entry.target.id}`;
   link.classList.toggle("is-active",active);
   if(active)link.setAttribute("aria-current","location");
   else link.removeAttribute("aria-current");
  });
 });
},{rootMargin:"-35% 0px -55% 0px"});
sectionLinks.forEach(link=>{
 const section=document.querySelector(link.hash);
 if(section)sectionObserver.observe(section);
});

const revealItems=document.querySelectorAll(".statement, .section-title, .card, .about-grid, .process-strip, .service-row, .contact > *");
revealItems.forEach(item=>item.classList.add("reveal"));
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
 if(entry.isIntersecting){entry.target.classList.add("is-visible");revealObserver.unobserve(entry.target)}
}),{threshold:.12});
revealItems.forEach(item=>revealObserver.observe(item));
