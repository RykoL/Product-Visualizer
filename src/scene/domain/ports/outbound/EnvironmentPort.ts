import {Environment} from "../../Environment";

export interface EnvironmentPort {
    loadEnvironment(environment: Environment): Promise<void>
}