import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();


const API_URL = "https://api.blockchain.com/v3/exchange";


const config = {
    headers: {accept: "application/json", Authorization: `Bearer ${process.env.API_KEY}`},
};
const app = express();
app.set("views", "views");
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req,res)=>{
    res.render("index.ejs", {content: "Waiting for Coin Name..", price: "Waiting for Coin Name..."})
    
})

app.post("/get-bitcoin", async (req,res) => {
    const symbol = req.body.id;
    console.log(`Requesting data for symbol: ${symbol}`);
    
    try{
        const result = await axios.get(`${API_URL}/tickers/${symbol}`, config);
        res.render("index.ejs", {
            content: JSON.stringify(result.data.symbol),
            price: JSON.stringify(result.data.price_24h),
        });
    } catch(error) {
        res.render("index.ejs", {
            content: "Error fetching data: " + JSON.stringify(error.response ? error.response.data : error.message),});
    }
});

app.listen(port, (req,res) => {
    console.log(`Server is running on port: ${port}`);
});