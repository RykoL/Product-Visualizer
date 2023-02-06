export class Asset {

  constructor(
    public name: string,
    public path: string
  ) {}
}
export class Geometry extends Asset {}
export class Material extends Asset {}
