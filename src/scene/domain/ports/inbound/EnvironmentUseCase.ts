export interface EnvironmentUseCase {
  loadEnvironment(name: string): Promise<void>;
  changeEnvironmentRadius(radius: number): void;
  changeEnvironmentHeight(height: number): void;
}
