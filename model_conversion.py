import tensorflow as tf


# MODEL = 'Red_and_White_Analysis/redorwhite_model_trained.h5'

# model = tf.keras.models.load_model(MODEL)

# model.save('Red_and_White_Analysis/red_or_white/')

converter = tf.lite.TFLiteConverter.from_saved_model('Red_and_White_Analysis/red_or_white/')

liteModel = converter.convert()

with tf.io.gfile.GFile('redorwhite_model_trained.tflite', 'wb') as f:
    f.write(liteModel)
