import { useState } from "react";

import Map from "react-map-gl";
import { BASEMAP } from "@deck.gl/carto";
import { DeckGL } from "@deck.gl/react";
import { GeoJsonLayer } from "@deck.gl/layers";

export function MyMap() {
  const [viewState, setViewState] = useState({
    latitude: 33.775981,
    longitude: -84.420527,
    zoom: 10,
    bearing: 0,
    pitch: 20
  });

  const updateViewState = ({ viewState }) => {
    setViewState(viewState);
  };

  const onClick = (info) => {
    if (info.object) {
      let name = info.object.properties.NAME.toLowerCase();
      alert(`You have selected ${name}`);
    }
  };

  return (
    <>
      <DeckGL
        controller={true}
        initialViewState={viewState}
        onViewStateChange={updateViewState}
        getTooltip={({ object }) =>
          object && {
            html: `${object.properties.NAME.toLowerCase()}`
          }
        }
      >
        <GeoJsonLayer
          id="json-data"
          data={
            "https://gis.atlantaga.gov/dpcd/rest/services/OpenDataService/FeatureServer/3/query?where=&objectIds=&time=&geometry=&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&gdbVersion=&historicMoment=&returnDistinctValues=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&multipatchOption=xyFootprint&resultOffset=&resultRecordCount=&returnTrueCurves=false&returnExceededLimitFeatures=false&quantizationParameters=&returnCentroid=true&sqlFormat=none&resultType=&featureEncoding=esriDefault&datumTransformation=&f=geojson"
          }
          filled={true}
          stroked={true}
          getFillColor={[57, 255, 20, 220]}
          getLineColor={[0, 0, 0, 150]}
          getLineWidth={19}
          pickable={true}
          autoHighlight={true}
          highlightColor={[111, 255, 176, 150]}
          onClick={onClick}
        />
        <Map
          mapboxAccessToken={
            "pk.eyJ1IjoiamF5am9zZSIsImEiOiJjbDhzczVoeW4wMGdlM3BuemU0aTh1cXF6In0.P6rxnD9XAxmufeHZRMwGOw"
          }
          mapStyle={BASEMAP.POSITRON}
        />
      </DeckGL>
    </>
  );
}
