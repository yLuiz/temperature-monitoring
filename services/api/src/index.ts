import app from "./app";

(async function bootstrap() {
  try {
    const port = process.env.PORT ? Number(process.env.PORT) : 3000;

    app.listen(port, () => {
      console.log(`✅ API running on http://localhost:${port}/dashboard`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
