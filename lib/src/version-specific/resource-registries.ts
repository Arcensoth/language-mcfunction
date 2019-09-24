export interface ResourceRegistryEntry {
  protocol_id: number;
}

export interface ResourceRegistryEntries {
  [resource_location: string]: ResourceRegistryEntry;
}

export interface ResourceRegistry {
  protocol_id: number;
  default: string;
  entries: ResourceRegistryEntries;
}

export interface ResourceRegistries {
  [registry_id: string]: ResourceRegistry;
}
