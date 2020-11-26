from flask_restful import Resource
from flask import request
import boto3
from config.constant import AWS3_BUCKET_NAME, AWS3_ACCESS_KEY, AWS3_SECRET_KEY


class PresignedURLApi(Resource):

    def get(self):
        try:
            # here object-name is file-name user uploads using that file name presigned url is generated
            object_name = request.args.get('object_name')
            if object_name:
                s3_client = boto3.client('s3', aws_access_key_id=AWS3_ACCESS_KEY, aws_secret_access_key=AWS3_SECRET_KEY)
                response = s3_client.generate_presigned_post(AWS3_BUCKET_NAME,
                                                            object_name,
                                                            ExpiresIn=3600)
                return {'status': True, 'data': response, 'msg': 'success'}
            return {'status': False, 'msg': 'file-name is required to get presigned url'}
        except Exception as e:
            print('error while generating presigned url => ', e)
            return {'status': False, 'msg': f'error while generating presigned url => {e}'}