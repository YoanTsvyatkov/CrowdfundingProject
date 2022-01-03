import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import payment from "./routers/payment-controller.js"
import sqInst from "./util/database.js"

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

function initRouters(path, routhers) {
  app.use(path, routhers);
}

initRouters("/api/", [payment]);

app.all("/*", (req, res) => {
  res.sendStatus(404);
});

(async () => {
  try {
    await sqInst.sync({ force: true })

    app.listen(process.env.PORT, () => {
      console.log(`Started server`);
    });
  } catch (error) {
    console.log(error)
  }
})();
