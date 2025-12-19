# Sensor Service (Simulador)

Este serviço é responsável por **simular sensores físicos** de temperatura e umidade utilizados na plataforma de monitoramento.

Ele não se conecta a sensores reais.  
Seu objetivo é **gerar dados realistas** em intervalos configuráveis para testes, desenvolvimento e validação do fluxo completo do sistema.

---

## 🎯 Objetivo do Serviço

- Simular sensores de diferentes ambientes (câmara fria, ambiente controlado, freezer, etc.)
- Publicar leituras periódicas de **temperatura** e **umidade**
- Enviar esses dados para o **RabbitMQ**, onde outros serviços irão consumir
- Permitir testes completos sem dependência de hardware físico

---

## 🔌 Como funciona

1. O serviço carrega uma lista fixa de sensores simulados
2. Cada sensor possui:
   - Código identificador (`sensor_code`)
   - Limites mínimos e máximos de temperatura
   - Limites mínimos e máximos de umidade
3. Em um intervalo configurável (`SENSOR_INTERVAL_MS`):
   - O serviço gera valores aleatórios **dentro dos limites definidos**
   - Publica essas leituras no RabbitMQ

---

## 🧪 Sensores Simulados

Abaixo está a lista de sensores simulados disponíveis no sistema:

| Sensor | Temperatura (°C) | Umidade (%) | Ambiente Simulado |
|------|------------------|-------------|-------------------|
| SENSOR_001 | 0 → 5 | 75 → 90 | Câmara fria |
| SENSOR_002 | 0 → 4 | 80 → 95 | Câmara fria |
| SENSOR_003 | -25 → -18 | 60 → 80 | Freezer industrial |
| SENSOR_004 | -22 → -16 | 65 → 85 | Freezer industrial |
| SENSOR_005 | 18 → 25 | 40 → 60 | Ambiente controlado |
| SENSOR_006 | 17 → 26 | 35 → 55 | Ambiente controlado |
| SENSOR_007 | 16 → 24 | 45 → 65 | Sala climatizada |
| SENSOR_008 | 17 → 23 | 50 → 70 | Sala climatizada |
| SENSOR_009 | 15 → 28 | 50 → 75 | Área mista |
| SENSOR_010 | 18 → 30 | 45 → 70 | Área mista |
| SENSOR_011 | 18 → 26 | 60 → 85 | Estoque sensível |
| SENSOR_012 | -2 → 2 | 70 → 90 | Resfriamento leve |
| SENSOR_013 | 20 → 28 | 40 → 60 | Escritório |
| SENSOR_014 | 18 → 24 | 45 → 65 | Escritório |
| SENSOR_015 | 2 → 6 | 80 → 95 | Câmara refrigerada |
| SENSOR_016 | 0 → 4 | 75 → 90 | Câmara refrigerada |
| SENSOR_017 | 4 → 10 | 85 → 95 | Armazenamento úmido |
| SENSOR_018 | 15 → 22 | 35 → 55 | Ambiente seco |
| SENSOR_019 | 10 → 14 | 85 → 95 | Armazenamento sensível |
| SENSOR_020 | 20 → 24 | 40 → 60 | Ambiente padrão |

## 📝 Cadastro
Abaixo está uma lista de sensores que são simulados, mas ainda não registrados na API para que você possa testar o cadastro.
| Sensor     | Temperatura (°C) | Umidade (%) | Ambiente Simulado           |
| ---------- | ---------------- | ----------- | --------------------------- |
| SENSOR_021 | 5 → 12           | 55 → 75     | Armazenamento intermediário |
| SENSOR_022 | 8 → 15           | 50 → 70     | Área climatizada            |
| SENSOR_023 | 22 → 30          | 30 → 50     | Ambiente quente             |
| SENSOR_024 | 25 → 35          | 20 → 40     | Ambiente muito quente       |
| SENSOR_025 | -10 → 0          | 60 → 85     | Câmara fria leve            |
| SENSOR_026 | -5 → 5           | 65 → 90     | Transição térmica           |
| SENSOR_027 | 12 → 18          | 70 → 90     | Ambiente úmido              |
| SENSOR_028 | 14 → 20          | 60 → 80     | Ambiente moderado           |
| SENSOR_029 | 30 → 40          | 20 → 45     | Área de calor extremo       |
| SENSOR_030 | 28 → 38          | 25 → 50     | Ambiente industrial         |


---

## ⚙️ Configuração

### Variáveis de Ambiente

```env
RABBITMQ_URL=amqp://guest:guest@rabbitmq:5672/
SENSOR_INTERVAL_MS=5000
