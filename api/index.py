import altair as alt
import json
from fastapi import FastAPI, HTTPException
import uvicorn

### Create FastAPI instance with custom docs and openapi url
app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

with open("public/standorte_daten.geojson", "r") as file:
    geojson_standorte_daten = json.load(file)

standorte_daten = geojson_standorte_daten["features"]

with open("public/kantone.geojson", "r") as file:
    geojson_kantone = json.load(file)

kantone = geojson_kantone['features']

@app.get("/api/")
async def basisverzeichnis():
    return {"status": "alles gut, es funktioniert"}

@app.get("/api/standorte")
async def standorte(ausrichtung_min: float, ausrichtung_max: float, neigung_min: float, neigung_max: float, sonne_min: float, sonne_max: float):
    try:
        filter_ausrichtung = alt.FieldRangePredicate(field='properties._AHmean', range=[ausrichtung_min, ausrichtung_max])
        filter_neigung = alt.FieldRangePredicate(field='properties._NGmean', range=[neigung_min, neigung_max])
        filter_sonne = alt.FieldRangePredicate(field='properties.SO_Norm', range=[sonne_min, sonne_max])

        selection_karte = alt.selection_interval()
        selection_balken = alt.selection_interval()

        karte = alt.layer(
            alt.Chart(alt.Data(values=kantone)).mark_geoshape(
            filled=False, stroke='grey', strokeWidth=0.5)
            ,
            alt.Chart(alt.Data(values=standorte_daten)).mark_square(size=0.5, opacity=1).encode(
            color=alt.condition(selection_karte & selection_balken, 
                                alt.Color("properties.Gewichtetes_Mittel:Q", 
                                        title='Eignung', 
                                        scale=alt.Scale(range=['#ffa1b7', '#520051'])), 
                                alt.value('lightgray')),
            tooltip=alt.Tooltip("properties.Gewichtetes_Mittel:Q"),
            longitude='geometry.coordinates[0]:Q',
            latitude='geometry.coordinates[1]:Q'
            ).add_params(
                selection_karte
            ).transform_filter(
                filter_ausrichtung
            ).transform_filter(
                filter_neigung
            ).transform_filter(
                filter_sonne
            )
        ).properties(
            width=1200,
            height=700,
            title="Standorte Grosssolaranlagen"
        )

        balkendiagramm = alt.Chart(alt.Data(values=standorte_daten)).mark_bar().encode(
            x=alt.X("properties.Gewichtetes_Mittel:Q", 
                    bin=alt.Bin(maxbins=100), 
                    title="Gewichtetes Mittel Eignung", 
                    scale=alt.Scale(domain=[0.24, 0.92])),
            y=alt.Y("count()", title="Häufigkeit"),
            color=alt.condition(selection_balken, 
                                alt.Color("properties.Gewichtetes_Mittel:Q", 
                                        scale=alt.Scale(range=['#ffa1b7', '#520051'])), 
                                alt.value('lightgray')),
        ).properties(
            width=1200,
            height=500,
            title="Histogramm der Eignungswerte"
        ).add_params(
            selection_balken
        ).transform_filter(
            selection_karte
        ).transform_filter(
            filter_ausrichtung
        ).transform_filter(
            filter_neigung
        ).transform_filter(
            filter_sonne
        )

        visualisierung = karte & balkendiagramm

        #visualisierung.save('api/api_visualisierung.json')
        return visualisierung.to_dict()
    
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))

if __name__ == "__main__":
    uvicorn.run(app, port=8000)

#Abrage
#127.0.0.1:8000/api/standorte?ausrichtung_min=140&ausrichtung_max=220&neigung_min=10&neigung_max=50&sonne_min=0.01&sonne_max=1
#/api/standorte?ausrichtung_min=140&ausrichtung_max=220&neigung_min=10&neigung_max=50&sonne_min=0.5&sonne_max=1