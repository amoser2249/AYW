# AYW


Gulp 
------
``gulp.src`` what files to use
``gulp.dest`` where to put them

``gulp.task(' task-name', function () { 
    return gulp.src(' source-files') // Get source files with gulp.src
    .pipe( aGulpPlugin()) // Sends it through a gulp plugin
    .pipe( gulp.dest(' destination')) // Outputs the file in the destination folder 
})``

### Globbing
*: any file in current folder
**/*: any file in the root folder and all its child directories
*.+(pattern1|pattern2): match files ending with more than one pattern (example: .sass and .scss)
!


* – * a wildcard that matches everything in the current directory. 
* **/*. scss – This is a more extreme version of the * pattern that matches everything in the current directory and its child directories. 
* *. +( pattern1 | pattern2) – this matches files that end with either pattern1 or pattern2
* ! - excludes files from a match


Scaffolding
------

Development
------

Testing
------

Integration
------

Optimization
------

Deployment
------
