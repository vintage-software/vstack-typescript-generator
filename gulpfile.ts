import {Gulpclass, Task} from 'gulpclass/Decorators';
import * as gulp from 'gulp';
import * as tslint from 'gulp-tslint';
import * as sourcemaps from 'gulp-sourcemaps';
import * as typescript from 'gulp-typescript';
import * as diff from 'gulp-diff';

import * as del from 'del';

let config = {
  typescript: {
    src: [
      './src/index.ts'
    ],
    lintSrc: [
      './**/*.ts',
      '!./typings/**/*.ts',
      '!./node_modules/**/*.ts'
    ],
    options: {
        target: 'ES5',
        out: 'index.js',
        removeComments: true,
        noImplicitAny: true,
        noExternalResolve: false
    },
    outputFolder: './dist'
  }
};

@Gulpclass()
export class Gulpfile {
  @Task('clean')
  public clean() {
    return del(config.typescript.outputFolder);
  }

  @Task('lint')
  public lint() {
    return gulp
      .src(config.typescript.lintSrc)
      .pipe(tslint())
      .pipe(tslint.report('prose'));
  }

  @Task('build', ['clean', 'lint'])
  public build() {
    return this.getBuildPipeline()
      .pipe(gulp.dest(config.typescript.outputFolder));
  }

  @Task('verify-build')
  public verifyBuild() {
    return this.getBuildPipeline()
      .pipe(diff(config.typescript.outputFolder))
      .pipe(diff.reporter({ fail: true }));
  }

  private getBuildPipeline() {
    return gulp
      .src(config.typescript.src)
      .pipe(sourcemaps.init())
      .pipe(typescript(config.typescript.options))
      .pipe(sourcemaps.write('.', { sourceRoot: 'src/' }));
  }
}
