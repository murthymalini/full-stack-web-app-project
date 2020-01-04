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
##############################################################################################


########## Route that returns distinct causes for drop down menu #############################    
@app.route("/causes", methods=['GET'])
def getCauses():
  deaths = mongo.db.mortality_records
  output = []
  final_data = []

  for s in deaths.distinct("cause_name")  :
    output.append({'cause_name' : s})

  final_data=sorted(output, key = lambda i: i['cause_name'])    
  return jsonify({'result' : final_data})
################################################################################################


########## Route that returns distinct years for drop down menu ################################    
@app.route("/years", methods=['GET'])
def getYears():

  deaths = mongo.db.mortality_records
  output = []
  final_data = []

  for s in deaths.distinct("year")  :
    output.append({'year' : s})

  final_data=sorted(output, key = lambda i: i['year'], reverse=True)      
  return jsonify({'result' : final_data})
################################################################################################


########## Route that returns one year of data for All Causes ##################################    
@app.route('/data', methods=['GET'])
def getData():
  deaths = mongo.db.mortality_records
  output = []
  myquery = {"year": 2017  ,"cause_name": "All causes"}

  for s in deaths.find(myquery):
    output.append({'year' : s['year'],'cause_name' : s['cause_name'],'state' : s['state'],'deaths' : s['deaths'],'aadr' : s['aadr'], 'Latitude' : s['Latitude'], 'Longitude' : s['Longitude']})
  
  return jsonify({'result' : output})
###############################################################################################


########## Route that returns data for specific year and specific cause #######################    
@app.route('/data/<year>/<cause_str>', methods=['GET'])
def getSearchYearCauseData(year,cause_str):
  deaths = mongo.db.mortality_records
  output = []
  final_data = []

  myquery = {"year": int(year),"cause_name": {"$regex": cause_str, "$options" : "i"}}

  for s in deaths.find(myquery):
    output.append({'year' : s['year'],'cause_name' : s['cause_name'],'state' : s['state'],'deaths' : s['deaths'],'aadr' : s['aadr'], 'Latitude' : s['Latitude'], 'Longitude' : s['Longitude']})
  
  final_data=sorted(output, key = lambda i: i['state'])   
  return jsonify({'result' : final_data})
###############################################################################################

########## Route that returns just the pie chart html #########################################
########## this is just for testing purposes and can be deleted
@app.route("/piechart")
def piechart():
    collection = mongo.db.mortality_records.find_one()
    return render_template("index_map.html", collection=collection)
###############################################################################################


########## Route that returns complete data ###################################################
@app.route('/alldata', methods=['GET'])
def alldata():
  """Return the complete data"""
  deaths = mongo.db.mortality_records
  output = []
  for s in deaths.find():
    output.append({'year' : s['year'],'cause_name' : s['cause_name'],'state' : s['state'],'deaths' : s['deaths'],'aadr' : s['aadr'], 'Latitude' : s['Latitude'], 'Longitude' : s['Longitude']})
  return jsonify({'result' : output})

###############################################################################################


####### Route to return all data for a specific year ##########################################
@app.route("/year/<year>", methods=['GET'])
def sample_yearData(year):
    """Return the all data for a given year."""
    query = year
    data=mongo.db.mortality_records.find({"year": int(query)})
    output = []
    for i in data:
        output.append({'year' : i['year'],'cause_name' : i['cause_name'],'state' : i['state'],'deaths' : i['deaths'],'aadr' : i['aadr']})
    return jsonify({'result' : output})
###############################################################################################


####### Route to return a list of states ######################################################
@app.route("/state", methods=['GET'])
def getStates():
    """Return a list of states."""

    # state_data=mongo.db.mortality_records.find({"state": query})
    state_data=mongo.db.state_code.find()
    
    output = []
    for i in state_data:
        output.append({'state' : i['state'],'Code' : i['Code']})
    return jsonify({'result' : output})
###############################################################################################

####### Route to return a specific state/abbr #################################################
@app.route("/state/<state_abbr>", methods=['GET'])
def getStateList(state_abbr):
    """Return all state/abbr for a given state."""

    # state_data=mongo.db.mortality_records.find({"state": query})
    state_data=mongo.db.state_code.find({"Code": state_abbr})
    
    output = []
    for i in state_data:
        output.append({'state' : i['state'],'Code' : i['Code']})
    return jsonify({'result' : output})
################################################################################################


####### Route to return all data for a state, cause, year #######################################
@app.route("/state/<state_abbr>/<year>/<cause_str>", methods=['GET'])
def getStateCause(state_abbr,year,cause_str):
    """Return the Data for a given state, year and cause."""

    output = []
    state_data=mongo.db.state_code.find({"Code": state_abbr})

    # use state_abbr to lookup state
    for i in state_data:
        myState=i['state']
    
    # use all input for the query
    myquery = {"year": int(year),"state": myState, "cause_name": {"$regex": cause_str, "$options" : "i"}}
    cause_data=mongo.db.mortality_records.find(myquery)

    for j in cause_data:
        output.append({'state' : j['state'],'cause_name' : j['cause_name'],'deaths' : j['deaths'],'aadr' : j['aadr'],'year' : j['year']})
    return jsonify({'result' : output})
