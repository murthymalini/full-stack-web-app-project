#!/usr/bin/env python
# coding: utf-8

# # Data retrieval through API 

# Based on NCHS - Leading Causes of Death: United States:
# This dataset presents the age-adjusted death rates for the 10 leading causes of death in the United States beginning in 1999.Total number of records are 10,886. For the project, records from 2010 through 2017 have been included reducing the sample size to 4576 records by applying filtering ang paging criteria to the endpoint.
# Data are based on information from all resident death certificates filed in the 50 states and the District of Columbia using demographic and medical characteristics. Age-adjusted death rates (per 100,000 population) are based on the 2000 U.S. standard population. Populations used for computing death rates after 2010 are postcensal estimates based on the 2010 census, estimated as of July 1, 2010. Rates for census years are based on populations enumerated in the corresponding censuses. Rates for non-census years before 2010 are revised using updated intercensal population estimates and may differ from rates previously published.
# Causes of death classified by the International Classification of Diseases, Tenth Revision (ICD–10) are ranked according to the number of deaths assigned to rankable causes. Cause of death statistics are based on the underlying cause of death.
#!/usr/bin/env python
# coding: utf-8

# Team Project #2
# by Harmeet

def get_data():


import pandas as pd
import json
import requests
from bs4 import BeautifulSoup

import pymongo


url = "https://data.cdc.gov/resource/bi63-dtpu.json?$where=year>=2010&$limit=4600"


loaded_json = requests.get(url).json()
loaded_json


results_df = pd.DataFrame(loaded_json)
results_df.head()

results_df.count()

death_cause=results_df.drop(columns='_113_cause_name')
death_cause


# Initialize PyMongo to work with MongoDBs and establish connection with the cluster in cloud using id and password
conn= 'mongodb+srv://project2:paradise321@cluster0-v6uxh.mongodb.net/test?retryWrites=true&w=majority'
client = pymongo.MongoClient(conn)

# Define database and collection
db = client.death_cause_US_db
collection = db.death_cause


# In[113]:


#Add data to the database in cluster
db.collection.insert_many(death_cause.to_dict('records'))


# In[122]:


#Read data from cluster
records=db.collection.find()
for record in records:
    print(record)


# In[ ]:




