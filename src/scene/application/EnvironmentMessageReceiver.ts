import { EnvironmentUseCase } from "../domain/ports/inbound/EnvironmentUseCase";
import {
  EnvironmentEvent,
  ENVIRONMENT_EVENT_CHANNEL,
} from "./events/EnvironmentEvent";

export class EnvironmentMessageReceiver {
  constructor(private environmentUseCase: EnvironmentUseCase) {
    window.addEventListener(
      ENVIRONMENT_EVENT_CHANNEL,
      this.receiveMessage.bind(this)
    );
  }

  public receiveMessage(event: CustomEvent<EnvironmentEvent>) {
    const envEvent = event.detail;
    switch (envEvent.action) {
      case "LOAD_ENVIRONMENT":
        this.environmentUseCase.loadEnvironment(envEvent.name);
        break;
      case "CHANGE_ENVIRONMENT_RADIUS":
        this.environmentUseCase.changeEnvironmentRadius(envEvent.radius);
        break;
      case "CHANGE_ENVIRONMENT_HEIGHT":
        this.environmentUseCase.changeEnvironmentHeight(envEvent.height);
    }
  }
}
