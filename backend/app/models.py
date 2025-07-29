from sqlalchemy import Column, Integer, String, Float, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class Insight(Base):
    __tablename__ = 'insights'

    id = Column(Integer, primary_key=True, index=True)
    end_year = Column(Integer, nullable=True)
    intensity = Column(Integer, nullable=False)
    sector = Column(String, nullable=True)
    topic = Column(String, nullable=True)
    insight = Column(String, nullable=False)
    url = Column(String, nullable=False)
    region = Column(String, nullable=True)
    start_year = Column(Integer, nullable=True)
    impact = Column(Float, nullable=True)
    added = Column(String, nullable=False)
    published = Column(String, nullable=False)
    country = Column(String, nullable=True)
    relevance = Column(Integer, nullable=False)
    pestle = Column(String, nullable=True)
    source = Column(String, nullable=False)
    title = Column(String, nullable=False)
    likelihood = Column(Integer, nullable=False)

# Database setup
DATABASE_URL = "sqlite:///./insights.db"  # Example using SQLite
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    Base.metadata.create_all(bind=engine)