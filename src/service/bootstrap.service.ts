import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClusterService } from './cluster.service';
import { HostService } from './host.service';
import { readFileSync } from 'fs';

type ClustersAndHosts = {
  cluster: string;
  hosts: string[];
};

@Injectable()
export class BootstrapService implements OnModuleInit {
  constructor(
    private clusterService: ClusterService,
    private hostService: HostService,
  ) {}

  onModuleInit() {
    this.linkClustersAndHosts();
    this.setHostIps();
  }

  async linkClustersAndHosts() {
    const raw = readFileSync('clusters-hosts.json', { encoding: 'utf-8' });
    const lines: ClustersAndHosts[] = JSON.parse(raw);
    for (const line of lines) {
      const cluster = await this.clusterService.findByName(line.cluster);
      if (!cluster) {
        throw new Error(`Cluster [${line.cluster}] nao encontrado`);
      }
      console.log(`>>>>>> Cluster com ${line.hosts.length} hosts`);
      for (const lineHost of line.hosts) {
        const host = await this.hostService.findByName(lineHost);
        if (!host) {
          throw new Error(`Host [${lineHost}] nao encontrado`);
        }
        host.cluster = cluster;
        await this.hostService.save(host);
      }
      console.log(`>>>>>> Cluster finalizado: ${line.cluster}`);
    }
  }

  async setHostIps() {
    const raw = readFileSync('hosts-ips.txt', { encoding: 'utf-8' });
    const lines = raw.split(';');
    for (const line of lines) {
      if (line.trim() === '') {
        continue;
      }
      const [name, ip] = line.trim().split(',');
      const host = await this.hostService.findByName(name);
      if (!host) {
        throw new Error(`Host [${name}] nao encontrado`);
      }
      host.ip = ip;
      await this.hostService.save(host);
      console.log(`>>>>>> Host finalizado: ${name}`);
    }
  }
}
