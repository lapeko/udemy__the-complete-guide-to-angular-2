import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "shorten",
})
export class ShortenPipe implements PipeTransform {
  transform(value: string, length = 10): string {
    if (value.length > length) return value.substring(0, length).concat("...");
    return value;
  }
}
