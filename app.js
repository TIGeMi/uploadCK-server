import cors from "cors";
import express from "express";
import pkg from "formidable";
const { IncomingForm } = pkg;
import { copyFile } from "node:fs";

const app = express();
const port = 8080;
app.use(cors({ origin: "*" }));

app.use("/uploads", express.static("uploads"));

app.post("/fileupload", async (req, res) => {
  var form = new IncomingForm();
  form.parse(req, function (err, username, files) {
    console.log(files);
    var oldpath = files.upload.path;
    var newpath = "/media/tigemi/D/uploadServer/uploads/" + files.upload.name;
    copyFile(oldpath, newpath, function (err) {
      if (err) {
        res.json({
          error: {
            message: "The image upload failed",
          },
        });
        throw err;
      }
      res.json({
        status: "success",
        url: `http://127.0.0.1:8080/uploads/${files.upload.name}`,
      });
      res.end();
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
