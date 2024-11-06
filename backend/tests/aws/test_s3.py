from models.s3 import S3

BUCKET_NAME = "soundgo"


def test_s3_upload_get():
    s3 = S3(BUCKET_NAME)
    key = "sample-audio"
    audio_path = "test_utils/file_example_MP3_1MG.mp3"
    audio_object = open(audio_path, "rb")
    s3.upload(audio_object, key)

    audio_object = s3.get_object(key)
    assert audio_object.content_length > 0
