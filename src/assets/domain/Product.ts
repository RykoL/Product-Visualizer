import { Asset } from "./Asset";

export class Product {
  id: string;
  name: string;
  assets: Asset[];

  constructor(id: string, name: string, assets: Asset[]) {
    this.id = id;
    this.name = name;
    this.assets = assets;
  }
}
