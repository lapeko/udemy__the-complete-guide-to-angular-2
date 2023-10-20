import { Pipe, PipeTransform } from '@angular/core';
import {Server} from "./app.component";

@Pipe({
  name: 'serversFilter',
  pure: false
})
export class ServersFilterPipe implements PipeTransform {

  transform(servers: Server[], key: keyof Server, value: string): Server[] {
    return servers.filter(server => server[key].toString().includes(value));
  }

}
