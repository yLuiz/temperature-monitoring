(function () {
  console.log("TinyBone sensor dashboard starting...");
  // Estado da tela
  const model = {
    sensors: Array.isArray(window.__INITIAL_SENSORS__) ? window.__INITIAL_SENSORS__ : [],
    lastUpdated: ""
  };

  // Render simples: aqui usamos TinyBone só para “reagir”
  // e atualizamos o DOM manualmente (MVP claro e fácil).
  function renderList() {
    const list = document.getElementById("sensor-list");
    const lastUpdated = document.getElementById("last-updated");
    if (!list || !lastUpdated) return;

    lastUpdated.textContent = model.lastUpdated || "";

    list.innerHTML = model.sensors
      .map(s => `
        <li>
          <strong>${s.name} testes</strong><br/>
          Temp: <span class="temp">${s.temperature}</span> °C |
          Umid: <span class="hum">${s.humidity}</span> %<br/>
          <small>ID: ${s.id}</small>
        </li>
      `)
      .join("");
  }

  // Bind leve (se você quiser expandir depois)
  tinybone.bind(model, {
    sensors: function () { renderList(); },
    lastUpdated: function () { renderList(); }
  });

  async function refresh() {
    try {
      const res = await fetch("/api/sensors/latest");
      const data = await res.json();

      tinybone.set(model, "sensors", data);
      tinybone.set(model, "lastUpdated", new Date().toLocaleString());
    } catch (err) {
      console.error("Failed to refresh sensors", err);
    }
  }

  // Inicializa
  renderList();
  refresh();
  setInterval(refresh, 3000);
})();
