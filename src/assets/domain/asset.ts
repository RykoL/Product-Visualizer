export enum AssetType {
    GLTF = "GLTF",
    HDRI = "HDRI",
}

export class Asset {
    constructor(
        public id: string,
        public name: string,
        public path: string,
        public type: AssetType
    ) {}
}