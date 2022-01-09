const baseLayer = new ol.layer.Tile({
            source: new ol.source.OSM()
          });

      const stationVelosLayer = new ol.layer.Tile({
          source: new ol.source.TileWMS({
            url: 'http://192.168.255.245:8600/geoserver/wms',
            params: {'LAYERS': 'Sign:referentielbdauao_dep_station_velos', 'TILED': true},
          }),
        });

        const pisteCyclableLayer = new ol.layer.Tile({
          source: new ol.source.TileWMS({
            url: 'http://192.168.255.245:8600/geoserver/wms',
            params: {'LAYERS': 'Sign:referentielbdauao_dep_boucle_loire', 'TILED': true},
          }),
        });

        const arrretTramBusLayer = new ol.layer.Tile({
          source: new ol.source.TileWMS({
            url: 'http://192.168.255.245:8600/geoserver/wms',
            params: {'LAYERS': 'Sign:tao_arrets_od', 'TILED': true},
          }),
        });

        const ligneTramLayer = new ol.layer.Tile({
          source: new ol.source.TileWMS({
            url: 'http://192.168.255.245:8600/geoserver/wms',
            params: {'LAYERS': 'Sign:tao_ligne_tram_od', 'TILED': true},
          }),
        });

        var ligneBusLayer = new ol.layer.Tile({
          source: new ol.source.TileWMS({
            url: 'http://192.168.255.245:8600/geoserver/wms',
            params: {'LAYERS': 'Sign:tao_ligne_bus_od', 'TILED': true},
          }),
        });

      const view = new ol.View({
          center: ol.proj.fromLonLat([1.91, 47.90]),
          zoom: 13,
        });

      var map = new ol.Map({
        layers: [
          baseLayer,
          stationVelosLayer,
          pisteCyclableLayer,
          ligneTramLayer,
          ligneBusLayer,
          arrretTramBusLayer,
        ],
        target: 'map',
        view: view,
      });

      $("#velos_chkbx").change(function (){
      if ($("#velos_chkbx").is(':checked'))
        map.addLayer(pisteCyclableLayer);
      else
        map.removeLayer(pisteCyclableLayer);
    });

    $("#stations_velos_chkbx").change(function (){
      if ($("#stations_velos_chkbx").is(':checked'))
        map.addLayer(stationVelosLayer);
      else
        map.removeLayer(stationVelosLayer);
    });

    $("#arret_tao_chkbx").change(function (){
      if ($("#arret_tao_chkbx").is(':checked'))
        map.addLayer(arrretTramBusLayer);
      else
        map.removeLayer(arrretTramBusLayer);
    });

    $("#ligne_bus_chkbx").change(function (){
      if ($("#ligne_bus_chkbx").is(':checked'))
        map.addLayer(ligneBusLayer);
      else
        map.removeLayer(ligneBusLayer);
    });

    $("#ligne_tram_chkbx").change(function (){
      if ($("#ligne_tram_chkbx").is(':checked'))
        map.addLayer(ligneTramLayer);
      else
        map.removeLayer(ligneTramLayer);
    });

      const legendPisteCyclable = new ol.source.ImageWMS({
        url: 'http://192.168.255.245:8600/geoserver/wms',
        params: {'LAYERS': 'Sign:referentielbdauao_dep_boucle_loire'},
        ratio: 1,
      });

      const legendStationVelos = new ol.source.ImageWMS({
        url: 'http://192.168.255.245:8600/geoserver/wms',
        params: {'LAYERS': 'Sign:referentielbdauao_dep_station_velos'},
        ratio: 1,
      });

      const legendArretTao = new ol.source.ImageWMS({
        url: 'http://192.168.255.245:8600/geoserver/wms',
        params: {'LAYERS': 'Sign:tao_arrets_od'},
        ratio: 1,
      });

      var legendLigneDeBus = new ol.source.ImageWMS({
        url: 'http://192.168.255.245:8600/geoserver/wms',
        params: {'LAYERS': 'Sign:tao_ligne_bus_od'},
        ratio: 1,
      });

      const legendLigneDeTram = new ol.source.ImageWMS({
        url: 'http://192.168.255.245:8600/geoserver/wms',
        params: {'LAYERS': 'Sign:tao_ligne_tram_od'},
        ratio: 1,
      });

      const updateLegend = function (source,resolution,tar) {
        var graphicUrl = source.getLegendUrl(resolution);
        var img = document.getElementById(tar);
        img.src = graphicUrl;
      };

      const geolocation = new ol.Geolocation({
        trackingOptions: {
         enableHighAccuracy: true,
       },
       projection: view.getProjection(),
       tracking: true,
      });

      const accuracyFeature = new ol.Feature();
        geolocation.on('change:accuracyGeometry', function () {
        accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
      });

      const positionFeature = new ol.Feature();
      positionFeature.setStyle(
        new ol.style.Style({
          image: new ol.style.Circle({
          radius: 6,
          fill: new ol.style.Fill({
            color: '#3399CC',
            width: 10,
          }),
          stroke: new ol.style.Stroke({
            color: '#fff',
            width: 5,
          }),
        }),
      }),
    )

    geolocation.on('change:position', function () {
      const coordinates = geolocation.getPosition();
      positionFeature.setGeometry(coordinates ? new ol.geom.Point(coordinates) : null);
    });

    new ol.layer.Vector({
      map: map,
      source: new ol.source.Vector({
        features: [accuracyFeature, positionFeature],
      })
    });

    // Initial legend
    const resolution = map.getView().getResolution();
    updateLegend(legendPisteCyclable,resolution,'legend1');
    updateLegend(legendStationVelos,resolution,'legend2');
    updateLegend(legendArretTao,resolution,'legend3');
    updateLegend(legendLigneDeBus,resolution,'legend4');
    updateLegend(legendLigneDeTram,resolution,'legend5');

    document.getElementById("myFilter").addEventListener("input", onFiltreChange);

    function onFiltreChange(){
      map.removeLayer(ligneBusLayer);
      ligneBusLayer = new ol.layer.Tile({
          source: new ol.source.TileWMS({
            url: 'http://192.168.255.245:8600/geoserver/wms',
            params: {'LAYERS': 'Sign:tao_ligne_bus_od', 'TILED': true, 'CQL_FILTER': "num_ligne LIKE '"+this.value+"%'"},
          }),
        });
        map.addLayer(ligneBusLayer);
        map.render();
      }