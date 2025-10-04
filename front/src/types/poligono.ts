export class Local {
  long: number;
  lat: number;

  constructor(long: number, lat: number) {
    this.long = long;
    this.lat = lat;
  }

  toJSON() {
    return {
      longitude: this.long,
      latitude: this.lat,
    };
  }
}
