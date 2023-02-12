export interface SceneProductUseCase {
  loadProductIntoScene(productId: string): Promise<void>;
  removeProductFromScene(productId: string): void;
}
