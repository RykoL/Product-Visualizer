export interface AssetLoader<T> {
  load(path: string): Promise<T>;
}
