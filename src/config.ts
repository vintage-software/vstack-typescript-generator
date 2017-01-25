import { Options } from './options';

export interface Config {
  src: string[];
  options: Options;
  references: string[];
  outDir: string;
  outFile: string;
}
