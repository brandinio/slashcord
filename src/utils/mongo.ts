import { connect } from "mongoose";
import Slasherror from "../extras/SlashError";

const results: {
  [name: number]: string;
} = {
  0: "Disconnected",
  1: "Connected",
  2: "Connecting",
  3: "Disconnecting",
};

const mongo = async (mongoPath: string) => {
  await connect(mongoPath, {
    keepAlive: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }).catch((err) => {
    throw new Slasherror(`There was an error connecting to MongoDB!`);
  });

  console.log(`Slashcord >> Connected to MongoDB!`);
};

export default mongo;
