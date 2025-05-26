class MouseTrail {
    constructor() {
        this.particles = [];
        this.maxParticles = 20;
        this.init();
    }

    init() {
        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '9999';
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => this.mouseMove(e));
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    mouseMove(e) {
        this.particles.push({
            x: e.clientX,
            y: e.clientY,
            size: Math.random() * 5 + 2,
            speedX: Math.random() * 3 - 1.5,
            speedY: Math.random() * 3 - 1.5,
            life: 1
        });

        if (this.particles.length > this.maxParticles) {
            this.particles.shift();
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            p.life -= 0.02;
            p.x += p.speedX;
            p.y += p.speedY;
            p.size *= 0.95;

            this.ctx.fillStyle = `rgba(130, 255, 250, ${p.life})`;
            this.ctx.fillRect(p.x - p.size, p.y - p.size, p.size, p.size);
        }

        this.particles = this.particles.filter(p => p.life > 0);
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize the mouse trail when the page loads
window.addEventListener('load', () => {
    new MouseTrail();
}); 