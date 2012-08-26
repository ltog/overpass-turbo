
// global settings object

var settings = new(function() {
  // == private members ==
  var prefix = "overpass-ide_";
  var settings_version = 2;
  // == public properties with defaults ==
  // version of settings.
  this.version;
  // map coordinates
  this.use_html5_coords = true;
  this.coords_lat = 46.48;
  this.coords_lon = 11.32;
  this.coords_zoom = 12;
  // saved
  this.code = {"overpass": null};
  this.saves;// = examples;
  // api server
  this.server = "http://overpass-api.de/api/interpreter";

  // == public methods ==
  this.load = function() {
    // check if settings are up to date
    this.version = localStorage.getItem(prefix+"version") * 1;
    if (this.version < settings_version) {
      update_settings(this.version,this);
      this.version = localStorage.getItem(prefix+"version") * 1; // reload version
    }
    // load settings
    this.use_html5_coords = localStorage.getItem(prefix+"use_html5_coords") == "true";
    this.coords_lat = localStorage.getItem(prefix+"coords_lat") * 1;
    this.coords_lon = localStorage.getItem(prefix+"coords_lon") * 1;
    this.coords_zoom = localStorage.getItem(prefix+"coords_zoom") * 1;
    this.code = JSON.parse(localStorage.getItem(prefix+"code"));
    this.saves = JSON.parse(localStorage.getItem(prefix+"saves"));
    this.server = localStorage.getItem(prefix+"server");
    // this. = localStorage.getItem(prefix+"");
  }
  this.save = function() {
    localStorage.setItem(prefix+"use_html5_coords",this.use_html5_coords);
    localStorage.setItem(prefix+"coords_lat",this.coords_lat);
    localStorage.setItem(prefix+"coords_lon",this.coords_lon);
    localStorage.setItem(prefix+"coords_zoom",this.coords_zoom);
    localStorage.setItem(prefix+"code",JSON.stringify(this.code));
    localStorage.setItem(prefix+"saves",JSON.stringify(this.saves));
    localStorage.setItem(prefix+"server",this.server);
    //localStorage.setItem(prefix+"",this.);
  }

  // == private methods ==
  var update_settings = function(v,self) {
    if (v < 1)
      update_settings_1(self);
    if (v < 2)
      update_settings_2(self);
    localStorage.setItem(prefix+"version",settings_version);
  }
  var update_settings_1 = function(self) {
    // load initial code example(s)
    self.code = $.extend({},examples[examples_initial_example]);
    self.saves = examples;
    // save all initial settings for the first time
    self.save();
  }
  var update_settings_2 = function(self) {
    self.server = localStorage.getItem(prefix+"server");
    self.server = self.server.replace("interpreter","");
    localStorage.setItem(prefix+"server",self.server);
  }
  
})(); // end create settings object