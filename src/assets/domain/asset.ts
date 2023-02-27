export enum AssetType {
    ENVIRONMENT = 'Environment',
}

export class Asset {
    constructor(
        public id: string,
        public name: string,
        public location: string,
        public type: AssetType
    ) {}
}