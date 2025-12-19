/**
 * @openapi
 * components:
 *   schemas:
 *     Alert:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         type:
 *           type: string
 *         value:
 *           type: number
 *         limit:
 *           type: number
 *         diff:
 *           type: number
 *         message:
 *           type: string
 *         occurred_at:
 *           type: string
 *           format: date-time
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
 *               $ref: "#/components/schemas/Alert"
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
