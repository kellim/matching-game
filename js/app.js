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
  this.matched = ko.observable(false);
  this.imageVisible = ko.observable(false);
}

var ViewModel = function() {
  var self = this;
  // Array to hold tile objects
  this.tileList = ko.observableArray([]);

  // The amount of tiles (not including their matching tile)
  // that can be used in each game.
  this.NUM_TILES = 8;

  // The amount of matches left to find
  this.matchesLeft = ko.observable(this.NUM_TILES);

  // Hold the two tiles the player picks each turn
  this.pickedTile1 = ko.observable();
  this.pickedTile2 = ko.observable();

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

  // Shuffle tiles in tileList array
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

  // Toggles tile visibility
  this.toggleVisibility = function(tile) {
    tile.imageVisible(!tile.imageVisible());
  }

  // This function is called when the player clicks on a tile. It determines
  // if the player is selecting the first or second tile. At the appropriate time,
  // it sets the first and second tiles, displays the images,  and runs a function
  // depending on if the tiles match or not.
  this.pickTile = function(tile) {
     if(typeof self.pickedTile1() === 'undefined') {
      self.pickedTile1(tile);
      self.toggleVisibility(self.pickedTile1());
      console.log('pickedTile1: ' + tile.id);
    } else if (tile !== self.pickedTile1() && typeof self.pickedTile2() === 'undefined') {
        self.pickedTile2(tile);
        self.toggleVisibility(self.pickedTile2());
        console.log('pickedTile2: ' + tile.id);
        if (self.pickedTile1().id === self.pickedTile2().id) {
          console.log('ids match: ' + self.pickedTile1().id, self.pickedTile2().id);
          self.matchFound();
        } else {
          console.log('ids do not match: ' + self.pickedTile1().id, self.pickedTile2().id)
          self.noMatchFound();
        }
    } else {
      console.log('Invalid tile selection');
    }
    // console.log('pickTile' + tile);
    console.log('result: ' + self.pickedTile1(), self.pickedTile2());
  }

  // This function is called by pickTile() if player selected two matching tiles.
  // It shows the tiles for 1.5 seconds and the turn is over. It calls initializeTurn()
  // to start the next turn.
  this.matchFound = function() {
    console.log('match found');
    self.pickedTile1().matched(true);
    self.pickedTile2().matched(true);
    self.matchesLeft(self.matchesLeft() - 1);
    console.log(self.matchesLeft());
    setTimeout(function(){
      self.toggleVisibility(self.pickedTile1());
      self.toggleVisibility(self.pickedTile2());
      self.initializeTurn();
    }, 1500);

  }

  // This function is called by pickTile() if player selected two tiles that do not match.
  // The tiles will be visible for 2 seconds and then "turned over" which hides the image.
  this.noMatchFound = function() {
    console.log('no match found');
    setTimeout(function(){
      self.toggleVisibility(self.pickedTile1());
      self.toggleVisibility(self.pickedTile2());
      self.initializeTurn();
    }, 2200);

  }

  // Called by matchFound() or noMatchFound() to reset variables for the next turn.
  this.initializeTurn = function() {
    self.pickedTile1(undefined);
    self.pickedTile2(undefined);
  }

  // Initialize Game. First, instantiate tiles, then shuffle tiles before removing extra
  // tiles if the are more tiles intantiated than self.NUM_TILES. Add matching tiles for
  // the tiles to be used, then shuffle the tiles again.
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
  // Reset the game. Called when player clicks the "Play Again" button.
  this.playAgain = function() {
    self.matchesLeft(self.NUM_TILES);
    self.tileList.removeAll()
    self.initializeGame();
    self.initializeTurn();
  }

  self.initializeGame();
}
ko.applyBindings(new ViewModel());
