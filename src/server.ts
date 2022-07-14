import app from "./app";
import appDataSource from "./data-source";

(async () => {
  await appDataSource.initialize().catch((error) => {
    console.log("Error during initialization dataSource", error);
  });
  app.listen(3000, () => {
    console.log("Server runing");
  });
})();
