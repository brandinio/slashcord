import mongoose, {  } from "mongoose";

const results: {
  [name: number]: string;
} = {
  0: "Disconnected",
  1: "Connected",
  2: "Connecting",
  3: "Disconnecting",
};

const mongo = async (
    mongoPath: string,
) => {
    await mongoose.connect(mongoPath, {
        keepAlive: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
}

export default mongo
