export interface RolesGuardRequest {
  context: {
    establishmentId: string;
    instanceId: string;
  };
  features: string[];
}
