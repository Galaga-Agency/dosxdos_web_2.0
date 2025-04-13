/**
 * Animates the stats section: stat items fade in, numbers count up,
 * value items fade in with staggered timing.
 */
export function initAllAnimations() {
  console.log("🎯 initAllAnimations started");

  animateStatItems();
  initCounterAnimation();
  animateValueItems();
}

/**
 * Animate .stat-item: fade in + translateY
 */
export function animateStatItems() {
  const items = document.querySelectorAll('.stat-item');
  items.forEach((item, index) => {
    const el = item as HTMLElement;
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    }, index * 200);
  });
}

/**
 * Count up .stat-number elements from 0 to their final value
 */
export function initCounterAnimation() {
  const numbers = document.querySelectorAll('.stat-number');

  numbers.forEach((el) => {
    const element = el as HTMLElement;
    const target = parseInt(element.innerText.replace(/\D/g, ''), 10);
    const duration = 2000;
    const startTime = performance.now();

    function animate(time: number) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.round(progress * target);
      element.innerText = `+${value}`;
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.innerText = `+${target}`;
      }
    }

    requestAnimationFrame(animate);
  });
}

/**
 * Animate .value-item: fade in + translateY with stagger
 */
export function animateValueItems() {
  const items = document.querySelectorAll('.value-item');
  items.forEach((item, index) => {
    const el = item as HTMLElement;
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    }, 1200 + index * 200);
  });
}
