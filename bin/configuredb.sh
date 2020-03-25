#!/bin/bash

db="monstersdb"

echo -e "Configuring database ($db)...\n"

dropdb monstersdb -U deschamps
createdb monstersdb -U deschamps

psql -d monstersdb -U deschamps < ./bin/sql/monsters.sql

echo -e "\n[Database ($db) configured.]"