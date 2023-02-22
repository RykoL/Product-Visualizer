export const ENVIRONMENT_EVENT_CHANNEL = "environment";

export type EnvironmentEvent =
  | LoadEnvironmentEvent
  | ChangeEnvironmentRadiusEvent
  | ChangeEnvironmentHeightEvent;

type LoadEnvironmentEvent = {
  action: "LOAD_ENVIRONMENT";
  name: string;
};

type ChangeEnvironmentRadiusEvent = {
  action: "CHANGE_ENVIRONMENT_RADIUS";
  radius: number;
};

type ChangeEnvironmentHeightEvent = {
  action: "CHANGE_ENVIRONMENT_HEIGHT";
  height: number;
};
