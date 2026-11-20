/**
 * CyberOps Academy - Real-Time Global Threat Radar & Attack Map Simulation
 * High-performance HTML5 Canvas rendering interactive radar sweep, node targets,
 * live vector attack arcs, and a synchronized SIEM threat feed ticker.
 */
class ThreatRadarEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.animationId = null;
    this.sweepAngle = 0;
    this.audioEnabled = false;
    this.arcs = [];
    this.events = [];
    this.maxEvents = 8;

    // Major global cybersecurity hubs (normalized 0.0 - 1.0 coordinates)
    this.nodes = [
      { id: "paris", name: "Paris, FR", x: 0.48, y: 0.35, ip: "195.154.12.8" },
      { id: "frankfurt", name: "Frankfurt, DE", x: 0.52, y: 0.33, ip: "194.25.0.12" },
      { id: "london", name: "London, UK", x: 0.46, y: 0.31, ip: "151.101.0.81" },
      { id: "casablanca", name: "Casablanca, MA", x: 0.44, y: 0.45, ip: "196.200.160.4" },
      { id: "newyork", name: "New York, US", x: 0.25, y: 0.37, ip: "199.16.156.6" },
      { id: "siliconvalley", name: "San Francisco, US", x: 0.14, y: 0.38, ip: "104.244.42.1" },
      { id: "tokyo", name: "Tokyo, JP", x: 0.86, y: 0.40, ip: "133.242.0.1" },
      { id: "singapore", name: "Singapore, SG", x: 0.76, y: 0.60, ip: "165.21.0.1" },
      { id: "sydney", name: "Sydney, AU", x: 0.88, y: 0.78, ip: "139.130.4.5" }
    ];

    this.attackTemplates = [
      { name: "LockBit 3.0 Ransomware", mitre: "T1486", color: "#ff0055", proto: "SMB/445" },
      { name: "APT29 DNS Exfiltration", mitre: "T1071", color: "#a855f7", proto: "DNS/53" },
      { name: "SQL Injection Authentication Bypass", mitre: "T1190", color: "#ffaa00", proto: "HTTPS/443" },
      { name: "SYN Flood Multi-Vector DDoS", mitre: "T1498", color: "#ef4444", proto: "TCP/80" },
      { name: "Kerberoast TGS Ticket Hijack", mitre: "T1558", color: "#00f0ff", proto: "Kerberos/88" },
      { name: "Spearphishing Macro Injection", mitre: "T1566", color: "#10b981", proto: "SMTP/25" }
    ];
  }

  init() {
    this.canvas = document.getElementById("threat-radar-canvas");
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext("2d");
    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());

    this.startAnimation();
    this.startThreatSpawner();

    console.log("📡 Threat Radar Engine Initialized.");
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = 360;
  }

  startAnimation() {
    const loop = () => {
      this.draw();
      this.animationId = requestAnimationFrame(loop);
    };
    this.animationId = requestAnimationFrame(loop);
  }

  startThreatSpawner() {
    setInterval(() => {
      if (document.hidden) return;
      this.spawnAttack();
    }, 2800);
  }

  spawnAttack() {
    if (!this.canvas) return;
    const originIdx = Math.floor(Math.random() * this.nodes.length);
    let targetIdx = Math.floor(Math.random() * this.nodes.length);
    while (targetIdx === originIdx) {
      targetIdx = Math.floor(Math.random() * this.nodes.length);
    }

    const origin = this.nodes[originIdx];
    const target = this.nodes[targetIdx];
    const attack = this.attackTemplates[Math.floor(Math.random() * this.attackTemplates.length)];

    const arc = {
      fromX: origin.x * this.canvas.width,
      fromY: origin.y * this.canvas.height,
      toX: target.x * this.canvas.width,
      toY: target.y * this.canvas.height,
      progress: 0,
      speed: 0.015 + Math.random() * 0.01,
      color: attack.color,
      attack,
      origin,
      target
    };

    this.arcs.push(arc);

    // Add event to feed
    this.addEventToFeed({
      time: new Date().toLocaleTimeString(),
      attack: attack.name,
      mitre: attack.mitre,
      color: attack.color,
      proto: attack.proto,
      origin: origin.name,
      target: target.name
    });

    if (this.audioEnabled && window.CyberAudio) {
      window.CyberAudio.playKeypress();
    }
  }

  addEventToFeed(ev) {
    this.events.unshift(ev);
    if (this.events.length > this.maxEvents) this.events.pop();

    const feedEl = document.getElementById("radar-threat-feed");
    if (!feedEl) return;

    feedEl.innerHTML = this.events.map(e => `
      <div class="radar-feed-row">
        <span class="feed-time">${e.time}</span>
        <span class="feed-tag" style="background: ${e.color}22; color: ${e.color}; border: 1px solid ${e.color}44;">${e.mitre}</span>
        <span class="feed-name">${e.attack}</span>
        <span class="feed-route">${e.origin} ➔ <strong>${e.target}</strong></span>
        <span class="feed-proto">${e.proto}</span>
      </div>
    `).join("");
  }

  draw() {
    if (!this.ctx || !this.canvas) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    // Dark grid background
    ctx.fillStyle = "rgba(5, 11, 20, 0.25)";
    ctx.fillRect(0, 0, w, h);

    // Center circular radar rings
    const cx = w / 2;
    const cy = h / 2;
    const maxR = Math.min(w, h) * 0.48;

    ctx.strokeStyle = "rgba(0, 240, 255, 0.07)";
    ctx.lineWidth = 1;
    for (let r = maxR / 4; r <= maxR; r += maxR / 4) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Crosshairs
    ctx.beginPath();
    ctx.moveTo(cx - maxR, cy);
    ctx.lineTo(cx + maxR, cy);
    ctx.moveTo(cx, cy - maxR);
    ctx.lineTo(cx, cy + maxR);
    ctx.stroke();

    // Rotating sweep line
    this.sweepAngle += 0.015;
    const sweepX = cx + Math.cos(this.sweepAngle) * maxR;
    const sweepY = cy + Math.sin(this.sweepAngle) * maxR;

    const grad = ctx.createLinearGradient(cx, cy, sweepX, sweepY);
    grad.addColorStop(0, "rgba(0, 240, 255, 0)");
    grad.addColorStop(1, "rgba(0, 240, 255, 0.2)");

    ctx.strokeStyle = "rgba(0, 240, 255, 0.4)";
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(sweepX, sweepY);
    ctx.stroke();

    // Draw Nodes
    this.nodes.forEach(node => {
      const nx = node.x * w;
      const ny = node.y * h;

      // Glow pulse
      ctx.fillStyle = "rgba(0, 240, 255, 0.8)";
      ctx.beginPath();
      ctx.arc(nx, ny, 3.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(148, 163, 184, 0.75)";
      ctx.font = "10px monospace";
      ctx.fillText(node.name, nx + 6, ny - 4);
    });

    // Draw & Update Attack Arcs
    for (let i = this.arcs.length - 1; i >= 0; i--) {
      const a = this.arcs[i];
      a.progress += a.speed;

      if (a.progress >= 1) {
        // Draw impact ring
        ctx.strokeStyle = a.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(a.toX, a.toY, 12, 0, Math.PI * 2);
        ctx.stroke();
        this.arcs.splice(i, 1);
        continue;
      }

      // Parabolic Arc
      const curX = a.fromX + (a.toX - a.fromX) * a.progress;
      const curY = a.fromY + (a.toY - a.fromY) * a.progress - Math.sin(a.progress * Math.PI) * 40;

      ctx.strokeStyle = a.color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(a.fromX, a.fromY);
      ctx.quadraticCurveTo((a.fromX + a.toX) / 2, (a.fromY + a.toY) / 2 - 50, curX, curY);
      ctx.stroke();

      // Leading beam head
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(curX, curY, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

window.ThreatRadar = new ThreatRadarEngine();
