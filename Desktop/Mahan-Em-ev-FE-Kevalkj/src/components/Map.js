import React ,{forwardRef,useEffect,useImperativeHandle,useRef, useState} from 'react'
import MapplsGL from 'mappls-map-react-native'
import Polyline from 'mappls-polyline'
import Geolocation from '@react-native-community/geolocation';
import {point , lineString as makeLineString , bbox , bearing} from '@turf/turf'
import { Alert } from 'react-native';
import RouteSimulator from '../utility/RouteSimulator';
import carIcon from '../assets/carIcon.png'
Geolocation.setRNConfiguration({
  authorizationLevel: 'auto' ,
  enableBackgroundLocationUpdates: true,
  skipPermissionRequests: true ,
  locationProvider: 'playServices',
}) ;
const UserLocation = ()=>{
  useEffect(()=>{
    MapplsGL.locationManager.start();
    return ()=>{
      MapplsGL.locationManager.stop();
    }
  },[])
  return <MapplsGL.UserLocation visible={true} animated={true} />
}

const Map = forwardRef((props, ref) => {
  const cameraRef = useRef(null);
  const [showMyLocation, setShowMyLocation] = useState(false);
  const [route , setRoute] = useState(null);
  const [currPoint, setCurrPoint] = useState(null);
  const [routeSimulator , setRouteSimulator] = useState(null) ;
  const [bearings , setBearings] = useState(0);
  const [srcCoords , setSrcCoords] = useState('') ;
  const [destCoords , setDestCoords] = useState('') ;
  const [routeCoords, setRouteCoords] = useState([]);
  const [isMounted , setIsMounted ] = useState(false) ;

  useEffect(()=>{
    setIsMounted(true) ;
    return ()=>{
      setIsMounted(false);
      if(routeSimulator){
        routeSimulator.stop() ;
      }
    }
  },[])

  const changeCamerPos = (coords)=>{
    console.log(cameraRef.current)
    cameraRef.current.flyTo(coords ,200)
  }
  useImperativeHandle(ref, ()=>{
      return {
          goToMyLocation : ()=>{
            Geolocation.getCurrentPosition((pos)=>{
              console.log(pos)
              setShowMyLocation(true);
              changeCamerPos([pos.coords.longitude,pos.coords.latitude]) 
            }, (error)=>{
              console.log(error);
              if(error.PERMISSION_DENIED){
                Alert.alert("Location Permission Not Enabled","Please Allow the Location Permission" )
              }
            })
          },
          showRoute : (src , dest)=>{
            setSrcCoords(src),
            setDestCoords(dest) ,
            calculateRoute(src,dest) ;
          }
      }
  })

  function calculateRoute(src ,dest ){
    console.log("GET Route " , src ," To ", dest) ;
    MapplsGL.RestApi.direction({
      origin: src,
      destination : dest,
      resource: 'route_eta',
      profile:'driving',
      overview: 'simplified'
    }).then(res =>{
      console.log("Got some route" ,res)
      const routeJson = Polyline.toGeoJSON(res.routes[0].geometry,6) ;
      console.log(routeJson) ;
      setRouteCoords(routeJson.coordinates) ;
      setRoute(routeJson) ;
      console.log(routeJson.coordinates)
      const bounds = bbox(routeJson) ;
      cameraRef.current.fitBounds(
        [bounds[0], bounds[1]] ,
        [bounds[2], bounds[3]] ,
        40, 100 
      )
      const routeSim = new RouteSimulator(routeJson,0.02,isMounted) ;
      routeSim.addListener(cp =>{
        // console.log(cp) ;
        if(currPoint && isMounted === true){
          let prevPoint = currPoint ;
          let bear = bearing(prevPoint,cp) ;
          cp.properties.bearing = bear + 100 ;
        }
        setCurrPoint(cp) ;
      })
      routeSim.start() ;
      setRouteSimulator(routeSim) ;
    }).catch(e =>{
      // handel error
      console.log(e)
    })
  }
  const renderOrigin =() => {
    if( !route &&  routeCoords.length <= 0 ) 
      return null ;
    let bgcolor = 'red' ;
    if(currPoint){
      bgcolor = '#314ccd' ;
    }
    return (<MapplsGL.ShapeSource
      id='origin'
      shape={point(routeCoords[0])}
    >
      <MapplsGL.Animated.CircleLayer
        id="originInnerCircle"
        style = {{
          circleColor: bgcolor ,
          circleRadius: 10 ,
        }}
      />
    </MapplsGL.ShapeSource>)
  }
  const renderRoute = ()=>{
    if(!route) 
      return null ;
    return <MapplsGL.ShapeSource id='routeSource' shape={route} >
      <MapplsGL.LineLayer 
      id='routeFill' 
      style = {{lineColor : 'blue' , lineWidth: 5 , lineOpacity: 0.7}}
      belowLayerID='originInnerCircle'
      />
    </MapplsGL.ShapeSource>
  }
  const renderCurrentPoint = () =>{
    if(!currPoint) 
      return null ;
    // else console.log("cur")
    return (<MapplsGL.ShapeSource id='symbolLocationSource' shape={currPoint}>
      <MapplsGL.SymbolLayer 
        id='symbolLocationSource'
        maxZoomLevel={10}
        
        style = {{
          iconRotationAlignment : 'map',
          iconImage : carIcon ,
          iconIgnorePlacement:true,
          iconAllowOverlap:true,
          iconAnchor:'center',
          iconRotate : ['get','bearing'],
          iconSize:0.07,
        }}
      />
    </MapplsGL.ShapeSource>)
  }
  const renderProgressLine = () =>{
    if(!currPoint) 
      return null ;
    const {nearestIndex} = currPoint.properties ;
    const coords = route.coordinates.filter((c,i) => i <= nearestIndex )
    coords.push(currPoint.geometry.coordinates) ;
    // console.log(coords) ;r
    if(coords.length < 2) return null ;
    const lineString = makeLineString(coords) ;
    return (
      <MapplsGL.Animated.ShapeSource id="progressSource" shape={lineString}>
        <MapplsGL.Animated.LineLayer
          id="progressFill"
          style={{
            lineColor: 'green',
            lineWidth: 5,
          }}
          aboveLayerID="routeFill"
        />
      </MapplsGL.Animated.ShapeSource>
    )

  }
  const renderDestination = ()=> {
    if( !route && routeCoords.length <= 0 ) 
      return null ;
    return (
      <MapplsGL.ShapeSource 
        id='destination'
        shape={point(routeCoords[routeCoords.length - 1])}
      >
        <MapplsGL.CircleLayer id='destinationCircle' style = {{circleRadius:10 , circleColor: 'green'}} 
        />
      </MapplsGL.ShapeSource>
    )
  }
 

  return (
    <MapplsGL.MapView style={{ flex: 1 }} 
    onMapError={error => console.log(error.code + ' ' + error.message)}
    onPlaceClick={mapplsPin => console.log('mapplsPin',mapplsPin)}
    >
      <MapplsGL.Camera ref={cameraRef} centerCoordinate={[77.1025, 28.7041]} zoomLevel={12} animationMode='flyTo' animationDuration={1000}/>
        {showMyLocation && <UserLocation />}
        {renderRoute()}
        {renderOrigin()}
        {renderCurrentPoint()}
        {renderProgressLine()}
        {renderDestination()}
    </MapplsGL.MapView>
  )
})

export default Map ;