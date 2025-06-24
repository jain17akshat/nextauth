import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("✅ MONGODB CONNECTED");
    });

    connection.on("error", (err) => {
      console.log("❌ MONGODB CONNECTION ERROR. PLEASE MAKE SURE DB IS CONNECTED: " + err);
      process.exit();
    });
  } catch (error) {
    console.log("❌ Something went wrong while connecting to DB");
    console.log(error);
  }
}
