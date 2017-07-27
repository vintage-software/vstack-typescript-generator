import { Options } from './options';

export interface Config {
  src: string[];
  options: Options;
  imports: string[];
  exports: string[];
  outDir: string;
}
