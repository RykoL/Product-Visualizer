import { SceneProductUseCase } from "../domain/ports/inbound/ProductUseCase";
import { ProductEvent, PRODUCT_EVENT_CHANNEL } from "./events/ProductEvent";

export class ProductMessageReceiver {
  constructor(private productUseCase: SceneProductUseCase) {
    window.addEventListener(
      PRODUCT_EVENT_CHANNEL,
      this.receiveMessage.bind(this)
    );
  }

  public receiveMessage(event: CustomEvent<ProductEvent>) {
    const productEvent = event.detail;
    switch (productEvent.action) {
      case "LOAD_PRODUCT":
        this.productUseCase.loadProductIntoScene(productEvent.productId);
        break;
      case "REMOVE_PRODUCT":
        this.productUseCase.removeProductFromScene(productEvent.productId);
        break;
    }
  }
}
