from pyproj import transform
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

### Create FastAPI instance with custom docs and openapi url
app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")



@app.get("/api/")
async def basisverzeichnis():
    return {"status": "alles gut, es funktioniert"}

@app.get("/api/lv95towgs84")
async def lv95towgs84(easting, northing):
    return {"easting": transform(2056, 4326, float(easting), float(northing))[0], 
            'northing': transform(2056, 4326, float(easting), float(northing))[1]}

@app.get("/api/wgs84tolv95")
async def wgs84tolv95(easting, northing):
    return {"easting": transform(4326, 2056, float(easting), float(northing))[0],
            'northing': transform(4326, 2056, float(easting), float(northing))[1]}