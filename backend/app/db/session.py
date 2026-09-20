from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.app.core import settings



engine = create_engine(
    url = settings.DATABASE_URL,
    pool_pre_ping=True
)

SessionLocal = sessionmaker(
    bind = engine,
    autoflush=False,
    autocommit = False

)


if __name__ == '__main__':
    connection = engine.connect()
    print('success')
    connection.close()