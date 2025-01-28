from fastapi import APIRouter
from prometheus_client import generate_latest, CONTENT_TYPE_LATEST
from fastapi.responses import Response

router = APIRouter()

@router.get("/")
async def get_metrics():
    data = generate_latest()
    return Response(data, media_type=CONTENT_TYPE_LATEST)
