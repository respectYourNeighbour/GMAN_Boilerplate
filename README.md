## A Node-MongoDB-Angular-Grunt and more-starter-kit
A starting kit app that's using Node-MongoDB-Angular-Grunt and more...

**[I. Description of configuration root of files](#bowerrc)**
* [.bowerrc](#bowerrc)
* [.editorconfig](#editorconfig)
* [.gitattributes](#gitattributes)
* [.gitignore](#gitignore)
* [.jshintrc](#jshintrc)
* [.travis](#travis)
* [Gruntfile.js](#gruntfile)
* [bower.json](#bower)
* [humans.txt](#humans)
* [package.json](#package)
* [robots.txt](#robots)

**[II. Installation](#bower_install)**
* [ 1. bower install](#bower_install)
- npm install
- mongod (turn the MongoDB Server on)
- node server.js (start the app)



## .bowerrc
It is a bower configuration file (.json); 

Read more: http://bower.io/docs/config/

## .editorconfig
EditorConfig helps developers define and maintain consistent coding styles between different editors and IDEs. The EditorConfig project consists of a file format for defining coding styles and a collection of text editor plugins that enable editors to read the file format and adhere to defined styles. EditorConfig files are easily readable and they work nicely with version control systems.

Read more: http://editorconfig.org/

## .gitattributes
When text is set to "auto", the path is marked for automatic end-of-line normalization. If git decides that the content is text, its line endings are normalized to LF on checkin.
If you want to interoperate with a source code management system that enforces end-of-line normalization, or you simply want all text files in your repository to be normalized, you should instead set the text attribute to "auto" for all files.
This ensures that all files that git considers to be text will have normalized (LF) line endings in the repository.

Read more: http://git-scm.com/docs/gitattributes & https://git-scm.com/book/en/v2/Customizing-Git-Git-Attributes

## .gitignore
It tells git which files (or patterns) it should ignore. It's usually used to avoid committing transient files from your working directory that aren't useful to other collaborators, such as compilation products, temporary files IDEs create, etc.

Read more: https://git-scm.com/docs/gitignore

## .jshintrc
JSHint is a program that flags suspicious usage in programs written in JavaScript.
You can define configuration for jshint in two ways. Either by adding special comments to your code or by storing your configuration in a .jshintrc file. 

Read more: http://jshint.com/docs/

## .travis
Continuous integration.

Travis CI makes working in a team for a software project easier with automated builds. These builds are triggered automatically when each developer checks in their code to the repository.

Read more: https://docs.travis-ci.com/user/for-beginners & http://code.tutsplus.com/tutorials/travis-ci-what-why-how--net-34771

## Gruntfile
The Gruntfile.js or Gruntfile.coffee file is a valid JavaScript or CoffeeScript file that belongs in the root directory of your project, next to the package.json file, and should be committed with your project source.

A Gruntfile is comprised of the following parts:

- The "wrapper" function
- Project and task configuration
- Loading Grunt plugins and tasks
- Custom tasks

Read more: http://gruntjs.com/getting-started

## bower
Packages are defined by a manifest file bower.json. This is similar to Node’s package.json or Ruby’s Gemfile.

Read more: http://bower.io/docs/creating-packages/

## humans
It's an initiative for knowing the people behind a website. It's a TXT file that contains information about the different people who have contributed to building the website.

Read more: http://humanstxt.org/

## package
This file is used by npm to store metadata for projects published as npm modules. You will list grunt and the Grunt plugins your project needs as devDependencies in this file.

Read more: http://gruntjs.com/getting-started

## robots
Web site owners use the /robots.txt file to give instructions about their site to web robots; this is called The Robots Exclusion Protocol.

Read more: http://www.robotstxt.org/robotstxt.html

## bower_install
Open a CMD on the root folder and execute the following command:
~~~ sh
 bower install
~~~

This command will install the packages defined in the file [bower.json](#bower)

By default bower installs packages to bower_components/, but in our case it will install the packages in the route defined in the file .bowerrc
