(function () {
  let sensors = window.__INITIAL_SENSORS__ || [];

  function render(list) {
    const container = document.getElementById("sensor-list");
    if (!container) return;

    container.innerHTML = list.map(s => `
      <div class="sensor-card ${s.status}">
        <header>
          <h2>${s.name}</h2>
          <span class="code">${s.sensorCode}</span>
        </header>

        <div class="metric">
          <label>Temperatura</label>
          <div class="bar">
            <div class="fill temp" style="width:${s.temperature}%"></div>
          </div>
          <strong class="value">${s.temperature}°C</strong>
        </div>

        <div class="metric">
          <label>Umidade</label>
          <div class="bar">
            <div class="fill hum" style="width:${s.humidity}%"></div>
          </div>
          <strong class="value">${s.humidity}%</strong>
        </div>
      </div>
    `).join("");
  }

  async function refresh() {
    try {
      const res = await fetch("/api/sensors-readings/latest");
      const data = await res.json();

      sensors = data;
      render(sensors);

      document.getElementById("last-updated").textContent =
        new Date().toLocaleString();

    }
    catch (err) {
      console.error("Erro ao atualizar sensores", err);
    }
  }

  refresh();
  setInterval(refresh, 5000);
})();