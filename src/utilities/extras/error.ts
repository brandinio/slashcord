class Slasherror extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Slasherror";
  }
}

export = Slasherror;
