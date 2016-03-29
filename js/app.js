/* JSON Object to hold data for tiles to be used */

var ducks = [
  {
    'id': 1,
    'name': 'American Black Duck',
    'image': 'img/black_duck150x150.jpg'
  },
  {
    'id': 2,
    'name': 'Blue-winged Teal',
    'image': 'img/bluewinged_teal150x150.jpg'
  },
  {
    'id': 3,
    'name': 'Bufflehead',
    'image': 'img/bufflehead_drake-150x150.jpg'
  },
  {
    'id': 4,
    'name': 'Canvasback',
    'image': 'img/canvasback150x150.jpg'
  },
  {
    'id': 5,
    'name': 'Cinnamon Teal',
    'image': 'img/cinnamon_teal150x150.jpg'
  },
  {
    'id': 6,
    'name': 'Fulvous Whistling Duck' ,
    'image': 'img/fulvous_whistling_duck150x150.jpg'
  },
  {
    'id': 7,
    'name': 'Harlequin Duck',
    'image': 'img/harlequin_duck150x150.jpg'
  },
  {
    'id': 8,
    'name': 'Laysan Duck',
    'image': 'img/laysan_ducks150x150.jpg'
  },
  {
    'id': 9,
    'name': 'Northern Pintail',
    'image': 'img/northern_pintail_duck150x150.jpg'
  },
  {
    'id': 10,
    'name': 'Northern Shoveler',
    'image': 'img/northern_shoveler150x150.jpg'
  },
  {
    'id': 11,
    'name': 'Red-breasted Merganser',
    'image': 'img/redbreasted_merganser150x150.jpg'
  },
  {
    'id': 12,
    'name': 'Tufted Duck',
    'image': 'img/tufted_duck150x150.jpg'
  },
  {
    'id': 13,
    'name': 'Black-bellied Whistling Duck',
    'image': 'img/wading_blackbellied_whistling_duck150x150.jpg'
  },
  {
    'id': 14,
    'name': 'Wood Duck' ,
    'image': 'img/wood_duck2_150x150.jpg'
  }
]

var Tile = function(data) {
  this.id = data.id;
  this.name = ko.observable(data.name);
  this.image = ko.observable(data.image);
  this.imageVisible = ko.observable(false);
}

var ViewModel = function() {
  var self = this;
  this.tileList = ko.observableArray([]);
  this.NUM_TILES = 8;

  // Instantiate tiles. When calling, pass the name of the
  // JSON object containing the tiles to use.
  this.addTiles = function(tiles) {
    tiles.forEach(function(tileItem) {
        self.tileList.push(new Tile(tileItem));
    });
}

  // Add/instantiate matching tiles for the tiles that will be used
  // in a game.
  this.addMatchingTiles = function(tiles) {
    var validTileIds = _.pluck(self.tileList(), 'id');
        console.log(validTileIds);
      tiles.forEach(function(tileItem) {
        if (_.contains((validTileIds), tileItem.id)) {
          self.tileList.push(new Tile(tileItem));
        }
      });
  }

  // Snuffle tiles in tileList array
  this.shuffleTiles = function() {
   self.tileList(_.shuffle(self.tileList()));
  }

  // Remove extra tiles that are not needed since you
  // should have no more than self.NUM_TILES tiles to play a
  // game. Intended to be called after shuffleTiles() so
  // if there are more than self.NUM_TILES tiles, the tiles
  // you plan the game with each time can vary.
  this.removeExtraTiles = function() {
    self.tileList.splice(self.NUM_TILES);
  }

  // Initialize Game. First, instantiate tiles, then
  // shuffle tiles before removing extra tiles if there
  // are more tiles intantiated  than self.NUM_TILES.
  // Add matching tiles for the tiles to be used, then
  // shuffle the tiles again.
  this.initializeGame = function() {
    self.addTiles(ducks);
    self.shuffleTiles();
    if (self.tileList().length > self.NUM_TILES) {
      self.removeExtraTiles();
    }
    self.addMatchingTiles(ducks);
    self.shuffleTiles();
    console.log(self.tileList().length, self.tileList());
  }

  self.initializeGame();
}
ko.applyBindings(new ViewModel());
