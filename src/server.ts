import app from "./app";
import appDataSource from "./data-source";
import "dotenv/config"
import initialSetup from "./utils/initialSetup";

(async () => {
  await appDataSource.initialize().catch((error) => {
    console.log("Error during initialization dataSource", error);
  });
  app.listen(process.env.PORT || 3000, () =>{  
    console.log("Server runing");
  });

 await initialSetup()

})();
