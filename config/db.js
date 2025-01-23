const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://veortiz1:BBhw96gcAO4B8zMS@cluster0.zzz6e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MONGO CONNECTION ERROR:", err);
  }
}

connectDB(); 

module.exports = client; 
