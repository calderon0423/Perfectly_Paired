# import pickle

# loaded_lr=pickle.load(open('LR_Model/lr_model.sav', 'rb'))

# # test_x=[-0.51218591, -0.33502637, -0.13900105, 1.12894692, -2.06168261, 0.72137347, -0.49468102, -0.45460572, 1.83321917, 0.2632744 ]
# test_x=[-1.08221213e+00, 1.38899234e-03, 1.59197851e-01, 7.10402771e-01, -4.65436708e-01, 2.29400618e+00, -9.50747863e-01, 3.77442878e-01, -5.41295602e-01, 6.64236239e-01]
# prediction=loaded_lr.predict([test_x])
# print(prediction)

# @root
# def landing_page()
#   create template index html
#   index html will actually run JS code based on csv for visualization

import csv
import json
import pandas as pd 
import sys, getopt, pprint
from flask import Flask, render_template
from pymongo import MongoClient

#read in csv file 
df = pd.read_csv('/Users/angelicacalderon/repos/Perfectly_Paired/Resources/winemag-data-130k-v2.csv', low_memory=False)
df = df.rename(columns = {'region_1': 'region_one', 'region_2': 'region_two'})
df.to_csv('/Users/angelicacalderon/repos/Perfectly_Paired/Resources/winemag-data-130k-v2.csv',index=False)

app = Flask(__name__)

conn = 'mongodb://localhost:27017'
client = MongoClient(conn)

# #connect to DB
db = client['reviews_db']
collection = db['reviews']

#drop collection if available to remove duplicates
db.reviews.drop()

def csv_to_json(filename, header=True):
    data = pd.read_csv(filename,low_memory=False)
    return data.to_dict('records')

collection.insert_many(csv_to_json('/Users/angelicacalderon/repos/Perfectly_Paired/Resources/winemag-data-130k-v2.csv'))

#set route 
@app.route('/')
def index():
    reviews = list(db.reviews.find())
    print(reviews)