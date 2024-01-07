#!/bin/bash

nohup ng serve --host 157.245.69.213 > log.txt 2>&1 &

echo $! > ./angular_pid.file
