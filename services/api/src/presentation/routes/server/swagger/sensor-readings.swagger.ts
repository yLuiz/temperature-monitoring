/**
 * @openapi
 * components:
 *   schemas:
 *     SensorReadingToTemplate:
 *       type: object
 *       properties:
 *         sensorId:
 *           type: string
 *           description: ID do sensor
 *         sensorCode:
 *           type: string
 *           description: Código único do sensor
 *         name:
 *           type: string
 *           description: Nome amigável do sensor
 *         sensor:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             name:
 *               type: string
 *             sensorCode:
 *               type: string
 *         temperature:
 *           type: number
 *           format: float
 *           description: Temperatura atual do sensor
 *         humidity:
 *           type: number
 *           format: float
 *           description: Umidade atual do sensor
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data/hora da última leitura
 */

/**
 * @openapi
 * /api/sensors-readings/latest:
 *   get:
 *     tags:
 *       - Sensor Readings
 *     summary: Retorna a última leitura de cada sensor
 *     description: |
 *       Endpoint utilizado para polling no frontend.
 *       Retorna a leitura mais recente de cada sensor,
 *       já formatada para uso direto em dashboards e templates.
 *
 *     responses:
 *       200:
 *         description: Lista de leituras mais recentes dos sensores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/SensorReadingToTemplate"
 */
