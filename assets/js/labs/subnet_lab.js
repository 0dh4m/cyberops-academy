/**
 * Copyright (C) 2026 Adham Cherkaoui Eddeqaqi (0dh4m). All rights reserved.
 * Proprietary and confidential. Unauthorized copying or distribution is strictly prohibited.
 * Author: Adham Cherkaoui Eddeqaqi (0dh4m) <adamcherkaoui99@gmail.com>
 * GitHub: https://github.com/0dh4m
 */

/**
 * CyberOps Academy - Visual CIDR & Subnet Calculator Lab
 * IPv4 subnet calculation, 32-bit binary bitmask stream, RFC 1918 scope
 */
const SubnetLab = {
  init() {
    const ipInput = document.getElementById("subnet-ip-input");
    const cidrSlider = document.getElementById("subnet-cidr-slider");
    const cidrVal = document.getElementById("subnet-cidr-val");

    const update = () => {
      if (cidrVal && cidrSlider) cidrVal.innerText = "/" + cidrSlider.value;
      this.calculate();
    };

    if (ipInput) ipInput.addEventListener("input", update);
    if (cidrSlider) cidrSlider.addEventListener("input", update);

    // Initial calculation
    this.calculate();
  },

  calculate() {
    const ipStr = document.getElementById("subnet-ip-input")?.value.trim() || "192.168.1.100";
    const cidr = parseInt(document.getElementById("subnet-cidr-slider")?.value || "24", 10);
    const resBox = document.getElementById("subnet-result-box");
    if (!resBox) return;

    const ipParts = ipStr.split(".").map(Number);
    if (ipParts.length !== 4 || ipParts.some(p => isNaN(p) || p < 0 || p > 255)) {
      resBox.innerHTML = `<div class="error-msg">❌ Invalid IPv4 address format. Please enter an address like 192.168.1.100</div>`;
      return;
    }

    // IP to 32-bit integer
    const ipInt = (ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3];

    // Mask to 32-bit integer
    const maskInt = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
    const netInt = (ipInt & maskInt) >>> 0;
    const bcastInt = (netInt | (~maskInt >>> 0)) >>> 0;

    const intToIp = (num) => [
      (num >>> 24) & 255,
      (num >>> 16) & 255,
      (num >>> 8) & 255,
      num & 255
    ].join(".");

    const netIp = intToIp(netInt);
    const maskIp = intToIp(maskInt);
    const bcastIp = intToIp(bcastInt);

    // Usable hosts
    let totalHosts = Math.pow(2, 32 - cidr);
    let usableHosts = cidr >= 31 ? (cidr === 31 ? 2 : 1) : Math.max(0, totalHosts - 2);

    let firstHost = cidr >= 31 ? netIp : intToIp(netInt + 1);
    let lastHost = cidr >= 31 ? bcastIp : intToIp(bcastInt - 1);

    // IP Scope & Class
    let ipClass = "A";
    if (ipParts[0] >= 128 && ipParts[0] <= 191) ipClass = "B";
    else if (ipParts[0] >= 192 && ipParts[0] <= 223) ipClass = "C";
    else if (ipParts[0] >= 224 && ipParts[0] <= 239) ipClass = "D (Multicast)";
    else if (ipParts[0] >= 240) ipClass = "E (Experimental)";

    let isPrivate = false;
    if (ipParts[0] === 10) isPrivate = true;
    else if (ipParts[0] === 172 && (ipParts[1] >= 16 && ipParts[1] <= 31)) isPrivate = true;
    else if (ipParts[0] === 192 && ipParts[1] === 168) isPrivate = true;

    // Render visual bits representation
    const ipBin = ipParts.map(p => p.toString(2).padStart(8, '0')).join('');
    let visualBitsHtml = '';
    for (let i = 0; i < 32; i++) {
      if (i > 0 && i % 8 === 0) visualBitsHtml += '<span class="bit-sep">.</span>';
      const isNet = i < cidr;
      visualBitsHtml += `<span class="bit ${isNet ? 'bit-net' : 'bit-host'}">${ipBin[i]}</span>`;
    }

    resBox.innerHTML = `
      <div class="subnet-summary-grid">
        <div class="sub-metric">
          <span class="sub-label">Network Address (Adresse Réseau):</span>
          <span class="sub-val net-val">${netIp} /${cidr}</span>
        </div>
        <div class="sub-metric">
          <span class="sub-label">Subnet Mask (Masque de Sous-Réseau):</span>
          <span class="sub-val">${maskIp}</span>
        </div>
        <div class="sub-metric">
          <span class="sub-label">Broadcast Address (Adresse de Diffusion):</span>
          <span class="sub-val bcast-val">${bcastIp}</span>
        </div>
        <div class="sub-metric">
          <span class="sub-label">Usable Host Range (Plage d'Hôtes Valides):</span>
          <span class="sub-val">${firstHost} ➔ ${lastHost}</span>
        </div>
        <div class="sub-metric">
          <span class="sub-label">Usable Hosts (Nombre d'Hôtes Utilisables):</span>
          <span class="sub-val host-count-val">${usableHosts.toLocaleString()} hosts</span>
        </div>
        <div class="sub-metric">
          <span class="sub-label">Type & Class (Classe et Portée IP):</span>
          <span class="sub-val">Class ${ipClass} • ${isPrivate ? '🔒 Private (RFC 1918)' : '🌐 Public Internet'}</span>
        </div>
      </div>

      <div class="binary-bits-container">
        <div class="bits-title">Binary Bitmask Stream (Représentation Binaire des 32 Bits):</div>
        <div class="bits-stream">${visualBitsHtml}</div>
        <div class="bits-legend">
          <span class="legend-item"><span class="legend-color net"></span> Network Bits (${cidr})</span>
          <span class="legend-item"><span class="legend-color host"></span> Host Bits (${32 - cidr})</span>
        </div>
      </div>
    `;
  }
};

window.SubnetLab = SubnetLab;
