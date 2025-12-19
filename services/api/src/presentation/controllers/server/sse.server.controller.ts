import { Request, Response } from "express";

export class SseServerController {

    clients: Response[] = [];

    handler(req: Request, res: Response) {
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        res.flushHeaders();

        this.clients.push(res);

        // Mensagem inicial (opcional)
        res.write(`event: connected\ndata: connected\n\n`);

        req.on("close", () => {
            const index = this.clients.indexOf(res);
            if (index !== -1) this.clients.splice(index, 1);
        });
    }

    broadcast(data: any) {
        const payload = `data: ${JSON.stringify(data)}\n\n`;

        this.clients.forEach(client => {
            client.write(payload);
        });
    }
}