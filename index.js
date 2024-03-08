const express = require("express");

require("dotenv").config();

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const cors = require("cors");

const app = express();

const port = process.env.PORT || 5000;





app.use( cors());

app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.ck8e5sv.mongodb.net/?retryWrites=true&w=majority`;





const client = new MongoClient(uri, {

  serverApi: {

    version: ServerApiVersion.v1,

    strict: true,

    deprecationErrors: true,

  },

});







const dbConnect = async () => {

  try {

    // <------ Database Collections ------> //

    const BlogsCollection = client.db("Zestify").collection("Blogs");

    const MenuCollection = client.db("Zestify").collection("Menu");




        app.get("/api/v1/blogs", async (req, res) => {

          const result = await BlogsCollection.find().toArray();

          res.send(result);
        });

        


        app.get("/api/v1/blog", async (req, res) => {
          const id = req.query.id;

          const query = { _id: new ObjectId(id) };

          const result = await BlogsCollection.findOne(query);

          res.send(result);
        });




        app.get("/api/v1/menu", async (req, res) => {
          const result = await MenuCollection.find().toArray();

          res.send(result);
        });


        app.get("/api/v2/menu", async (req, res) => {

          const category = req.query.category;

          let query = {};
          if(category){
            query = {category : category};
          }
          const result = await MenuCollection.find(query).toArray();

          res.send(result);
        });



        app.get("/api/v1/food", async (req, res) => {
          const id = req.query.id;
          
          const query = { _id: new ObjectId(id) };
          
          const result = await MenuCollection.findOne(query);
          
          res.send(result);
        });
        


    await client.connect();
    console.log("Database Connected!");
  } catch (error) {
    console.log(error.name, error.message);
  }
};
dbConnect();






app.get("/", (req, res) => {

  res.send("This the Server of Simple Style's Website");

});

app.listen(port, () => {

  console.log("the server is Running on ", port, "port.");

});
