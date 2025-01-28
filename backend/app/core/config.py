from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "Monitoring Platform"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # CORS
    ALLOWED_HOSTS: List[str] = ["http://localhost:3000", "http://localhost:3001"]
    
    # Database
    DATABASE_URL: str = "postgresql://user:password@localhost/monitoring_db"
    
    # Monitoring
    PROMETHEUS_MULTIPROC_DIR: str = "/tmp"
    
    class Config:
        env_file = ".env"

settings = Settings()
