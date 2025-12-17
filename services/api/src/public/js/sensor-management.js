let deleteSensorId = null;

function openCreateModal() {
  document.getElementById("modal-title").innerText = "Adicionar Sensor";
  document.getElementById("sensor-form").reset();
  document.getElementById("sensor-id").value = "";
  document.getElementById("sensor-modal").classList.add("active");
}

function openEditModal(sensor) {
  document.getElementById("modal-title").innerText = "Editar Sensor";

  document.getElementById("sensor-id").value = sensor.id;
  document.getElementById("name").value = sensor.name;
  document.getElementById("sensor_code").value = sensor.sensor_code;
  document.getElementById("min_temperature").value = sensor.min_temperature;
  document.getElementById("max_temperature").value = sensor.max_temperature;
  document.getElementById("min_humidity").value = sensor.min_humidity;
  document.getElementById("max_humidity").value = sensor.max_humidity;

  document.getElementById("sensor-modal").classList.add("active");
}

function closeModal() {
  document.getElementById("sensor-modal").classList.remove("active");
}

function openDeleteModal(id) {
  deleteSensorId = id;
  document.getElementById("delete-modal").classList.add("active");
}

function closeDeleteModal() {
  deleteSensorId = null;
  document.getElementById("delete-modal").classList.remove("active");
}

async function handleDeleteSensor() {

  if (!deleteSensorId) return;
  try {
    const response = await fetch(`/api/sensors/${deleteSensorId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erro ao deletar sensor");
    }

    toast.success({
      title: "Sucesso",
      description: "Sensor deletado com sucesso",
    });
    closeDeleteModal();
    loadSensors(); // recarrega a lista
  }
  catch (error) {
    toast.error({
      title: "Erro",
      description: error?.message,
    });
    console.error("Failed to delete sensor:", error);
  }
}

async function handleSubmitSensor(event) {
  event.preventDefault();

  const sensorId = document.getElementById("sensor-id").value;

  const payload = {
    name: document.getElementById("name").value.trim(),
    sensor_code: document.getElementById("sensor_code").value.trim(),
    min_temperature: Number(document.getElementById("min_temperature").value),
    max_temperature: Number(document.getElementById("max_temperature").value),
    min_humidity: Number(document.getElementById("min_humidity").value),
    max_humidity: Number(document.getElementById("max_humidity").value),
  };

  // Validação básica (boa prática)
  if (!payload.name || !payload.sensor_code) {
    alert("Nome e código do sensor são obrigatórios");
    return;
  }

  if (
    payload.min_temperature > payload.max_temperature ||
    payload.min_humidity > payload.max_humidity
  ) {
    alert("Valores mínimos não podem ser maiores que os máximos");
    return;
  }

  try {
    const url = sensorId
      ? `/api/sensors/${sensorId}`
      : "/api/sensors";

    const method = sensorId ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erro ao salvar sensor");
    }

    toast.success({
      title: "Sucesso",
      description: "Sensor salvo com sucesso",
    });

    closeModal();
    loadSensors(); // recarrega a lista
  } catch (error) {
    console.error("Failed to save sensor:", error);
    toast.error({
      title: "Erro",
      description: error?.message,
    });
  }
}

async function loadSensors() {

  try {
    const response = await fetch("/api/sensors");
    const sensors = await response.json();
    const container = document.getElementById("sensor-list");

    container.innerHTML = sensors.map(renderSensorCard).join("");
  } catch (error) {
    console.error("Erro ao carregar sensores", error);
  }
}

function renderSensorCard(sensor) {
  return `
    <div class="sensor-card manage">
      <header>
        <div>
          <h2>${sensor.name}</h2>
          <span class="code">${sensor.sensor_code}</span>
        </div>

        <div class="card-actions">
          <button class="icon-btn edit" onclick='openEditModal(${JSON.stringify(sensor)})'>✏️</button>
          <button class="icon-btn delete" onclick="openDeleteModal('${sensor.id}')">🗑️</button>
        </div>
      </header>

      <div class="limits">
        <div class="limit">
          <label>Temperatura mínima</label>
          <strong>${sensor.min_temperature}°C</strong>
        </div>

        <div class="limit">
          <label>Temperatura máxima</label>
          <strong>${sensor.max_temperature}°C</strong>
        </div>

        <div class="limit">
          <label>Umidade mínima</label>
          <strong>${sensor.min_humidity}%</strong>
        </div>

        <div class="limit">
          <label>Umidade máxima</label>
          <strong>${sensor.max_humidity}%</strong>
        </div>
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", loadSensors);
