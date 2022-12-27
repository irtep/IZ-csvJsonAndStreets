# based on: https://stackoverflow.com/questions/50105309/python-csv-to-json-create-elements-separated-by-comma

import csv
import json

csvfile = open('files/csv/input/demo.csv', 'r')
jsonfile = open('files/csv/input/demo.csv', 'w')

#fieldnames = ("id",
#              "team_name",
#              "team_members")

reader = csv.DictReader( csvfile) # without headers
# reader = csv.DictReader( csvfile, fieldnames) # with headers
for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write('\n')


# for row in reader:
#     row['team_members'] = row['team_members'].split(',')
#     json.dump(row, jsonfile)
#     jsonfile.write('\n')
