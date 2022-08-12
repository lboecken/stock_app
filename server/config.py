import os
from datetime import timedelta


class BaseConfig:
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)


class TestingConfig(BaseConfig):
    SQLALCHEMY_DATABASE_URI = os.getenv("TESTING_DATABASE_URL")
    TESTING = True


class DevelopmentConfig(BaseConfig):
    ENV = "development"
    SQLALCHEMY_DATABASE_URI = os.getenv("DB_URI")
    DEBUG = True


class ProductionConfig(BaseConfig):
    SQLALCHEMY_DATABASE_URI = os.getenv("DB_URI")
