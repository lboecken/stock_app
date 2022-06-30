from sqlalchemy import create_engine
# from config import DATABASE_URI
import models
import psycopg2
import os



# engine = create_engine(DATABASE_URI)

# models.Base.metadata.create_all(engine)

# psycopg2.connect(
#     host="localhost",
#     port=5432,
#     database="stock_app",
#     user="postgres",
#     password=os.environ.get("PASSWORD"),
           
# )