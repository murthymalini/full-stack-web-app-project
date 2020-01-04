# import necessary libraries
from flask import Flask, render_template
# from flask_table import Table, Col
from flask_pymongo import PyMongo
from flask import jsonify
from flask import request
import json
import dns
import os

app = Flask(__name__)

mapkey = os.environ.get('MAPKEY', '')

# Use flask_pymongo to set up mongo connection
# Use flask_pymongo to set up mongo connection
# app.config["MONGO_URI"] = "mongodb://localhost:27017/craigslist_app"
app.config["MONGO_URI"] = "mongodb+srv://Harmeet:harmeet123@cluster0-v6uxh.mongodb.net/complete_death_coord_data"
mongo = PyMongo(app)

# Or set inline
# mongo = PyMongo(app, uri="mongodb://localhost:27017/craigslist_app")

@app.route("/")
def index():
    collection = mongo.db.mortality_records.find_one()
    # output = []
    # causes = mongo.db.mortality_records.distinct("cause_name")

    return render_template("index.html", collection=collection)

@app.route("/usmap")
def usmap():
    collection = mongo.db.mortality_records.find_one()
    return render_template("index_map.html", collection=collection)

@app.route('/causes', methods=['GET'])
def causes():
  deaths = mongo.db.mortality_records
  output = []
#   myquery = { "year": "2017" }

#   for s in deaths.find(myquery):
  for s in deaths.find():
    output.append({'year' : s['year'],'cause_name' : s['cause_name'],'state' : s['state'],'deaths' : s['deaths'],'aadr' : s['aadr'], 'Latitude' : s['Latitude'], 'Longitude' : s['Longitude']})
  return jsonify({'result' : output})


# create route that gives us our map key
@app.route("/mapkey")
def mapkeyroute():
    global mapkey
    config = { "apikey": mapkey }
    return jsonify(config)


if __name__ == "__main__":
    app.run(debug=True)