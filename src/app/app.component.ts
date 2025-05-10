import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      @for (litten of littens; track litten.id) {
        <div class="litten-container" [style.z-index]="litten.depth">
          <img 
            #littenImg
            [src]="litten.isShiny ? '/assets/ShinyLitten.png' : '/assets/Litten.png'"
            [style.top.px]="litten.top + litten.verticalOffset"
            [style.left.px]="litten.left"
            [style.transform]="'rotate(' + litten.rotation + 'deg) scaleX(' + (litten.isFlipped ? -1 : 1) + ')'"
            class="litten"
            [class.shiny]="litten.isShiny"
            alt="Litten"
          />
          <img 
            src="/assets/littenShadow.png"
            [style.top.px]="litten.top + 40"
            [style.left.px]="litten.left + 20"
            class="shadow"
            alt="Shadow"
          />
        </div>
      }
    </div>
  `,
  styles: [`
    .container {
      width: 100vw;
      height: 100vh;
      background-color: #00ff00;
      background-image: url('/assets/grassfield.png');
      background-repeat: repeat;
      background-size: 1000px;
      position: relative;
      overflow: hidden;
      image-rendering: pixelated;
      image-rendering: -moz-crisp-edges;
      image-rendering: crisp-edges;
    }

    .litten-container {
      position: absolute;
    }

    .litten {
      position: absolute;
      width: 150px;
      height: auto;
      image-rendering: pixelated;
      image-rendering: -moz-crisp-edges;
      image-rendering: crisp-edges;
      transition: left 0.1s linear;
      transform-origin: center center;
      z-index: 2;
    }

    .shadow {
      position: absolute;
      width: 100px;
      height: auto;
      transition: left 0.1s linear;
      opacity: 0.5;
      mix-blend-mode: multiply;
      z-index: 1;
    }

    .shiny {
      filter: brightness(1.2) contrast(1.2);
    }
  `]
})
export class AppComponent implements OnInit {
  @ViewChild('littenImg', { static: false }) littenImg!: ElementRef;
  littens: { 
    id: number; 
    top: number; 
    left: number; 
    isShiny: boolean; 
    speed: number; 
    verticalOffset: number;
    rotation: number;
    phase: number;
    frequency: number;
    lastBump: number;
    depth: number;
    isPaused: boolean;
    pauseEndTime: number;
    isFlipped: boolean;
    flipCount: number;
    lastFlipTime: number;
    direction: 'left' | 'right';
  }[] = [];
  private littenCount = 0;
  private animationFrame: number = 0;
  private lastTimestamp: number = 0;

  constructor() {
    this.animate = this.animate.bind(this);
  }

  @HostListener('window:resize')
  onResize() {
    // Update top positions for all littens
    this.littens = this.littens.map(litten => ({
      ...litten,
      top: Math.min(litten.top, window.innerHeight - 150),
      depth: Math.floor(litten.top) // Simpler depth calculation
    }));
  }

  ngOnInit() {
    this.startLittenSpawn();
    this.lastTimestamp = performance.now();
    this.animate();
  }

  ngOnDestroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  private animate(timestamp: number = 0) {
    const deltaTime = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;

    // Update positions of all littens
    this.littens = this.littens.map(litten => {
      // Check if litten should pause
      if (!litten.isPaused && Math.random() < 0.001) { // 0.1% chance to pause each frame
        return {
          ...litten,
          isPaused: true,
          pauseEndTime: timestamp + (1000 + Math.random() * 2000), // Random pause between 1-3 seconds
          flipCount: 0,
          lastFlipTime: timestamp,
          isFlipped: litten.direction === 'right' // Reset to base direction when pausing
        };
      }

      // Handle instant side switching when paused
      if (litten.isPaused && litten.flipCount < 4 && timestamp - litten.lastFlipTime >= 250) {
        return {
          ...litten,
          isFlipped: !litten.isFlipped,
          flipCount: litten.flipCount + 1,
          lastFlipTime: timestamp
        };
      }

      // Check if pause should end
      if (litten.isPaused && timestamp >= litten.pauseEndTime) {
        return {
          ...litten,
          isPaused: false,
          pauseEndTime: 0,
          isFlipped: litten.direction === 'right' // Reset to base direction when resuming
        };
      }

      // Only update position if not paused
      const newLeft = litten.isPaused ? litten.left : 
        litten.left + (litten.direction === 'right' ? 1 : -1) * (litten.speed * deltaTime / 16);
      const newPhase = litten.phase + (litten.frequency * deltaTime / 16);
      const newRotation = Math.sin(newPhase) * 10; // Rotate between -10 and 10 degrees
      
      // Handle bump animation
      let newVerticalOffset = litten.verticalOffset;
      if (timestamp - litten.lastBump > 200) { // Every 0.2 seconds
        if (litten.verticalOffset === 0) {
          newVerticalOffset = -10; // Bump up (negative moves up in CSS)
        } else if (timestamp - litten.lastBump > 400) { // After 0.2 seconds
          newVerticalOffset = 0; // Return down
          litten.lastBump = timestamp;
        }
      }
      
      return {
        ...litten,
        left: newLeft,
        phase: newPhase,
        rotation: newRotation,
        verticalOffset: newVerticalOffset,
        depth: Math.floor(litten.top) // Only use base top position for depth
      };
    });

    // Remove littens that are off screen
    this.littens = this.littens.filter(litten => 
      (litten.direction === 'left' && litten.left > -150) || 
      (litten.direction === 'right' && litten.left < window.innerWidth + 150)
    );

    this.animationFrame = requestAnimationFrame(this.animate);
  }

  private startLittenSpawn() {
    setInterval(() => {
      const isShiny = Math.random() < 1/683; // Masuda Method odds
      const speed = 2 + Math.random(); // Random speed between 2 and 3
      const frequency = 0.02 + Math.random() * 0.03; // Random frequency for different wave patterns
      const top = Math.random() * (window.innerHeight - 150) + 10; // Add 10px to base position
      const direction = Math.random() < 0.5 ? 'left' : 'right'; // Random direction
      
      this.littens.push({
        id: this.littenCount++,
        top,
        left: direction === 'left' ? window.innerWidth : -150,
        isShiny,
        speed,
        verticalOffset: 0,
        rotation: 0,
        phase: Math.random() * Math.PI * 2, // Random starting phase
        frequency,
        lastBump: performance.now(),
        depth: Math.floor(top), // Simpler depth calculation
        isPaused: false,
        pauseEndTime: 0,
        isFlipped: direction === 'right', // Flip the sprite based on direction
        flipCount: 0,
        lastFlipTime: 0,
        direction
      });
    }, 200); // Spawn a litten every 0.2 seconds (increased from 0.5)
  }
}
