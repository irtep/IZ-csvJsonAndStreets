# based on: https://stackoverflow.com/questions/50105309/python-csv-to-json-create-elements-separated-by-comma
# and https://stackoverflow.com/questions/41480022/python-csv-to-json-w-array-output
import csv
import json

csvfile = open('data/testidata.csv', 'r')
#jsonfile = open('data/testi2.json', 'w')

#fieldnames = ("id",
#              "team_name",
#              "team_members")

reader = csv.DictReader( csvfile) # without headers
# reader = csv.DictReader( csvfile, fieldnames) # with headers
entries = []

for row in reader:
    # testi 2
#    json.dump(row, jsonfile)
#    jsonfile.write('\n')
  entries.append(row)

#print(entries[1])
with open('data/newTest.json', 'w') as jsonfile:
  json.dump(entries, jsonfile)
  jsonfile.write('\n')

# for row in reader:
#     row['team_members'] = row['team_members'].split(',')
#     json.dump(row, jsonfile)
#     jsonfile.write('\n')
