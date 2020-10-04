# lambda-web-monitor

This project contains AWS Lambda code that monitors a configured webpage. It queries the webpage for a desired
status and, if that status is found, will send a text message to the configured number.

A query function is
provided to the monitor that should return the piece of interest in the webpage. A checker function is also
provided that accepts the result from the query function and returns a boolean. If this function returns `true`,
then  When a website has a supply of the item being monitored, it sends a text message to the configured number.

## Usage

A simple class is provided at `lib/Monitor.js`. This class contains one method, `Monitor.check`, which is what
is directly called by the Lambda.

When instantiating the class, it requires an object with three properties: `url`, `queryFunction`, and
`checkStatus`.

`url` is the URL of the webpage to monitor.

`queryFunction` is a function that accepts `$`, the result of calling `cheerio.load` on the webpage response.
The query should use standard jQuery.

`checkStatus` takes the result from `queryFunction` and returns a boolean. When the result is `true`, a text
message will be triggered.

## Text Messages

This library uses [Twilio](https://www.twilio.com/) to send text messages. Once your account and number has
been established, fill out the information in `config.js`.

For more information on sending SMS from Node with Twilio, see their
[quickstart guide](https://www.twilio.com/docs/sms/quickstart/node).

## Example

A sample monitor has been provided and can be found at `monitors/google.js`. This monitor checks Google's
home page. The provided `queryFunction` looks for the element with `id="hplogo"` and returns the `alt`
attribute of that element, which should be "Google". The configured `checkStatus` function checks that the
`alt` attribute does not equal "Google". If you want to see the texting behavior, change the `checkStatus`
to check that the attribute *does* equal "Google" and a text message will be sent to the configured number.

In order to build and test the Lambda locally, you will need to install the
[AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)

### Build and Test Locally

To build the Lambda, run the following:

```
sam build
```

To test the monitor locally, run the following

```
sam local invoke
```

## Deploy

To deploy the application, run the following:

```
sam build
sam deploy --guided
```