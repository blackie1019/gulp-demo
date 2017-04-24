# gulp-demo #

Gulp general use case and using Gulp to solve basic JS dependency problem.

Detail Post on my [Blog](http://blackie1019.github.io) - [Using Gulp to help JS and Css Concat and Minify](http://blackie1019.github.io/2017/04/19/Using-Gulp-to-help-JS-and-Css-Concat-and-Minify/)

# Gulp Introduction #

![gulp](/ref/gulp.png)

Advantages:
- Huge speed advantage over any other task runner
- Easy to code and understand.
- Easy to test the web applications..
- Plugins are simple to use and they are designed to do one thing at a time.
- Performs repetitive tasks repeatedly such as minifying stylesheets, compressing images, etc. 

# Overview of demo #

This demo will import below packages:

- [gulp](https://github.com/gulpjs/gulp)

    The streaming build system

- [gulp-uglify](https://github.com/terinjokes/gulp-uglify)

    Minify JavaScript with UglifyJS2.

- [gulp-concat](https://github.com/contra/gulp-concat)

    Streaming concat middleware for gulp

- [run-sequence](https://github.com/OverZealous/run-sequence)

    Run a series of dependent gulp tasks in order.

- [del](https://github.com/sindresorhus/del)

    Delete files and folders using globs. 

- [gulp-html-replace](https://github.com/VFK/gulp-html-replace)

    Replace build blocks in HTML. Like useref but done right.

- [gulp-insert](https://github.com/rschmukler/gulp-insert)

    string mutation library for gulp.

## Setup ##

1. Install Nodejs
2. exec cmd to install Gulp CLI
    
        npm install gulp -g

3. Restore packages from NPM

        npm install

## Instruction ##

This demo give two Scenario case, one is focus on pure using without another tools support for release. Another is focus on integrate with webpack bundle flow, so we just cancate the custom resource and publish it without minified.

* all cmd should execute on terminal and under app folder *

![pwd](/ref/pwd.png)

Folder Strucutre is below:

- app folder
    
    Root folder for entire app.

- node_modules folder

    nodejs packages folder.

- public folder
    
    Our customize code for this project.

![app_folder_structure](/ref/app_folder_structure.png)

File Structure under public folder includes:

- bundle folder 

    our real output from gulp.

- src

    our source for gulp to processing.

- gulpfile.js

    gulp setting and task setup file.

- package.json

    npm setting and dependencies file.

- .gitignore

    tells git which files (or patterns) it should ignore to avoid upload to github. Current setup is ignore nodejs modules only.

### Scenario 1 - execute-for-bundle ###

CMD:

    gulp execute-for-bundle

Task Detail:

```js
gulp.task('execute-for-bundle', function() {
    runSequence('clean', ['copy-js','copy-vendor'], 'concat-js',['minify-js','replace-html'],'finish-task');
});
```

### Scenario 2 - execute-for-webpack ###

CMD:

    gulp execute-for-webpack

Task Detail:

```js
gulp.task('execute-for-webpack', function() {
    runSequence('clean', ['copy-js','copy-vendor'], 'concat-js',['update-js','replace-html'],'finish-task');
});
```
