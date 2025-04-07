import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClusterService } from './cluster.service';
import { HostService } from './host.service';
import { readFileSync } from 'fs';

type ClustersAndHosts = {
  id: string;
  cluster: string;
  hosts: string[];
};

type Host = {
  host: string;
  name: string;
};

@Injectable()
export class BootstrapService implements OnModuleInit {
  constructor(
    private clusterService: ClusterService,
    private hostService: HostService,
  ) {}

  onModuleInit() {
    this.linkClustersAndHosts();
    //this.setHostIps();
  }

  async linkClustersAndHosts() {
    return
    const raw = readFileSync('clusters-hosts.json', { encoding: 'utf-8' });
    const lines: ClustersAndHosts[] = JSON.parse(raw);

    const rawHosts = readFileSync('hosts.json', { encoding: 'utf-8' });
    const lineHosts: Host[] = JSON.parse(rawHosts);

    for (const line of lines) {
      const cluster = await this.clusterService.findByName(line.cluster);
      if (!cluster) {
        await this.clusterService.create({
          id: line.id,
          name: line.cluster
        })
        console.error(`Cluster [${line.cluster}] criado`);
      }
      console.log(`>>>>>> Cluster com ${line.hosts.length} hosts`);
      for (const lineHost of line.hosts) {
        const host = await this.hostService.findByName(lineHost);
        if (!host) {
          const id = lineHosts.find(l => l.name === lineHost)?.host;
          if(!id) {
            throw new Error(`Não foi encontrado id para o host ${lineHost} no cluster ${cluster.name}`)
          }
          await this.hostService.create({
            id: String(id),
            name: lineHost,
            clusterId: cluster.id
          })
          console.error(`Host [${lineHost}] criado`);
        }
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
