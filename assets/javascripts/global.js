// Generated by CoffeeScript 1.3.3
(function() {
  var CustomMap,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  CustomMap = (function() {

    function CustomMap(id) {
      this.toggleMarkerList = __bind(this.toggleMarkerList, this);

      this.handleExport = __bind(this.handleExport, this);

      this.handleMarkerRemovalTool = __bind(this.handleMarkerRemovalTool, this);

      this.handleDevMod = __bind(this.handleDevMod, this);

      var _this = this;
      this.blankTilePath = 'tiles/00empty.jpg';
      this.iconsPath = 'assets/images/icons/32x32';
      this.maxZoom = 7;
      this.lngContainer = $('#long');
      this.latContainer = $('#lat');
      this.devModInput = $('#dev-mod');
      this.optionsBox = $('#options-box');
      this.addMarkerLink = $('#add-marker');
      this.removeMarkerLink = $('#remove-marker');
      this.markerList = $('#marker-list');
      this.exportBtn = $('#export');
      this.exportWindow = $('#export-windows');
      this.canRemoveMarker = false;
      this.draggableMarker = false;
      this.gMapOptions = {
        center: new google.maps.LatLng(25.760319754713887, -35.6396484375),
        zoom: 6,
        minZoom: 4,
        maxZoom: this.maxZoom,
        streetViewControl: false,
        mapTypeControl: false,
        mapTypeControlOptions: {
          mapTypeIds: ["custom", google.maps.MapTypeId.ROADMAP]
        }
      };
      this.customMapType = new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
          var normalizedCoord, path;
          normalizedCoord = coord;
          if (normalizedCoord && (normalizedCoord.x < Math.pow(2, zoom)) && (normalizedCoord.x > -1) && (normalizedCoord.y < Math.pow(2, zoom)) && (normalizedCoord.y > -1)) {
            return path = 'tiles/' + zoom + '_' + normalizedCoord.x + '_' + normalizedCoord.y + '.jpg';
          } else {
            return _this.blankTilePath;
          }
        },
        tileSize: new google.maps.Size(256, 256),
        maxZoom: this.maxZoom,
        name: 'GW2 Map'
      });
      this.map = new google.maps.Map($(id)[0], this.gMapOptions);
      this.map.mapTypes.set('custom', this.customMapType);
      this.map.setMapTypeId('custom');
      google.maps.event.addListener(this.map, 'mousemove', function(e) {
        _this.lngContainer.html(e.latLng.lng());
        return _this.latContainer.html(e.latLng.lat());
      });
      this.devModInput.bind('click', this.handleDevMod);
      this.gMarker = {
        "hearts": [],
        "waypoints": [],
        "poi": [],
        "skillpoints": []
      };
      this.setHearts();
      this.setWaypoints();
      this.setPOI();
      this.setSkillPoints();
      this.markerList.find('span').bind('click', function(e) {
        var coord, img, markerType, markerinfo, this_;
        this_ = $(e.currentTarget);
        markerType = this_.attr('data-type');
        coord = _this.map.getCenter();
        markerinfo = {
          "lng": coord.lat(),
          "lat": coord.lng(),
          "title": "--"
        };
        img = "" + _this.iconsPath + "/" + markerType + ".png";
        return _this.addMarkers(markerinfo, img, markerType);
      });
      this.addMarkerLink.bind('click', this.toggleMarkerList);
      this.removeMarkerLink.bind('click', this.handleMarkerRemovalTool);
      this.exportBtn.bind('click', this.handleExport);
      this.exportWindow.find('.close').click(function() {
        return _this.exportWindow.hide();
      });
    }

    CustomMap.prototype.addMarkers = function(markerInfo, img, type) {
      var iconmid, iconsize, image, marker,
        _this = this;
      iconsize = 32;
      iconmid = iconsize / 2;
      image = new google.maps.MarkerImage(img, null, null, new google.maps.Point(iconmid, iconmid), new google.maps.Size(iconsize, iconsize));
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(markerInfo.lng, markerInfo.lat),
        map: this.map,
        icon: image,
        draggable: this.draggableMarker,
        cursor: this.draggableMarker ? "move" : "pointer",
        title: "" + markerInfo.title
      });
      marker["title"] = "" + markerInfo.title;
      marker["desc"] = "" + markerInfo.desc;
      google.maps.event.addListener(marker, 'dragend', function(e) {
        return console.log("" + (e.latLng.lat()) + ", " + (e.latLng.lng()));
      });
      google.maps.event.addListener(marker, 'click', function(e) {
        if (_this.canRemoveMarker && _this.draggableMarker) {
          return _this.removeMarker(marker.__gm_id);
        } else {
          return console.log(marker["title"]);
        }
      });
      return this.gMarker[type].push(marker);
    };

    CustomMap.prototype.setHearts = function() {
      var heart, _i, _len, _ref, _results;
      _ref = Markers.Hearts;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        heart = _ref[_i];
        _results.push(this.addMarkers(heart, "" + this.iconsPath + "/hearts.png", "hearts"));
      }
      return _results;
    };

    CustomMap.prototype.setWaypoints = function() {
      var waypoint, _i, _len, _ref, _results;
      _ref = Markers.Wayppoints;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        waypoint = _ref[_i];
        _results.push(this.addMarkers(waypoint, "" + this.iconsPath + "/waypoints.png", "waypoints"));
      }
      return _results;
    };

    CustomMap.prototype.setPOI = function() {
      var poi, _i, _len, _ref, _results;
      _ref = Markers.POI;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        poi = _ref[_i];
        _results.push(this.addMarkers(poi, "" + this.iconsPath + "/poi.png", "poi"));
      }
      return _results;
    };

    CustomMap.prototype.setSkillPoints = function() {
      var skillPoint, _i, _len, _ref, _results;
      _ref = Markers.SkillPoints;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        skillPoint = _ref[_i];
        _results.push(this.addMarkers(skillPoint, "" + this.iconsPath + "/skillpoints.png", "skillpoints"));
      }
      return _results;
    };

    CustomMap.prototype.handleDevMod = function(e) {
      var this_;
      this_ = $(e.currentTarget);
      if (this_.prop('checked')) {
        this.setDraggableMarker(true);
        return this.optionsBox.addClass('active');
      } else {
        this.setDraggableMarker(false);
        this.optionsBox.removeClass('active');
        this.markerList.removeClass('active');
        return this.addMarkerLink.removeClass('active');
      }
    };

    CustomMap.prototype.handleMarkerRemovalTool = function(e) {
      if (this.removeMarkerLink.hasClass('active')) {
        this.removeMarkerLink.removeClass('active');
        this.optionsBox.removeClass('red');
        return this.canRemoveMarker = false;
      } else {
        this.removeMarkerLink.addClass('active');
        this.optionsBox.addClass('red');
        this.canRemoveMarker = true;
        this.markerList.removeClass('active');
        return this.addMarkerLink.removeClass('active');
      }
    };

    CustomMap.prototype.handleExport = function(e) {
      var jsonString, marker, markerObject, markers, markersId, nm, _i, _len, _ref;
      markerObject = {};
      _ref = this.gMarker;
      for (markersId in _ref) {
        markers = _ref[markersId];
        if (!markerObject[markersId]) {
          markerObject[markersId] = [];
        }
        for (_i = 0, _len = markers.length; _i < _len; _i++) {
          marker = markers[_i];
          nm = {
            "lng": marker.getPosition().lng(),
            "lat": marker.getPosition().lat(),
            "title": marker.title,
            "desc": marker.desc
          };
          markerObject[markersId].push(nm);
        }
      }
      jsonString = JSON.stringify(markerObject);
      this.exportWindow.find('.content').html(jsonString);
      return this.exportWindow.show();
    };

    CustomMap.prototype.removeMarker = function(id) {
      var marker, markers, markersId, _ref, _results,
        _this = this;
      _ref = this.gMarker;
      _results = [];
      for (markersId in _ref) {
        markers = _ref[markersId];
        this.gMarker[markersId] = _.reject(markers, function(m) {
          return m.__gm_id === id;
        });
        _results.push((function() {
          var _i, _len, _results1;
          _results1 = [];
          for (_i = 0, _len = markers.length; _i < _len; _i++) {
            marker = markers[_i];
            if (marker.__gm_id === id) {
              _results1.push(marker.setMap(null));
            } else {
              _results1.push(void 0);
            }
          }
          return _results1;
        })());
      }
      return _results;
    };

    CustomMap.prototype.setDraggableMarker = function(val) {
      var marker, markers, markersId, _ref, _results;
      this.draggableMarker = val;
      _ref = this.gMarker;
      _results = [];
      for (markersId in _ref) {
        markers = _ref[markersId];
        _results.push((function() {
          var _i, _len, _results1;
          _results1 = [];
          for (_i = 0, _len = markers.length; _i < _len; _i++) {
            marker = markers[_i];
            marker.setDraggable(val);
            if (val) {
              _results1.push(marker.setCursor('move'));
            } else {
              _results1.push(marker.setCursor('pointer'));
            }
          }
          return _results1;
        })());
      }
      return _results;
    };

    CustomMap.prototype.toggleMarkerList = function(e) {
      var this_;
      this_ = $(e.currentTarget);
      this.markerList.toggleClass('active');
      this_.toggleClass('active');
      if (this_.hasClass('active')) {
        this.removeMarkerLink.removeClass('active');
        this.optionsBox.removeClass('red');
        return this.canRemoveMarker = false;
      }
    };

    return CustomMap;

  })();

  $(function() {
    var myCustomMap;
    return myCustomMap = new CustomMap('#map');
  });

}).call(this);
