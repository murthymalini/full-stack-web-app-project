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

 (add the heroku link here, if we deploy)

## Summary

This is an internactive Web Dashboard of US death rates and death causes (per 100,000 in population) for every state in the United States for 8 years (2010-2017) based on data from the Center for Disease Control (CDC), supplemented with data for state coordinates and state codes.


## Objectives
•What is the leading cause of death in the USA?

•How have death trends been due to each cause from 2010-2017?

•Identify high-risk states based on mortality statistics across 50 states of USA and the District of Columbia

## Sources 

* Center for Disease Control and Prevention (https://data.cdc.gov/NCHS/NCHS-Leading-Causes-of-Death-United-States/bi63-dtpu): This dataset presents the age-adjusted death rates for the 10 leading causes of death in the United States beginning in 1999.Total number of records are 10,886. Data are based on information from all resident death certificates filed in the 50 states and the District of Columbia using demographic and medical characteristics. Age-adjusted death rates (per 100,000 population) are based on the 2000 U.S. standard population. 
* "https://www.latlong.net/category/states-236-14.html": This dataset includes information on coordinates for all 50 states.
* "http://worldpopulationreview.com/states/state-abbreviations/": This dataset includes state codes.


## Workflow 

### Step 1 : Extract Data (Modules: json, requests, pandas)

 Datasets were extracted from CDC API endpoints in the json format by applying filtering and paging criteria from  "https://data.cdc.gov/resource/bi63-dtpu.json$where=year>=2010&$limit=4600" to fetch records from 2010 through 2017. Coordinates for all 50 states were scrapped from "https://www.latlong.net/category/states-236-14.html" and state codes were downloaded as csv from "https://worldpopulationreview.com/states/state-abbreviations" in jupyter notebook.


### Step 2 : Data wrangling and Databasing (Modules: pandas, pymongo, os, MongoDB Compass)

 -Datasets were loaded as pandas dataframe. Column ('_113_cause_name', 'Abbr')) irrelevant to the project were dropped. Data cleaning (split, rename, drop) was performed to merge the two dataframes using a common key ('state'). The coordinates for DC was missing in the scrapped dataset. Hence, it was manually incorporated into the master data. State codes were incorporated as a separate table.
 
 -The final dataset was deployed onto non-relational “NoSQL” database, MongoDB. An account was set up in MongoDB cluster that could be accessed/connected through commandline or using GUI enabled MongoDB Compass.  MongoClient was used to communicate with MongoDB using pymongo. Documents were loaded as dictionaries as NoSQL database provides support for JSON-styled, document-oriented storage systems. The database is available as "complete_death_coord_data" with two collections named "mortality_records" and "state_codes".
 
 ### Step 3: Design Flask API 
 -Data from database were pulled in to create an API with multiple (specify number) routes using Flask `jsonify` to convert data into a valid JSON response object. Data returned from routes were used in building interactive visualizations using javascript libraries.
 
### Step 4 : Render visualizations on the app/dashboard
-The app/dashboard has two dropdown menus that control the visualizations based on year and cause. The visualizations are (insert images of each)
1. An interactive donut plot created using chart.js that shows percentage of death rate across US due to each cause.
2. A line/scatter plot created using D3.js that shows death trends over the years(2010-2017) for each of the leading cause.
3. An interactive chloropleth map showing death rates for each state. Differential color intensity reflects number of deaths. 

 - HMTL & CSS files
   - index.html : Used to set up the webpage where data will be rendered that create vizualisations
   - style.css : Used to style the webpage
 
 - Javascript Files 
   - logic.js : Primary javascript files that sets up map and connects functions
   - heatmap.js :
   - config.js :
   - 
   -
 
 ### Javascript packages used:
 * Mapbox
 * Leaflet
 * D3
 * Chart
 
 ## Steps to run the application
 
 1. 

### Challenges
1. Line plot: Emi add here
2. Map: Mary add here



### Conclusions
conclusions from interpretations here

To run: Include a Mapbox token 



