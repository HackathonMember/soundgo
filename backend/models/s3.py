import os

import boto3


class S3:
    def __init__(self, bucket_name):
        stage = os.getenv("STAGE")
        self._bucket_name = bucket_name
        if stage == "local":
            self._client = boto3.resource(
                "s3",
                aws_access_key_id="dummy",
                aws_secret_access_key="dummy",
                endpoint_url="http://localstack:4566",
                region_name="ap-northeast-1",
            )
        else:
            self._client = boto3.resource("s3")

        self.bucket = self._client.Bucket(self._bucket_name)

    def upload(self, audio_object, key) -> str:
        self.bucket.put_object(Body=audio_object, Key=key)
        return key

    def get_object(self, key):
        return self.bucket.Object(key)

    def delete(self, key) -> bool:
        try:
            # S3からオブジェクトを削除
            self.bucket.delete_objects(Delete={"Objects": [{"Key": key}]})
            return True
        except Exception as e:
            # エラーが発生した場合
            print(f"Error deleting object {key} from S3: {e}")
            return False
