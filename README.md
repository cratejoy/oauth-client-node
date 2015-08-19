## Introduction

This is an example OAuth client application that can authenticate a Cratejoy store's customers against a custom back-end.

It is useful to Cratejoy merchants who are trying to implement a way for their customers to log into a site or app 
(outside their Cratejoy-hosted storefront).

This example assumes that you have (more than a little) experience with JavaScript, and are capable of deploying 
a nodejs application on Heroku. If you don't know where to start, 
 [this tutorial](https://devcenter.heroku.com/articles/getting-started-with-nodejs) is a great resource.

To get OAuth credentials for your application, please submit a request to support@cratejoy.com.

## Environment Variables

Four [environment variables](https://devcenter.heroku.com/articles/config-vars) are required to log customers into your Cratejoy store:

- `CRATEJOY_OAUTH_CLIENT_ID` - Your application client_id (provided by Cratejoy support).
- `CRATEJOY_OAUTH_SECRET` - Your application secret key (provided by Cratejoy support).
- `CRATEJOY_STORE_URL` - The URL of your cratejoy store's index page, e.g. https://my_store.cratejoy.com
- `SERVICE_URL` - The URL of your hosted Heroku app (without the trailing slash).

If you have questions or concerns, reach out to support@cratejoy.com.

