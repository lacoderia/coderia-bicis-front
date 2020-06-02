# coderia-bicis-front

This web app allows clients to pay and schedule classes for a spinning studio.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

This repository contains a Wordpress child template, so there are two things needed to create a development environment:

1. A Wordpress installation
2. Wordpress Elegant Themes' Divi Template installed

### Installing

1. Copy `Divi Child` folder inside `themes` folder
2. Activate Divi Child template


## Deployment

Steps for deploying the app on a production environment:

1. Set up `conekta_public` and `api_url_base` options in the WP database

2. If necessary, find and replace any reference to `localhost` in the WP database

3. Configure environment file `env.js`

```
window.__env.API_URL_BASE=''
```

4. Update template version in `functions.php` file to a greater one

```
define ('VERSION', '3.1.2');
```

## Troubleshooting

#### Page editor stuck while loading Divi Builder (frozen screen)</b>

This problem might appear after a Divi Template update. To solve it go to Divi->Theme Options->Builder and enable "Enable Classic Editor"
