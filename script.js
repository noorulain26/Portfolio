gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0, 0);

const tlLoader = gsap.timeline();
tlLoader.to('.loader-text', {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: 'power4.out',
    delay: 0.2
})
    .to('.loader-text', {
        y: '-100%',
        opacity: 0,
        duration: 0.8,
        ease: 'power4.in',
        delay: 0.5
    })
    .to('.loader', {
        y: '-100%',
        duration: 1,
        ease: 'expo.inOut'
    })
    .to('.hero .word', {
        y: '0%',
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out'
    }, "-=0.5")
    .from('.hero-subtitle', {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power3.out'
    }, "-=0.8")
    .from('.hero .btn', {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power3.out'
    }, "-=0.6")
    .from('.hero-image-container', {
        opacity: 0,
        scale: 0.9,
        y: 50,
        duration: 2,
        ease: 'power4.out'
    }, "-=1.2")
    .from('nav', {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    }, "-=1");

const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

gsap.set(cursor, { opacity: 0 });
gsap.set(cursorFollower, { opacity: 0 });

let hasMouseMoved = false;

document.addEventListener('mousemove', (e) => {
    if (!hasMouseMoved) {
        hasMouseMoved = true;
        gsap.to([cursor, cursorFollower], { opacity: 1, duration: 0.5 });
    }
    mouseX = e.clientX;
    mouseY = e.clientY;
});

gsap.ticker.add(() => {
    cursorX += (mouseX - cursorX) * 0.5;
    cursorY += (mouseY - cursorY) * 0.5;

    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;

    gsap.set(cursor, { x: cursorX, y: cursorY });
    gsap.set(cursorFollower, { x: followerX, y: followerY });
});

const magneticEls = document.querySelectorAll('.magnetic');

magneticEls.forEach((el) => {
    el.addEventListener('mouseenter', () => {
        cursorFollower.classList.add('active');
        gsap.to(cursor, { scale: 0, duration: 0.3 });
    });

    el.addEventListener('mouseleave', () => {
        cursorFollower.classList.remove('active');
        gsap.to(cursor, { scale: 1, duration: 0.3 });
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
    });

    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;

        gsap.to(el, {
            x: distX * 0.3,
            y: distY * 0.3,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
});

const magneticCards = document.querySelectorAll('.magnetic-card');
magneticCards.forEach(card => {
    card.addEventListener('mouseenter', () => cursorFollower.classList.add('active'));
    card.addEventListener('mouseleave', () => {
        cursorFollower.classList.remove('active');
        gsap.to(card, { x: 0, y: 0, duration: 0.7, ease: 'power3.out' });
    });
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;

        gsap.to(card, {
            x: distX * 0.05,
            y: distY * 0.05,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
});

gsap.to('.hero-image-wrapper', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
    },
    y: 150,
    scale: 0.85,
    opacity: 0,
    ease: 'none'
});

gsap.to('.hero-image-container', {
    y: 12,
    duration: 4,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut'
});

gsap.to('.marquee-inner', {
    xPercent: -50,
    ease: 'none',
    duration: 15,
    repeat: -1
});

gsap.to('.scrub-word', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top 60%',
        end: 'bottom 40%',
        scrub: 0.5
    },
    color: (i, target) => target.classList.contains('accent-2') ? '#00ffcc' : '#ffffff',
    textShadow: (i, target) => target.classList.contains('accent-2') ? '0 0 20px rgba(0,255,204,0.5)' : '0 0 10px rgba(255,255,255,0.2)',
    stagger: 0.1,
    ease: 'none'
});

const cards = gsap.utils.toArray('.project-card');

gsap.to('.work-header', {
    scrollTrigger: {
        trigger: cards[0],
        start: 'top bottom',
        end: 'top center',
        scrub: true
    },
    opacity: 0,
    scale: 0.9,
    ease: 'none'
});

cards.forEach((card, i) => {
    if (i !== cards.length - 1) {
        gsap.to(card, {
            filter: 'brightness(0.2) blur(15px)',
            ease: 'none',
            scrollTrigger: {
                trigger: cards[i + 1],
                start: 'top bottom',
                end: 'top top',
                scrub: true
            }
        });
    }
});

document.querySelectorAll('.view-btn').forEach(btn => {
    btn.setAttribute('target', '_blank');
});

const glassPanels = document.querySelectorAll('.glass-panel');
glassPanels.forEach(panel => {
    panel.addEventListener('mousemove', (e) => {
        const rect = panel.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(panel, {
            rotationX: rotateX,
            rotationY: rotateY,
            z: 20,
            duration: 0.5,
            ease: 'power1.out'
        });
    });

    panel.addEventListener('mouseleave', () => {
        gsap.to(panel, {
            rotationX: 0,
            rotationY: 0,
            z: 0,
            duration: 0.7,
            ease: 'power3.out'
        });
    });
});
