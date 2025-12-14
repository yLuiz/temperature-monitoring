(function () {
    const state = {
        sensors: window.__INITIAL_SENSORS__ || []
    };

    function render(sensors) {
        const list = document.getElementById("sensor-list");
        if (!list) return;

        list.innerHTML = sensors.map(s => `
      <li>
        <strong>${s.name}</strong> —
        Temp: ${s.temperature}°C |
        Umid: ${s.humidity}%
      </li>
    `).join("");
    }

    async function refresh() {
        const res = await fetch("/api/sensors/latest");
        const data = await res.json();
        state.sensors = data;

        render(state.sensors);
    }

    render(state.sensors);
    refresh();
    setInterval(refresh, 3000);
})();
