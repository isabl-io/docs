[![](https://data.jsdelivr.com/v1/package/npm/candy-app/badge)](https://www.jsdelivr.com/package/npm/candy-app) [![npm version](https://badge.fury.io/js/candy-app.svg)](https://badge.fury.io/js/candy-app) [![GitHub version](https://badge.fury.io/gh/leukgen%2Fcandy.svg)](https://badge.fury.io/gh/leukgen%2Fcandy)

# Candy 🍬

The frontend is developed with [Vue.js], meant to be the main Frontend client for the bee [Backend](guides/api).

It's served rigth out of the box, in the [django bee] project, but it can be installed as a standalone app.

## Manual Installation

To consume the app:

```html
<!-- index.html -->

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <meta charset="UTF-8">
        <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet" type="text/css">
        <link rel="icon" href="favicon.ico">
        <title>My Awesome App</title>
    </head>
    <body>
        <div id="web-candy"></div>
        <script src="https://cdn.jsdelivr.net/npm/vue"></script>
        <script src="https://cdn.jsdelivr.net/npm/candy-app"></script>
        <script>
            window.$candy = {
                apiHost: "http://my.bee.api.host"
                //...
            }
        </script>
    </body>
</html>
```

## Settings

You can configure the `window.$candy`.

* `apiHost`: url host where your [bee api](guides/api) is running.
    * Type: `String`
    * Default: `''`

* `name`: custom app title that is shown in the top of the app.
    * Type: `String`
    * Default: `''`

* `logo`: custom image path that is shown as the main logo of the app.
    * Type: `String`
    * Default: `''`

```html
<script>
    window.$candy = {
        apiHost: "http://my.bee.api.host",
        name: "My Cool App",
        logo: "/path/to/my/awesome/logo"
    }
</script>
```

In case you're running your frontend instance in a different host that the backend, you should add these settings to your django project where the [api][django bee] is running:

```python
BEE_SETTINGS['URL_FRONTEND'] = "http://your-frontend-host.com"
CORS_ORIGIN_WHITELIST = [BEE_SETTINGS['URL_FRONTEND']]
```

## Development

To start the frontend development server:

```bash
# clone the project
git clone https://github.com/leukgen/candy

# Install all yarn dependencies
yarn install

# Start the vue-cli development server
yarn dev
```

In case you don't have [yarn] installed
```bash
brew install yarn --without-node
```

## Testing


```bash
# To run end-to-end tests
yarn test:e2e

# To run the unit tests
yarn test:unit
```

[Vue.js]: https://vuejs.org/
[django bee]: https://github.com/leukgen/django-bee
[web-components]: https://www.sitepen.com/blog/2018/07/06/web-components-in-2018/
[yarn]: https://yarnpkg.com/en/docs/install#mac-stable
