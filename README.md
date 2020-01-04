# Paradise, an interactive dashboard for top 10 leading death causes in United States 
<a href="https://github.com/Harmeet2504/full-stack-web-app-project/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/Harmeet2504/full-stack-web-app-project?color=yellow"></a>
<a href="https://github.com/Harmeet2504/full-stack-web-app-project/network"><img alt="GitHub forks" src="https://img.shields.io/github/forks/Harmeet2504/full-stack-web-app-project?color=yellow"></a>
<a href="https://github.com/Harmeet2504/full-stack-web-app-project/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/Harmeet2504/full-stack-web-app-project"></a>
<a href="https://github.com/Harmeet2504/full-stack-web-app-project"><img alt="GitHub license" src="https://img.shields.io/github/license/Harmeet2504/full-stack-web-app-project?color=red"></a>

## Group Members
* Mary Brown
* Malini Murthy
* Harmeet Kaur
* Emi Babu 

## Summary

This is an internactive Web Dashboard of US death rates and death causes (per 100,000 in population) for every state in the United States for 8 years (2010-2017) based on data from the Center for Disease Control (CDC), supplemented with data for state coordinates and state codes.

 ## Installations
  pip install requirements.txt
  
## Objectives
•What is the leading cause of death in the USA?

•How have death trends been due to each cause from 2010-2017?

•Identify high-risk states based on mortality statistics across 50 states of USA and the District of Columbia

## Sources 

* Center for Disease Control and Prevention (https://data.cdc.gov/NCHS/NCHS-Leading-Causes-of-Death-United-States/bi63-dtpu): This dataset presents the age-adjusted death rates for the 10 leading causes of death in the United States beginning in 1999.Total number of records are 10,886. Data are based on information from all resident death certificates filed in the 50 states and the District of Columbia using demographic and medical characteristics. Age-adjusted death rates (per 100,000 population) are based on the 2000 U.S. standard population. 
* "https://www.latlong.net/category/states-236-14.html": This dataset includes information on coordinates for all 50 states.

## Workflow 
![Alt text](https://github.com/Harmeet2504/full-stack-web-app-project/blob/master/images/workflow.png)

### Step 1 : Extract Data (Modules: json, requests, pandas)

 Datasets were extracted from CDC API endpoints in the json format by applying filtering and paging criteria from  "https://data.cdc.gov/resource/bi63-dtpu.json$where=year>=2010&$limit=4600" to fetch records from 2010 through 2017. Coordinates for all 50 states were scrapped from "https://www.latlong.net/category/states-236-14.html".


### Step 2 : Data wrangling and Databasing (Modules: pandas, pymongo, os, MongoDB Compass)

 -Datasets were loaded as pandas dataframe. Column ('_113_cause_name')) irrelevant to the project were dropped. Data cleaning (split, rename, drop) was performed to merge the two dataframes using a common key ('state'). The coordinates for DC was missing in the scrapped dataset. Hence, it was manually incorporated into the master data.
 
 -The final dataset was deployed onto non-relational “NoSQL” database, MongoDB. An account was set up in MongoDB cluster that could be accessed/connected through commandline or using GUI enabled MongoDB Compass.  MongoClient was used to communicate with MongoDB using pymongo. Documents were loaded as dictionaries as NoSQL database provides support for JSON-styled, document-oriented storage systems. The database is available as "complete_death_coord_data" with one collection named "mortality_records".
 
 ### Step 3: Design Flask API 
 -Data from database were pulled in to create an API with multiple (specify number) routes using Flask `jsonify` to convert data into a valid JSON response object. Data returned from routes were used in building interactive visualizations using javascript libraries.
 
 ### App Routes
http://localhost:8000/causes

http://localhost:8000/years

http://localhost:8000/data

http://localhost:8000/data/<year>/<cause_str>
 
http://localhost:8000/alldata

http://localhost:8000/year/<year>
 
http://localhost:8000/state

http://localhost:8000/state/<state_abbr>

http://localhost:8000/total_deaths

http://localhost:8000/total_deaths/<year>
 
http://localhost:8000/data/<cause_str> 
 
### Step 4 : Render visualizations on the app/dashboard

-The app/dashboard has two dropdown menus that control the visualizations based on year and cause. The visualizations are: 

1. An interactive donut plot created using chart.js that shows percentage of death rate across US due to each cause.
![Alt text](https://github.com/Harmeet2504/full-stack-web-app-project/blob/master/images/donut.png)
2. A scatter plot created using D3.js that shows death trends over the years(2010-2017) for each of the leading cause.
![Alt text](https://github.com/Harmeet2504/full-stack-web-app-project/blob/master/images/scatter.png)
3. An interactive chloropleth map showing death rates for each state. Differential color intensity reflects number of deaths. Source for   geojson state polygon geometry info comes from file from this website: https://leafletjs.com/examples/choropleth/us-states.js
state boundaries on the map.
![Alt text](https://github.com/Harmeet2504/full-stack-web-app-project/blob/master/images/map.png)

### Files used
 - HMTL & CSS files
   - index.html : Used to set up the webpage where data will be rendered that create vizualisations
   - style.css : Used to style the webpage
 
 - Javascript Files 
   - dashboard.js : controls the dashboard look, menu dropdown
   - deathRate.js : update geojson properties for total deaths and aadr
   - donutChart.js : create the donut chart
   - globalVariables.js : dropdown menu variables re-used across multiple js files
   - mapColors.js : choropleth map
   - scatter.js : creates the scatter plot to show trends across all causes
   - us-states.js : refers to US states with latitude and longitude geo co-ordinates
   - Config.js : To be created and Mapbox access key added
   
 ### Javascript packages used:
 * Mapbox
 * Leaflet
 * D3
 * Chart.js
 
 
### Challenges Faced 
1. Connecting the scatter plot for each cause using a line to show trends with different units of measurement in one graph.
2. Map: Getting the properties within choropleth, passing an array within locations and z:co-ordinates : Resolved
3. Connecting the plots together with the dropdown : Resolved
4. Deployment on Heroku with mLab MongoDB


### Findings of the project

1) Heart disease and cancer are by far the two highest causes of death in the United States in comparison to the other eight top causes of death. CLRD, stroke, and unintentional injuries have also consistently been in the top five causes of death, yet each of these accounts for lessthan a third of the deaths caused by heart disease (the leading cause of death) each year.

2) Seven of the ten causes have generally trended upwards since 2010 in terms of total deaths. The three causes that don't show this trend are stroke, heart disease, and influenza and pneumonia. But Cancer and Heart disease are the causes which have the most number of deaths in the United States.

3) There is obviously a high correlation with population size and the amount of deaths in a state, which explains why California and Texas are always the most darkly shaded for total deaths from Heart Disease(which is the one of the top cause), Influenza and Pneumonia. CA and TX are mostly darkly shaded, but they also have more population, hence more deaths. This is interpreted by the fact that 43% of US adults refuse to get the flu vaccinations within these states. Alzeihmers, Dementia, Mild CongnitiveImpairment seems low in Montana and Idaho compared to other states overall. 

### To run: 

1. Run: pip install -r requirements.txt to install necessary modules in environment.
2. An API key for MapBox is required. These can be obtained at https://docs.mapbox.com/help/glossary/access-token/. After obtaining a key, copy that key into the config.js file.
3. Run app.py.
4. Access application at http://localhost:8000/.



