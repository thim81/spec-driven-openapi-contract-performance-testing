#!/bin/bash

# Open Grafana in the browser
open -a "Google Chrome" http://localhost:5000

# Start InfluxDB in the foreground
/opt/homebrew/opt/influxdb@1/bin/influxd -config /opt/homebrew/etc/influxdb.conf &

# Wait for InfluxDB to start
sleep 5

# Start Grafana in the foreground
/opt/homebrew/opt/grafana/bin/grafana server --config /opt/homebrew/etc/grafana/grafana.ini --homepath /opt/homebrew/opt/grafana/share/grafana --packaging\=brew cfg:default.paths.logs\=/opt/homebrew/var/log/grafana cfg:default.paths.data\=/opt/homebrew/var/lib/grafana cfg:default.paths.plugins\=/opt/homebrew/var/lib/grafana/plugins

# Wait for Grafana to start
sleep 5

# Keep the script running to keep both processes in the foreground
wait