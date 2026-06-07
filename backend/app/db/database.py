import time
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.exc import OperationalError

from app.core.config import settings


DATABASE_URL = settings.DATABASE_URL


def create_db_engine():
    for i in range(10):  # retry 10 times
        try:
            engine = create_engine(DATABASE_URL)
            connection = engine.connect()
            connection.close()
            print("DB Connected")
            return engine
        except OperationalError:
            print("Waiting for DB... retrying")
            time.sleep(3)

    raise Exception("Database connection failed")


engine = create_db_engine()

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()