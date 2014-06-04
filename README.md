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

### Building Front-end

##### Requirements

Front-end SPA app is built with yeoman workflow and backbone generator (using bootstrap + requirejs). So to build and develop, the following are **required**:

* <http://nodejs.org/>
* <http://yeoman.io/> 
* <http://compass-style.org/install/>

Once the required tools are installed, download/install vendor plugins. Run the following commands from the root directory of the repository:

```
npm install
bower install
```

The yo generator is not required, but helpful for development:
* <https://github.com/yeoman/generator-backbone>



##### Building

The front-end code needs to be built, before publishing. Once the tools above are isntalled, run in the command line, from the root directory of the repository:

```
grunt build
```

##### Developing
To run the node server and live reload while developing:

```
grunt server
```
