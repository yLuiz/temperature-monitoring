import { Express } from "express";
import path from "path";
import fs from "fs";
import dust from "dustjs-linkedin";

/**
 * Cache simples de templates compilados
 * Key = nome do template (ex: dashboard.dust)
 */
const templateCache = new Map<string, boolean>();

export function setupDustEngine(app: Express) {
  app.engine("dust", (filePath, options, callback) => {
    const templateName = path.basename(filePath);

    // ✅ Usa cache se já compilado
    if (templateCache.has(templateName)) {
      return dust.render(templateName, options, callback);
    }

    fs.readFile(filePath, "utf8", (err, content) => {
      if (err) return callback(err);

      try {
        const compiled = dust.compile(content, templateName);
        dust.loadSource(compiled);
        templateCache.set(templateName, true);

        dust.render(templateName, options, callback);
      } catch (e) {
        callback(e as Error);
      }
    });
  });

  // Views (runtime = dist/)
  app.set("views", path.join(__dirname, "../../views"));
  app.set("view engine", "dust");
}