###############################################################################################


####### Route to return all data for a given state ############################################
@app.route("/state/<state>", methods=['GET'])
def sample_stateData(state):
    """Return all Data for a given state."""
    query = state
    state_data=mongo.db.mortality_records.find({"state": query})
    output = []
    for i in state_data:
        output.append({'state' : i['state'],'cause_name' : i['cause_name'],'deaths' : i['deaths'],'aadr' : i['aadr'],'year' : i['year']})
    return jsonify({'result' : output})
#################################################################################################


###### Route to send summarized data for line plot all years, causes with total deaths ##########
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
              'total_deaths': { '$sum': "$deaths" },
              'total_aadr': { '$sum': "$aadr" },
              'count_rows': { '$sum': 1 }
          }
      }
    ]
  )
         
  total_deaths=[]
  total_aadr=[]
  causes=[]
  years=[]
  complete_data=[]
  for i in grouped_data:
        data={}
        total_deaths.append(i['total_deaths'])
        total_aadr.append(i['total_aadr'])
        causes.append(i['_id']['cause'])
        years.append(i['_id']['years_name'])
        data["deaths"]=i['total_deaths']
        data["aadr"]=i['total_aadr']
        data["causes"]=i['_id']['cause']
        data["year"]=i['_id']['years_name']
        complete_data.append(data)
  #Sort data based off year       
  final_data=sorted(complete_data, key = lambda i: i['causes'])     
  return jsonify(final_data)  
###############################################################################################


############## Route to send data all data for given year, used for donut chart ###############
@app.route("/total_deaths/<year>", methods=['GET'])
def total_YRdeath(year):
  query = year
  grouped_data=mongo.db.mortality_records.aggregate(
    [
      
      { '$match': {"year": int(query)}},

      {
        '$group':
           {
               '_id':
               {'cause': "$cause_name", 
               'years_name': "$year"},
              'total_deaths': { '$sum': "$deaths" },
              'total_aadr': { '$sum': "$aadr" },
              'count_rows': { '$sum': 1 }
          }
      }
    ]
  )
         
  total_deaths=[]
  total_aadr=[]
  causes=[]
  years=[]
  complete_data=[]
  for i in grouped_data:
        data={}
        total_deaths.append(i['total_deaths'])
        total_aadr.append(i['total_aadr'])
        causes.append(i['_id']['cause'])
        years.append(i['_id']['years_name'])
        data["deaths"]=i['total_deaths']
        data["aadr"]=i['total_aadr']
        data["causes"]=i['_id']['cause']
        data["year"]=i['_id']['years_name']
        complete_data.append(data)

  #Sort data based off total deaths, descending order       
  final_data=sorted(complete_data, key = lambda i: i['deaths'], reverse=True)     
  return jsonify(final_data) 
###############################################################################################
  
############## Route to send all data for a specific cause, used for line plot ################
# cause_str is first few letters of the cause, prevents sending spaces for causes with two words
@app.route('/data/<cause_str>', methods=['GET'])
def getSearchCauseData(cause_str):  
  myquery = {"cause_name": {"$regex": cause_str, "$options" : "i"}}

  grouped_data=mongo.db.mortality_records.aggregate(
    [      
      { '$match': myquery
      },
      {
        '$group':
           {
               '_id':
               {'cause': "$cause_name", 
               'years_name': "$year"},
              'total_deaths': { '$sum': "$deaths" },
              'total_aadr': { '$sum': "$aadr" },
              'count_rows': { '$sum': 1 }
          }
      }
    ]
  )
         
  total_deaths=[]
  total_aadr=[]
  causes=[]
  years=[]
  complete_data=[]
  for i in grouped_data:
        data={}
        total_deaths.append(i['total_deaths'])
        total_aadr.append(i['total_aadr'])
        causes.append(i['_id']['cause'])
        years.append(i['_id']['years_name'])
        data["deaths"]=i['total_deaths']
        data["aadr"]=i['total_aadr']
        data["causes"]=i['_id']['cause']
        data["year"]=i['_id']['years_name']
        complete_data.append(data)

  #Sort data based off year       
  final_data=sorted(complete_data, key = lambda i: i['year'])     
  return jsonify(final_data)  
###############################################################################################


###############################################################################################

# sample query for aggregating to get min and max deaths
# coll.aggregate([{$group:{_id:"$cause_name",min_deaths: {$min: "$deaths"},max_deaths: {$max: "$deaths"}}}])

if __name__ == "__main__":
    app.run(debug=True)