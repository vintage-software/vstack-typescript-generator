import {Gulpclass, Task} from 'gulpclass/Decorators';
import * as gulp from 'gulp';
import * as tslint from 'gulp-tslint';

let config = {
  typescript: {
    src: [
      './**/*.ts',
      '!./typings/**/*.ts',
      '!./node_modules/**/*.ts'
    ]
  }
};

@Gulpclass()
export class Gulpfile {
  @Task()
  public lint() {
    return gulp
      .src(config.typescript.src)
      .pipe(tslint())
      .pipe(tslint.report('prose'));
  }
}
