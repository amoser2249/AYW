# AYW Gulpfile


## Available Tasks
| command | description |
| ------- | ----------- |
| `gulp` | Used for local development - includes watches for js & sass/scss compiling & linting, nunjucks rendering, sprites, and starts browserSync server |
| `gulp build` | Processes /app/ for all assets and code - does everything in default task then optimizes, concats, and copies stylesheets, javascript files, fonts. Also runs karma/jasmine tests. **Run `gulp browserSync:dist` after build to start browserSync server from /dist/ to test generated code.** |
| `gulp browserSync:dist` | Launches a web server which points to the `dist` folder |

## Modules
| command | description |
| ------- | ----------- |
| `clean:dev` | Deletes previously generated files in dev space (app/css folder, .html, .nunjucks) |
| `sprites` |  |
| `lint:js` |  |
| `lint:scss` |  |
| `sass` | Compiles with sourcemaps, autoprefixer and injects changes into browser.  |
| `nunjucks` |  |
| `browserSync` |  |
| `browserSync:dist` |  |
| `watch` | watch them files |

### Sassy as Sin
Compiles SASS with sourcemaps, autoprefixer and automatically inject changes into browser.

#### Configs
```js
     sass: {
            src: 'app/scss/**/*.scss',
            dest: 'app/css',
            options: {
                includePaths: [
                'app/bower_components', 'node_modules'
                ]
            }
        }
```
#####`app/bower_components` and `node_modules` are defined as included paths.

**This is wrong**
```scss
@import '../../../app/bower_components/susy/sass/susy';
```
**This is correct**
```scss
@import 'susy/sass/susy';
```
| wrong | `description` |
| correct | `@import 'susy/sass/susy';` |

| wrong   | @import '../../../app/bower_components/susy/sass/susy'; |
|---------|:-------------------------------------------------------:|
| correct |               `@import 'susy/sass/susy';`               |