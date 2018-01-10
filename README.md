# Responsive Portfolio for SWD500

[Respority](https://github.com/nickallama/swd500-responsive-website)

[GitPages website](https://nickallama.github.io/swd500-responsive-website/src/index.html)

## Introduction

The aim of this project is to produce a 6-page website, in this case a portfolio for myself, using HTML5, CSS3 and JavaScript. The website must be fully responsive, being fully accessible in desktop, tablet and mobile devices. 

## Building Website

### Git

1. Add the respority link to git

`git remote add origin "https://github.com/nickallama/swd500-responsive-website.git"`

2. Fetch the respority

`git pull origin master`

3. Create a new branch 

`git checkout -b [branch]`

### NPM

1. To install required npm modules just use:

`npm install`

### SASS

1. The generated CSS file from SASS is already included, but you can use:

`sass --watch sass/style.scss:src/resources/css/style.css`

to generate a new one.

### Webpack

The website uses webpack to convert ES6 into ES5 code. To compile just run

`webpack`

## Branching

The branching strategy is based on the suggested [strategy by Microsoft](https://docs.microsoft.com/en-us/vsts/git/concepts/git-branching-guidance).

For features/pages, use the branching naming convention of `feature/[description]`.
For fixes, use `fix/[description]` or for hotfixes, `hotfix/[description]`.

Use pull requests to merge new feature branches into the master branch.

## Coding Conventions

### HTML5 & CSS3

The coding conventions for this project are based upon [Googles HTML5 & CSS3 style guide](https://google.github.io/styleguide/htmlcssguide.html).

JavaScript coding considerations are based upon [Googles JavaScript style guide](https://google.github.io/styleguide/jsguide.html).

#### Indentation

While Google recommends 2 spaces for HTML5 & CCS3, for this project, 2 spaces are used for CSS files and 4 for HTML files. This is a personal preference as I find HTML code much easier to read and understand with 4.

JavaScript files should use 2 spaces for indentation.

#### Whitespace

Remove trailing whitespace.

#### Comment Code

Comment code in CSS to split styling for the relavent sections so it is easier to understand what is being styled, however, properly naming elements should help with this too. HTML code should be commented to show where elements end if not clear.

JavaScript code should be clearly commented to show what each part does, giving a simple description.

#### Naming Conventions

All ID and class names should be lowercase, using underscores to seperate words (eg. `contact_form`). Names given must be appriorate and help to describe what the element is.

For methods, variables and package names, lowerCamelCase should be used. For class names, UpperCamelCase is to be used in JavaScript.

## Design 

### Lowfi Wireframes

#### Mobile
Home

![Lowfi mobile home](https://nickallama.github.io/swd500-responsive-website/wireframes/lowfi/mobile-home.png)

About

![Lowfi mobile about](https://nickallama.github.io/swd500-responsive-website/wireframes/lowfi/mobile-about.png)

Contact

![Lowfi mobile contact](https://nickallama.github.io/swd500-responsive-website/wireframes/lowfi/mobile-contact.png)

Projects

![Lowfi mobile project](https://nickallama.github.io/swd500-responsive-website/wireframes/lowfi/mobile-project.png)

Blog

![Lowfi mobile blog](https://nickallama.github.io/swd500-responsive-website/wireframes/lowfi/mobile-blog.png)

Blogpost

![Lowfi mobile blogpost](https://nickallama.github.io/swd500-responsive-website/wireframes/lowfi/mobile-blogpost.png)

#### Desktop
Home

![Lowfi desktop home](https://nickallama.github.io/swd500-responsive-website/wireframes/lowfi/desktop-home.png)

About

![Lowfi desktop about](https://nickallama.github.io/swd500-responsive-website/wireframes/lowfi/desktop-about.png)

Contact

![Lowfi desktop contact](https://nickallama.github.io/swd500-responsive-website/wireframes/lowfi/desktop-contact.png)

Projects

![Lowfi desktop project](https://nickallama.github.io/swd500-responsive-website/wireframes/lowfi/desktop-project.png)

Blog

![Lowfi desktop blog](https://nickallama.github.io/swd500-responsive-website/wireframes/lowfi/desktop-blog.png)

Blogpost

![Lowfi desktop blogpost](https://nickallama.github.io/swd500-responsive-website/wireframes/lowfi/desktop-blogpost.png)

### Highfi Wireframes

#### Mobile
Home

![Highfi mobile home](https://nickallama.github.io/swd500-responsive-website/wireframes/mockup/mobile-home.jpg)

About

![Highfi mobile about](https://nickallama.github.io/swd500-responsive-website/wireframes/mockup/mobile-about.jpg)

Contact

![Highfi mobile contact](https://nickallama.github.io/swd500-responsive-website/wireframes/mockup/mobile-contact.jpg)

Projects

![Highfi mobile project](https://nickallama.github.io/swd500-responsive-website/wireframes/mockup/mobile-project.jpg)

Blog

![Highfi mobile blog](https://nickallama.github.io/swd500-responsive-website/wireframes/mockup/mobile-blog.jpg)

Blogpost

![Highfi mobile blogpost](https://nickallama.github.io/swd500-responsive-website/wireframes/mockup/mobile-blogpost.jpg)

#### Desktop
Home

![Highfi desktop home](https://nickallama.github.io/swd500-responsive-website/wireframes/mockup/desktop-home.jpg)

About

![Highfi desktop about](https://nickallama.github.io/swd500-responsive-website/wireframes/mockup/desktop-about.jpg)

Contact

![Highfi desktop contact](https://nickallama.github.io/swd500-responsive-website/wireframes/mockup/desktop-contact.jpg)

Projects

![Highfi desktop project](https://nickallama.github.io/swd500-responsive-website/wireframes/mockup/desktop-project.jpg)

Blog

![Highfi desktop blog](https://nickallama.github.io/swd500-responsive-website/wireframes/mockup/desktop-blog.jpg)

Blogpost

![Highfi desktop blogpost](https://nickallama.github.io/swd500-responsive-website/wireframes/mockup/desktop-blogpost.jpg)


