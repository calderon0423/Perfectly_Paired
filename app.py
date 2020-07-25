import sys
import os
import pandas as pd 
import tensorflow as tf 
import keras 
from keras.models import model_from_json, load_model
import numpy as np 
import pickle 
import flask 
from flask import Flask, render_template, jsonify, request, url_for, send_from_directory
from pymongo import MongoClient
from flask_restful import reqparse
import json



#read in csv file 
# df = pd.read_csv('/Users/angelicacalderon/repos/Perfectly_Paired/Resources/winemag-data-130k-v2.csv', low_memory=False)
# df = df.rename(columns = {'region_1': 'region_one', 'region_2': 'region_two'})
# df.to_csv('/Users/angelicacalderon/repos/Perfectly_Paired/Resources/winemag-data-130k-v2.csv',index=False)

# conn = 'mongodb://localhost:27017'
# client = MongoClient(conn)

# #connect to MongoDB wine_db
# db = client['wine_db']

# #create collections 
# reviews_collection = db['reviews']
# red_white_collection = db['red_white']

# #drop collection if available to remove duplicates
# db.reviews_collection.drop()
# db.red_white_collection.drop()

# #define function to read csv file as json 
# def csv_to_json(filename, header=True):
#     data = pd.read_csv(filename,low_memory=False)
#     return data.to_dict('records')

# #insert json file to collections 
# reviews_collection.insert_many(csv_to_json('Resources/winemag-data-130k-v2.csv'))
# red_white_collection.insert_many(csv_to_json('Resources/red_wine_combined.csv'))

# #connect to mongoDB wine db 
# mongoDB = ('mongodb:///?Server=localhost&Port=27017&Database=wine_db')


#################################################
# Flask Routes
#################################################


app = Flask(__name__)


# @app.route("/")
# def welcome():
#     """List all available api routes."""
#     return (
#         f"<h2>Welcome to the Directory</h2>"
#         f"Available Routes:<br/>"
#         f"<a href = '/reviewsdata' target='_blank'>/Wine Reviews Data</a><br/>"
#         f"<a href = '/red_white_wines_data' target='_blank'>/Red & White Wines Data</a><br/>"
#         f"<a href = '/predict_red_white' target='_blank'>/Red & White Prediction</a><br/>"
#         f"<a href = '/predict_type' target='_blank'>/Wine Type Prediction</a><br/>"
#     )

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/quality')
def quality():
    return render_template('quality.html')

@app.route('/reviews')
def reviews():
    return render_template('reviews.html')

@app.route('/analysis')
def analysis():
    return render_template('analysis.html')

@app.route('/red_wine')
def redWine():
    return render_template('red_wine.html')

@app.route('/white_wine')
def whiteWine():
    return render_template('white_wine.html')

@app.route('/reviewscode')
def reviewsCode():
    return render_template('reviewscode.html')

@app.route('/redwhitecode')
def redWhiteCode():
    return render_template('redwhitecode.html')
 
@app.route('/reviewsdata')
def reviewsData():
    reviews_documents = reviews_collection.find()
    response = []
    for document in reviews_documents:
        document['_id'] = str(document['_id'])
        response.append(document)
    # 
    return jsonify(response)

#red_white_wines route 
@app.route('/red_white_wines_data')
def redWhiteData():
    red_white_documents = red_white_collection.find()
    response = []
    for document in red_white_documents:
        document['_id'] = str(document['_id'])
        response.append(document)
    return jsonify(response)


@app.route('/predict_type')
def predictType():
    #user input 
    parser = reqparse.RequestParser()
    parser.add_argument('adjectives', type=str, required=True, help="This is expecting a selection of wine adjectives", action='append')
    args = parser.parse_args()
    adjectives = args['adjectives']

    #load model .h5 files 
    vectorizer_file = "tokenizer.h5"
    tokenizer_file = "vectorizer.h5"
    NBModel = 'dl_v2_h5'

    vectorizer = pickle.load(open('Naive_sentiment_model/'+vectorizer_file, 'rb'))
    tokenizer = pickle.load(open('Naive_sentiment_model/'+tokenizer_file, 'rb'))
    nbModel = pickle.load(open('Naive_sentiment_model/'+NBModel, 'rb'))
    
    #run model with user_input argument 
    user_input=adjectives
    X_new = vectorizer.transform(user_input)
    X_new = tokenizer.transform(X_new)
    result = nbModel.predict(X_new)
    return jsonify({'wine_type': result[0]})

@app.route('/predict_quality')
def redwhitepredict():
    # user input
    parser = reqparse.RequestParser()
    parser.add_argument('characteristics', type=str, required=True, help="This is expecting a selection of wine characteristics", action='append')
    args = parser.parse_args()
    characteristics = args['characteristics'][0].split(' ')

    #  Load the model
    redorwhite_model = load_model('Red_and_White_Analysis/redorwhite_model_trained.h5')

    # #predict the wine class based on model and save output to 'out'
    user_input_characteristics=[float(i) for i in characteristics]
    print(user_input_characteristics)

    #run model with user input
    result_characteristics = redorwhite_model.predict_classes([user_input_characteristics])
    result_characteristics = "White" if result_characteristics[0] ==1 else "Red"
    return jsonify({'wine_selection': result_characteristics})

@app.route('/winelist')
def changename():
    with open('./Resources/variety_adj.json') as f:
        data = json.load(f)
    return json.dumps(data)

@app.route('/wordcloud')
def name():
    with open('./Resources/frequency_dict.json') as f:
        data = json.load(f)
    return json.dumps(data)


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')


if __name__ == "__main__":
    app.run(debug=True)





