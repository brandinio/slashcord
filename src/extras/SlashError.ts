class Slasherror extends Error {
  constructor(message: any) {
    super(message);
    this.name = "SlashError";
  }
}

export = Slasherror;
