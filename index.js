import { app } from "./src/app/app.js";
import { dbconnection } from "./src/db/dbconnection.js";
import { env } from "./src/config/env.js";


dbconnection(env.Database.devlopement.URI).then(() => {
    app.listen(env.Port.devlopement, () => {
        console.log("Server is running on port 3000");
    });
}).catch((err) => {
    console.log(err)
    process.exit(1)
});

