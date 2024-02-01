# How to setup Grafana & InfluxDB for K6

Online guide: https://medium.com/@nagaraj.kamalashree/how-to-install-tig-stack-telegraf-influx-and-grafana-on-mac-os-b989b2faf9f8

## Install InfluxDB on Mac

```bash
#brew install influxdb
brew install influxdb@1
```

Once the installation is complete, start the influxdb service.

# To have launchd start influxdb now and restart at login:
```bash
brew services start influxdb
```

# If you don’t want/need a background service you can just run:
```bash 
#influxd -config /usr/local/etc/influxdb.conf
#INFLUXD_CONFIG_PATH="/opt/homebrew/etc/influxdb2/config.yml" /opt/homebrew/opt/influxdb/bin/influxd
/opt/homebrew/opt/influxdb@1/bin/influxd -config /opt/homebrew/etc/influxdb.conf
```

Open http://localhost:8086/ in your browser. You should see the InfluxDB admin interface.

If you now run `ps -ef | grep influxdb`, you should be able to see influxdb running on your machine and to check the ports it is listening on, use the command `lsof -aPi -p <pid-of-influxdb-service>`.

Next, let’s login into InfluxDB’s command line interface and check our system metrics. To access the CLI, launch `influx` in your terminal. Once you’ve entered the shell and successfully connected to an InfluxDB node, you’ll see the following output:

```shell
influx v1 shell
Connected to http://localhost:8086 version v1.7.6
InfluxDB shell version: v1.7.6
Once you are inside the influx CLI, execute the following set of commands to check the system metrics (includes sample output of each command).
```

Step 3: Install Grafana

To install Grafana, just run the following command.

```shell
brew install grafana
```

Once the installation is complete, start the grafana service. Grafana by default runs on port 3000.

# To have launchd start grafana now and restart at login:
```shell
$ brew services start grafana
```
# Or, if you don't want/need a background service you can just run:

```shell
#grafana-server --config=/usr/local/etc/grafana/grafana.ini --homepath /usr/local/share/grafana --packaging=brew cfg:default.paths.logs=/usr/local/var/log/grafana cfg:default.paths.data=/usr/local/var/lib/grafana cfg:default.paths.plugins=/usr/local/var/lib/grafana/plugins
/opt/homebrew/opt/grafana/bin/grafana server --config /opt/homebrew/etc/grafana/grafana.ini --homepath /opt/homebrew/opt/grafana/share/grafana --packaging\=brew cfg:default.paths.logs\=/opt/homebrew/var/log/grafana cfg:default.paths.data\=/opt/homebrew/var/lib/grafana cfg:default.paths.plugins\=/opt/homebrew/var/lib/grafana/plugins
```

Server URL: http://localhost:8086

Configure Grafana to use InfluxDB as a data source

http://localhost:3000/d/XKhgaUpik/k6-load-testing-results-2?orgId=1