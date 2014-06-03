hack4co-tepeyac-ui
==================

Clinica Tepeyac (UI)


---- Hosting -------



== Changes To The web.config ==
https://github.com/turpana/hack4co-tepeyac-ui/blob/master/api/Clinical.API/Clinical.API/Web.config

-- MongoDB --

1.  Create an account in https://mongolab.com
2.  Update the web.config values for the mongo username/password and instance url.
    <connectionStrings>
      	<add name="MongoDB" connectionString="mongodb://{userName}:{password}@{url}:{port}/{databaseName}" />
    </connectionStrings>


-- Twilio --

1.  Create an account in https://www.twilio.com
2.  Update the web.config values with the SmsSid and SmsAPIKey

```xml

<add key="SmsSid" value="{smsSid}" />
<add key="SmsAPIKey" value="{smsAPIKey}" />

```
