import { Pipe, PipeTransform } from '@angular/core';
import {Server} from "./app.component";

@Pipe({
  name: 'sortServers',
  pure: false,
})
export class SortServersPipe implements PipeTransform {
  transform(servers: Server[]): Server[] {
    return [...servers].sort((s1, s2) => s1.name > s2.name ? 1 : -1);
  }
}
