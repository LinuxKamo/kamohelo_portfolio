import React, { useEffect, useRef } from 'react';

const PROJECT_PALETTES = [
  ['#b08d3a', '#facc15', '#fbbf24', '#fef08a'], // 0: Gold/Yellow (matches main theme)
  ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'], // 1: Blues
  ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0'], // 2: Greens
  ['#f43f5e', '#fb7185', '#fda4af', '#fecdd3'], // 3: Rose/Reds
  ['#a855f7', '#c084fc', '#d8b4fe', '#e9d5ff'], // 4: Purples
];

export function ParticlesBackground({ projectIndex }) {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const animationFrameId = useRef(null);
  
  // Heartbeat state
  const heartbeatProgress = useRef(0); 
  const isHeartbeating = useRef(false);

  // Handle color changes and heartbeat trigger when project index changes
  useEffect(() => {
    isHeartbeating.current = true;
    heartbeatProgress.current = 0;
    
    // Update colors of existing particles
    const palette = PROJECT_PALETTES[projectIndex % PROJECT_PALETTES.length];
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    const centerX = width / 2;
    const centerY = height / 2;

    particles.current.forEach(p => {
      p.targetColor = palette[Math.floor(Math.random() * palette.length)];
      
      // Pull particles slightly toward the center when project changes
      // This creates a "suck in and explode" feel
      p.x = p.x + (centerX - p.x) * 0.5;
      p.y = p.y + (centerY - p.y) * 0.5;
      
      // Ensure outward velocity is pointing away from center
      const angle = Math.atan2(p.y - centerY, p.x - centerX);
      const speed = Math.random() * 2 + 1;
      p.vx = Math.cos(angle) * speed;
      p.vy = Math.sin(angle) * speed;
    });
  }, [projectIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Initialize particles once
    if (particles.current.length === 0) {
      const palette = PROJECT_PALETTES[0];
      const centerX = width / 2;
      const centerY = height / 2;
      
      for (let i = 0; i < 80; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.5 + 0.5;
        
        particles.current.push({
          x: centerX + (Math.random() * width - width/2),
          y: centerY + (Math.random() * height - height/2),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          baseRadius: Math.random() * 2 + 1,
          color: palette[Math.floor(Math.random() * palette.length)],
          targetColor: palette[Math.floor(Math.random() * palette.length)]
        });
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      let scaleMultiplier = 0;
      let speedMultiplier = 1;

      if (isHeartbeating.current) {
        heartbeatProgress.current += 0.06; // slightly slower heartbeat
        if (heartbeatProgress.current >= Math.PI * 2) {
          isHeartbeating.current = false;
          heartbeatProgress.current = 0;
        } else {
          const pulseValue = Math.abs(Math.sin(heartbeatProgress.current));
          scaleMultiplier = pulseValue * 2.5; 
          speedMultiplier = 1 + pulseValue * 6; // Fast explosion
        }
      }

      const centerX = width / 2;
      const centerY = height / 2;

      // Update and draw particles
      particles.current.forEach(p => {
        // Move
        p.x += p.vx * speedMultiplier;
        p.y += p.vy * speedMultiplier;

        // If particle goes off screen, respawn it at the center!
        // This ensures they constantly flow OUT of the project preview
        if (p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
           const angle = Math.random() * Math.PI * 2;
           const speed = Math.random() * 1.5 + 0.5;
           
           // Spawn area matches roughly the project preview box
           p.x = centerX + (Math.random() * 300 - 150);
           p.y = centerY + (Math.random() * 200 - 100);
           
           p.vx = Math.cos(angle) * speed;
           p.vy = Math.sin(angle) * speed;
           p.color = p.targetColor; // update color on respawn
        }

        // Apply color change
        if (p.color !== p.targetColor) {
           p.color = p.targetColor;
        }

        // Calculate distance from center to fade in particles as they spawn
        const distFromCenter = Math.sqrt(Math.pow(p.x - centerX, 2) + Math.pow(p.y - centerY, 2));
        const opacity = Math.min(distFromCenter / 150, 1); // fade in from center

        // Draw
        ctx.beginPath();
        const currentRadius = p.baseRadius * (1 + scaleMultiplier);
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        
        ctx.globalAlpha = opacity;
        ctx.shadowBlur = 10 + (scaleMultiplier * 5);
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0; // reset
      });

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ width: '100%', height: '100%', opacity: 0.6 }}
    />
  );
}
