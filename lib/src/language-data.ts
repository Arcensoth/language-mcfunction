import { CommandManifest } from "./command-manifest";

// TODO How to not duplicate this? #refactoring

export interface LanguageRegistryEntry {
  protocol_id: number;
}

export interface LanguageRegistryEntries {
  [resource_location: string]: LanguageRegistryEntry;
}

export interface LanguageRegistry {
  protocol_id: number;
  default: string;
  entries: LanguageRegistryEntries;
}

export interface LanguageRegistries {
  [registry_id: string]: LanguageRegistry;
}

export interface LanguageData {
  label: string;
  commands: CommandManifest;
  registries: LanguageRegistries;
}
