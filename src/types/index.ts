export type ClusterDTO = {
  name: string;
  vmwareId: string;
};

export type QueryHost = {
  clusterId?: number;
};

export type HostDTO = {
  name: string;
  vmwareId: string;
  vendor: string;
  clusterId: number;
  cpu: number;
  memory: number;
};

export type VirtualMachineDTO = {
  name: string;
  vmwareId: string;
  hostId: number;
  os: string;
  cpu: number;
  memory: number;
};

export type QueryVirtualMachine = {
  hostId?: number;
};
