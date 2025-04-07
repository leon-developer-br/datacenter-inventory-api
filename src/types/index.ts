export type ClusterDTO = {
  id: string;
  name: string;
};

export type QueryHost = {
  clusterId?: string;
};

export type HostDTO = {
  id: string;
  name: string;
  vendor?: string;
  clusterId: string;
  cpu?: number;
  memory?: number;
};

export type VirtualMachineDTO = {
  id: string;
  name: string;
  hostId: string;
  os: string;
  ip: string;
  cpu: number;
  memory: number;
};

export type QueryVirtualMachine = {
  hostId?: string;
};
