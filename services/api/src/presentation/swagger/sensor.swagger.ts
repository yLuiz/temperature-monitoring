/**
 * @openapi
 * components:
 *   schemas:
 *     Sensor:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         sensor_code:
 *           type: string
 *         name:
 *           type: string
 *         min_temperature:
 *           type: number
 *         max_temperature:
 *           type: number
 *         min_humidity:
 *           type: number
 *         max_humidity:
 *           type: number
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *
 *     CreateSensor:
 *       type: object
 *       required:
 *         - name
 *         - sensor_code
 *         - min_temperature
 *         - max_temperature
 *         - min_humidity
 *         - max_humidity
 *       properties:
 *         name:
 *           type: string
 *         sensor_code:
 *           type: string
 *         min_temperature:
 *           type: number
 *         max_temperature:
 *           type: number
 *         min_humidity:
 *           type: number
 *         max_humidity:
 *           type: number
 *
 *     UpdateSensor:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         min_temperature:
 *           type: number
 *         max_temperature:
 *           type: number
 *         min_humidity:
 *           type: number
 *         max_humidity:
 *           type: number
 */

/**
 * @openapi
 * /api/sensors:
 *   post:
 *     tags:
 *       - Sensors
 *     summary: Cadastra um novo sensor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateSensor"
 *     responses:
 *       200:
 *         description: Sensor criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Sensor"
 *       400:
 *         description: Dados inválidos
 *
 *   get:
 *     tags:
 *       - Sensors
 *     summary: Lista todos os sensores
 *     responses:
 *       200:
 *         description: Lista de sensores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Sensor"
 */

/**
 * @openapi
 * /api/sensors/{id}:
 *   get:
 *     tags:
 *       - Sensors
 *     summary: Busca um sensor pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Sensor encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Sensor"
 *       404:
 *         description: Sensor não encontrado
 *
 *   put:
 *     tags:
 *       - Sensors
 *     summary: Atualiza um sensor
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdateSensor"
 *     responses:
 *       200:
 *         description: Sensor atualizado
 *
 *   delete:
 *     tags:
 *       - Sensors
 *     summary: Remove um sensor
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Sensor removido
 */

/**
 * @openapi
 * /api/sensors/code/{sensorCode}:
 *   get:
 *     tags:
 *       - Sensors
 *     summary: Busca um sensor pelo código
 *     parameters:
 *       - in: path
 *         name: sensorCode
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sensor encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Sensor"
 *       404:
 *         description: Sensor não encontrado
 */

/**
 * @openapi
 * /api/sensors/update-notification-service:
 *   post:
 *     tags:
 *       - Sensors
 *     summary: Notifica serviços sobre atualização da base de sensores
 *     description: |
 *       Dispara um evento para outros serviços (ex: Notification Service)
 *       informando que a base de sensores foi atualizada.
 *     responses:
 *       200:
 *         description: Notificação enviada com sucesso
 */
