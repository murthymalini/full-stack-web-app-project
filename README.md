# United States - Top 10 Leading Death Causes 
# Interactive Web Dashboard (add the heroku link here, if we deploy)


## Summary

This is an internactive Web Dashboard of US death rates and death causes (per 100,000 in population) for every state in the United States for 8 years (2010-2017) based on data from the Center for Disease Control (CDC)

## Group Members
* Mary Brown
* Malini Murthy
* Harmeet Kaur
* Emi Babu 

## Sources 

* 1. Center for Disease Control and Prevention ("https://data.cdc.gov/resource/"): This dataset presents the age-adjusted death rates for the 10 leading causes of death in the United States beginning in 1999.Total number of records are 10,886. Data are based on information from all resident death certificates filed in the 50 states and the District of Columbia using demographic and medical characteristics. Age-adjusted death rates (per 100,000 population) are based on the 2000 U.S. standard population. 
* 2. "https://www.latlong.net/category/states-236-14.html": This dataset includes information on coordinates for all 50 states.


## Workflow 

### Step 1 : Extract Data (Modules: json, requests, pandas)

 Datasets were extracted from CDC API endpoints in the json format by applying filtering and paging criteria from  "https://data.cdc.gov/resource/bi63-dtpu.json$where=year>=2010&$limit=4600" to fetch records from 2010 through 2017. Coordinates for all 50 states were scrapped from "https://www.latlong.net/category/states-236-14.html" in jupyter notebook.


 -

### Step 2 : Data wrangling and Databasing (Modules: pandas, pymongo, os, MongoDB Compass)

 -Datasets were loaded as pandas dataframe. Column ('_113_cause_name')) irrelevant to the project was dropped. Data cleaning (split, rename, drop) was performed to merge the two dataframes using a common key ('state'). The coordinates for DC was missing in the scrapped dataset. Hence, it was manually incorporated into the master data. 
 
 The final dataset was deployed onto non-relational “NoSQL” database, MongoDB. An account was set up in MongoDB cluster that could be accessed/connected through commandline or using GUI enabled MongoDB Compass.  MongoClient was used to communicate with MongoDB using pymongo. Documents were loaded as dictionaries as NoSQL database provides support for JSON-styled, document-oriented storage systems. The database is available as "complete_death_coord_data" with the collection name "mortality_records".
 -

### Step 3 : Render Data 

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
 * Plotly
 * ???
 * ???
 
 ### Vizualization Examples 
 
 
 ## Steps to run the application
 
 1. 



-



