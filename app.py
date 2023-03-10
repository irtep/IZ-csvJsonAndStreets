# based on: https://stackoverflow.com/questions/50105309/python-csv-to-json-create-elements-separated-by-comma
# and https://stackoverflow.com/questions/41480022/python-csv-to-json-w-array-output
import csv
import json

# input file, that should be cvs, the raw data
input_file = 'dataInput/kolme_kuntaa_12kk_myynti.csv' # statsTesti.csv mitä käytän ton uuden testauksessa
# output file, that is converted to json. in input file as it is input for finishProduct
# if you change this, change from finishProduct too
output_file = 'dataInput/newJson.json' 

csvfile = open(input_file, 'r')

reader = csv.DictReader( csvfile)
entries = []

for row in reader:
  entries.append(row)

with open(output_file, 'w') as jsonfile:
  json.dump(entries, jsonfile)
  jsonfile.write('\n')

# to start in mac, type: python3 app.py 
# does not say anything like "ready" or anything, it just does it