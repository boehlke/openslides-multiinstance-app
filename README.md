# Multi instance frontend app for OpenSlides

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `./node-module/.bin/bower install`

## Running / development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code generators

Make use of the many generators for code, try `ember help generate` for more details

### Running tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

## Deploying on Debian Jessie

### Add user to run the front end

    useradd -m -s /bin/bash openslides

### Install dependencies from Debian

    apt-get install npm nodejs-legacy

### Install NPM packages not provided by Debian

    npm install -g bower
    npm install -g ember-cli

### Clone repository

    su - openslides
    git clone https://github.com/OpenSlides/openslides-multiinstance-app.git

### Install various remaining dependencies

    cd ~openslides/openslides-multiinstance-app
    npm install
    bower install

### Test: Run in foreground

    ember server

### Systemd service file example

`/etc/systemd/system/openslides-frontend.service`:

    [Unit]
    Description=OpenSlides Multi-Instance front end
    Wants=network.target

    [Service]
    WorkingDirectory=/home/openslides/openslides-multiinstance-app
    ExecStart=/usr/local/bin/ember server
    User=openslides

    [Install]
    WantedBy=multi-user.target

### TODO
* Good enough to run as same user as the backend?
* This installs components locally inside the repository; is that a good idea?

## Accessing instances

Instances will be assigned subdomains of the configured domain, so you will
probably want to configure a wildcard DNS record.


## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

