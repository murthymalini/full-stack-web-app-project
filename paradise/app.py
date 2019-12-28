from flask import Flask, render_template
# from flask_table import Table, Col
from flask_pymongo import PyMongo
from flask import jsonify
from flask import request
import json

import dns

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb+srv://Harmeet:harmeet123@cluster0-v6uxh.mongodb.net/complete_death_coord_data"
mongo = PyMongo(app)

# Route for homepage
@app.route("/")
def index():
  # """Return the homepage."""
  collection = mongo.db.mortality_records.find_one()
  return render_template("index.html", collection=collection)
############################################################


##########Route that returns one year of data for All Causes ##################    
@app.route('/data', methods=['GET'])
def getData():
  deaths = mongo.db.mortality_records
  output = []
  myquery = {"year": 2017  ,"cause_name": "All causes"}

  for s in deaths.find(myquery):
    output.append({'year' : s['year'],'cause_name' : s['cause_name'],'state' : s['state'],'deaths' : s['deaths'],'aadr' : s['aadr'], 'Latitude' : s['Latitude'], 'Longitude' : s['Longitude']})
  return jsonify({'result' : output})
############################################################


##########Route that returns distinct causes for drop down menu ##################    
@app.route("/causes", methods=['GET'])
def getCauses():
  deaths = mongo.db.mortality_records
  output = []

  for s in deaths.distinct("cause_name"):
    output.append({'cause_name' : s})
  return jsonify({'result' : output})
############################################################


##########Route that returns distinct years for drop down menu ##################    
@app.route("/years", methods=['GET'])
def getYears():

  deaths = mongo.db.mortality_records
  output = []

  for s in deaths.distinct("year"):
    output.append({'year' : s})
  return jsonify({'result' : output})
############################################################


##########Route that returns just the US map html ##################    
@app.route("/usmap")
def usmap():
    collection = mongo.db.mortality_records.find_one()
    return render_template("index_map.html", collection=collection)
############################################################


##########Route that returns just the pie chart html ##################    
@app.route("/piechart")
def piechart():
    collection = mongo.db.mortality_records.find_one()
    return render_template("index_map.html", collection=collection)
############################################################


##########Route that returns complete data##################
@app.route('/alldata', methods=['GET'])
def alldata():
  """Return the complete data"""
  deaths = mongo.db.mortality_records
  output = []
  for s in deaths.find():
    output.append({'year' : s['year'],'cause_name' : s['cause_name'],'state' : s['state'],'deaths' : s['deaths'],'aadr' : s['aadr'], 'Latitude' : s['Latitude'], 'Longitude' : s['Longitude']})
  return jsonify({'result' : output})

############################################################


#######Route to return metadata for a year####################
@app.route("/year/<year>", methods=['GET'])
def sample_yearData(year):
    """Return the MetaData for a given year."""
    query = year
    data=mongo.db.mortality_records.find({"year": int(query)})
    years_output = []
    for i in data:
        years_output.append({'year' : i['year'],'cause_name' : i['cause_name'],'state' : i['state'],'deaths' : i['deaths']})
    return jsonify({'result' : years_output})
###############################################################

#######Route to return metadata for a state####################
@app.route("/state/<state>", methods=['GET'])
def sample_stateData(state):
    """Return the MetaData for a given state."""
    query = state
    state_data=mongo.db.mortality_records.find({"state": query})
    state_output = []
    for i in state_data:
        state_output.append({'state' : i['state'],'cause_name' : i['cause_name'],'deaths' : i['deaths'],'year' : i['year']})
    return jsonify({'result' : state_output})
###############################################################
##############Route to send data for line plot################
@app.route("/total_deaths", methods=['GET'])
def total_deaths():
  grouped_data=mongo.db.mortality_records.aggregate(
    [
      {
        '$group':
           {
               '_id':
               {'cause': "$cause_name", 
               'years_name': "$year"},
              'total_ui': { '$sum': "$deaths" },
              'count_ui': { '$sum': 1 }
          }
      }
    ]
  )
         
  total_deaths=[]
  causes=[]
  years=[]
  complete_data=[]
  for i in grouped_data:
        data={}
        total_deaths.append(i['total_ui'])
        causes.append(i['_id']['cause'])
        years.append(i['_id']['years_name'])
        data["deaths"]=i['total_ui']
        data["causes"]=i['_id']['cause']
        data["year"]=i['_id']['years_name']
        complete_data.append(data)
  #Sort data based off year       
  final_data=sorted(complete_data, key = lambda i: i['year'])     
  return jsonify(final_data)  


if __name__ == "__main__":
    app.run(debug=True)