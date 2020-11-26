from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from resources.s3_presigned_url import PresignedURLApi

app = Flask(__name__)
CORS(app)

api = Api(app, prefix='/api')

api.add_resource(PresignedURLApi, '/get-presigned-url', endpoint='get-presigned-url', methods=['GET'])

@app.route('/')
def home():
    content = '<h1>Welcome to Flask framework</h1>'
    return content

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')