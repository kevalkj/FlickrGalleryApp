module.exports = {
    project: {
        ios: {
            unstable_reactLegacyComponentNames: [
                'AIRMap',
                'AIRMapCallout',
                'AIRMapCalloutSubview',
                'AIRMapCircle',
                'AIRMapHeatmap',
                'AIRMapLocalTile',
                'AIRMapMarker',
                'AIRMapOverlay',
                'AIRMapPolygon',
                'AIRMapPolyline',
                'AIRMapUrlTile',
                'AIRMapWMSTile',
              ],
        }, // Configurations specific to iOS (empty for now)
        android: {
            unstable_reactLegacyComponentNames: [
                'AIRMap',
                'AIRMapCallout',
                'AIRMapCalloutSubview',
                'AIRMapCircle',
                'AIRMapHeatmap',
                'AIRMapLocalTile',
                'AIRMapMarker',
                'AIRMapOverlay',
                'AIRMapPolygon',
                'AIRMapPolyline',
                'AIRMapUrlTile',
                'AIRMapWMSTile',
              ],
        }, // Configurations specific to Android (empty for now)
    },
    assets: ['./src/assets/fonts'], // Specifies the location of font assets
};
