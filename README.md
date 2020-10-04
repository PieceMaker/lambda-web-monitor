# reloading-monitor

This project contains AWS Lambda code that monitors websites selling reloading supplies. When a website has
a supply of the item being monitored, it sends a text message to the configured number.

## Test Locally

To test the monitor locally, run the following

```
sam local invoke BrownellsMonitor
```

## Deploy

To deploy the application, run the following:

```
sam build
sam deploy --guided
```