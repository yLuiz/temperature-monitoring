/**
 * @openapi
 * components:
 *   schemas:
 *     Alert:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         sensor_id:
 *           type: string
 *           format: uuid
 *         type:
 *           type: string
 *           enum: [TEMPERATURE, HUMIDITY]
 *         value:
 *           type: number
 *         limit:
 *           type: number
 *         diff:
 *           type: number
 *         parameter:
 *           type: string
 *           enum: [MIN, MAX]
 *         message:
 *           type: string
 *         occurred_at:
 *           type: string
 *           format: date-time
 *         sensor:
 *           $ref: "#/components/schemas/Sensor"
 *
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
 *         max_humidity:
 *           type: number
 *         min_humidity:
 *           type: number
 *         max_temperature:
 *           type: number
 *         min_temperature:
 *           type: number
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 */


/**
 * @openapi
 * components:
 *   schemas:
 *     AlertsPaginationResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Alert"
 *         limit:
 *           type: integer
 *           example: 10
 *         totalItems:
 *           type: integer
 *           example: 912
 *         currentPage:
 *           type: integer
 *           example: 1
 *         lastPage:
 *           type: integer
 *           example: 92
 */



/**
 * @openapi
 * /api/alerts:
 *   get:
 *     tags:
 *       - Alerts
 *     summary: Lista alertas com filtros e paginação
 *     parameters:
 *       - in: query
 *         name: sensor_id
 *         schema:
 *           type: string
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [TEMPERATURE, HUMIDITY]
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *     responses:
 *       200:
 *         description: Lista paginada de alertas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/AlertsPaginationResponse"
 */

/**
 * @openapi
 * /api/alerts/{id}:
 *   get:
 *     tags:
 *       - Alerts
 *     summary: Busca alerta por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Alerta encontrado
 *       404:
 *         description: Alerta não encontrado
 */
