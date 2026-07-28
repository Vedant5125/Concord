import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(cors({origin:"*"}));
app.use(express.json({limit:"1mb"}));

try{
    app.listen(3000,()=>{
    console.log("Server started");
})
}catch(error){
    console.error(`App.js Error: ${error}`)
}


