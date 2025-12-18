const eventSource = new EventSource("/sse/events");

eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);

    const list = document.getElementById("sensor-list");

    const item = document.createElement("li");
    item.innerText = `${data.sensorCode} | Temp: ${data.temperature}°C | Umid: ${data.humidity}%`;

    list.prepend(item);
};

eventSource.onerror = () => {
    console.error("Erro na conexão SSE");
};
