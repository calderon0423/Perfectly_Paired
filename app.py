import csv
import json
import pandas as pd 
import sys, getopt, pprint
from flask import Flask, render_template, jsonify
from pymongo import MongoClient


#read in csv file 
# df = pd.read_csv('/Users/angelicacalderon/repos/Perfectly_Paired/Resources/winemag-data-130k-v2.csv', low_memory=False)
# df = df.rename(columns = {'region_1': 'region_one', 'region_2': 'region_two'})
# df.to_csv('/Users/angelicacalderon/repos/Perfectly_Paired/Resources/winemag-data-130k-v2.csv',index=False)

conn = 'mongodb://localhost:27017'
client = MongoClient(conn)

#connect to DB
db = client['reviews_db']
collection = db['reviews']

#drop collection if available to remove duplicates
db.reviews.drop()

def csv_to_json(filename, header=True):
    data = pd.read_csv(filename,low_memory=False)
    return data.to_dict('records')

collection.insert_many(csv_to_json('/Users/angelicacalderon/repos/Perfectly_Paired/Resources/winemag-data-130k-v2.csv'))
mongoDB = ('mongodb:///?Server=localhost&Port=27017&Database=reviews_db')



#################################################
# Flask Routes
#################################################


app = Flask(__name__)

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"<h2>Welcome to the Directory</h2>"
        f"Available Routes:<br/>"
        f"<a href = '/reviews' target='_blank'>/Wine Reviews</a><br/>"
    )

@app.route('/reviews')
def reviews():
    documents = collection.find()
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)
    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)





