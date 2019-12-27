# import necessary libraries
# from flask_table import Table, Col
from flask import Flask, render_template
from flask import jsonify
from flask import request
from flask_pymongo import PyMongo
import json
import dns
import os

app = Flask(__name__)

mapkey = os.environ.get('MAPKEY', '')

# Use flask_pymongo to set up mongo connection
# app.config["MONGO_URI"] = "mongodb://localhost:27017/craigslist_app"
app.config["MONGO_URI"] = "mongodb+srv://Harmeet:harmeet123@cluster0-v6uxh.mongodb.net/complete_death_coord_data"
mongo = PyMongo(app)

# Or set inline
# mongo = PyMongo(app, uri="mongodb://localhost:27017/craigslist_app")

@app.route("/")
def index():
    # collection = mongo.db.mortality_records.find_one()
    # return render_template("index.html", collection=collection)
    return render_template("index.html")
    
@app.route('/data', methods=['GET'])
def getData():
  deaths = mongo.db.mortality_records
  output = []
  myquery = {"year": "2017"  ,"cause_name": "All causes"}

  for s in deaths.find(myquery):
    output.append({'year' : s['year'],'cause_name' : s['cause_name'],'state' : s['state'],'deaths' : s['deaths'],'aadr' : s['aadr'], 'Latitude' : s['Latitude'], 'Longitude' : s['Longitude']})
  return jsonify({'result' : output})

@app.route("/causes", methods=['GET'])
def getCauses():
  deaths = mongo.db.mortality_records
  output = []

  for s in deaths.distinct("cause_name"):
    output.append({'cause_name' : s})
  return jsonify({'result' : output})

@app.route("/years", methods=['GET'])
def getYears():

  deaths = mongo.db.mortality_records
  output = []

  for s in deaths.distinct("year"):
    output.append({'year' : s})
  return jsonify({'result' : output})

@app.route("/usmap")
def usmap():
    collection = mongo.db.mortality_records.find_one()
    return render_template("index_map.html", collection=collection)

# create route that gives us our map key
@app.route("/mapkey")
def mapkeyroute():
    global mapkey
    config = { "apikey": mapkey }
    return jsonify(config)


if __name__ == "__main__":
    app.run(debug=True)