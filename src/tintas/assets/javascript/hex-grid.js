module.exports = (function () {
	/**
	* Exports a constructor taking an options object.
	* @module
	* @example
	* ```js
	* var HexGrid = require('hex-grid.js');
	*
	* var TileFactory = function () {
	*   var _id = 0;
	*   return {
	*     newTile: function () {
	*       var tile = {
	*         id: _id.toString()
	*       };
	*
	*       _id += 1;
	*       return tile;
	*     }
	*   };
	* };
	*
	* var tileFactory = new TileFactory();
	* var hexGrid = new HexGrid({
	*   width: 20,
	*   height: 10,
	*   orientation: 'flat-topped',
	*   layout: 'odd-q',
	*   tileFactory: tileFactory
	* });
	* ```
	* @typicalname HexGrid
	*/

	/**
	 * A mapping from the map orientation to an array of valid neighbouring
	 * directions for a tile.
	 */
	var _validDirs = {
		'flat-topped': ['north', 'northeast', 'southeast', 'south', 'southwest',
			'northwest'],
		'pointy-topped': ['northeast', 'east', 'southeast', 'southwest', 'west',
			'northwest']
	};

	/**
	 * Mapping from map orientation to an array of valid layouts.
	 */
	var _validLayouts = {
		'flat-topped': ['odd-q', 'even-q'],
		'pointy-topped': ['odd-r', 'even-r']
	};

	/**
	 * @class
	 * @classdesc A hexagonal grid.
	 * @alias module:hex-grid
	 * @param {array} options HexGrid options.
	 * @param {number} [options.width] The width of the map.
	 * @param {number} [options.height] The height of the map.
	 * @param {tileFactory} [options.tileFactory] A tileFactory object. A
	 * tileFactory is an object that has a `newTile` function property that
	 * when called returns a tile object. The tile objects returned by
	 * `tileFactory.newTile()` must have an `id` property which is unique
	 * across all tiles generated by the tileFactory.
	 * @param {string} [options.orientation] The orientation of the map. Must be
	 * one of: flat-topped, pointy-topped.
	 * @param {string} [options.layout] The layout of the map. Must be one of:
	 * odd-q, even-q, odd-r, even-r.
	 * @see {@link http://redblobgames.com/grids/hexagons} for explanations of
	 * `options.orientation` and `options.layout`.
	 */
	var HexGrid = function(options) {
		if (typeof options === 'undefined') {
			throw new Error('Must provide an options object');
		}

		if (typeof options.width !== 'number') {
			throw new Error('Must provide a number options.width');
		}

		if (typeof options.height !== 'number') {
			throw new Error('Must provide a number options.height');
		}

		if (typeof options.tileFactory !== 'object') {
			throw new Error('Must provide an object options.tileFactory');
		}

		if (typeof(options.tileFactory.newTile) !== 'function') {
			throw new Error('Options.fileFactory must implement a newTile function');
		}

		if (typeof options.orientation !== 'string' ||
			['flat-topped', 'pointy-topped'].indexOf(options.orientation) === -1
		) {
			throw new Error('Must provide a string options.orientation which is' +
				" one of: 'flat-topped', 'pointy-topped'");
		}

		if (typeof options.layout !== 'string' ||
			['odd-q', 'even-q', 'odd-r',
				'even-r'].indexOf(options.layout) === -1
		) {
			throw new Error('Must provide a string options.layout which is' +
				" one of: 'odd-q', 'even-q', 'odd-r', 'even-r'");
		}

		if (_validLayouts[options.orientation].indexOf(options.layout) === -1) {
			throw new Error('Invalid options.layout for the chosen orientation. Must '+
				'be one of: ' + _validLayouts[options.orientation]);
		}

		// Mapping from tile.id to tileIdx.
		this.tileIdMap = null;

		this.width = options.width;
		this.height = options.height;
		this.orientation = options.orientation;
		this.layout = options.layout;

		// Initialize each tile on the map.
		this.tileIdMap = {};
		this.tiles = new Array(this.width * this.height);
		var numTiles = this.tiles.length;
		var tile;
		for (var tileIdx = 0; tileIdx < numTiles; tileIdx += 1) {
			tile = options.tileFactory.newTile();
			this.tiles[tileIdx] = tile;
			this.tileIdMap[tile.id] = tileIdx;
		}
	};

	/**
	 * Gets the width of the grid.
	 * @return {number} The width of the grid.
	 */
	HexGrid.prototype.getWidth = function() {
		return this.width;
	};

	/**
	 * Gets the height of the grid.
	 * @return {number} The height of the grid.
	 */
	HexGrid.prototype.getHeight = function() {
		return this.height;
	};

	/**
	 * Returns whether a coordinate is within the grid boundaries.
	 * @param {number} x The X coordinate.
	 * @param {number} y The Y coordinate.
	 * @return {bool} Whether the coordinate is within the boundaries of the
	 * grid.
	 */
	HexGrid.prototype.isWithinBoundaries = function(x, y) {
		return x <= this.width - 1 &&
			x >= 0 &&
			y <= this.height - 1 &&
			y >= 0;
	};

	/**
	 * Gets a specific tile by its x and y coordinates.
	 * @param {number} x The X coordinate.
	 * @param {number} y The Y coordinate.
	 * @return {tile|null} The tile. Null if not a valid coordinate.
	 */
	HexGrid.prototype.getTileByCoords = function(x, y) {
		if (typeof x !== 'number' || typeof y !== 'number') {
			throw new Error('x and y must be integers');
		}

		if (this.isWithinBoundaries(x, y)) {
			return this.tiles[(y * this.width) + x];
		}

		return null;
	};

	var TileIterator = function(hexGrid) {
		var tileIdx = -0;
		this.next = function() {
			if (tileIdx >= hexGrid.tiles.length) {
				return null;
			}

			var tile = hexGrid.tiles[tileIdx];
			tileIdx += 1;
			return tile;
		};
	};

	/**
	 * Returns an iterator with a next() function that iterates through the
	 * tiles in the grid.
	 * @return {object} The iterator object.
	 */
	HexGrid.prototype.getTileIterator = function() {
		return new TileIterator(this);
	};

	/**
	 * Whether a given direction is valid for this map layout.
	 * @return {bool} Whether the direction is valid.
	 */
	HexGrid.prototype.isValidDirection = function(dir) {
		if (_validDirs[this.orientation].indexOf(dir) === -1) {
			return false;
		}

		return true;
	};

	/**
	 * Gets the coordinates of a tile given its ID.
	 * @param {string} tileId The ID of the tile.
	 * @return {object|null} An object with x and y properties.
	 */
	HexGrid.prototype.getCoordsById = function(tileId) {
		var tileIdx = this.tileIdMap[tileId];
		if (tileIdx === undefined) {
			return null;
		}

		return {
			x: tileIdx % this.width,
			y: Math.floor(tileIdx / this.width)
		};
	};

	/**
	 * Gets a tile given its ID.
	 * @param {string} tileId The ID of the tile.
	 * @return {object|null} The tile.
	 */
	HexGrid.prototype.getTileById = function(tileId) {
		var tileIdx = this.tileIdMap[tileId];
		if (tileIdx === undefined) {
			throw new Error('Not a valid tileId: ' + tileId);
		}

		return this.tiles[tileIdx];
	};

	/**
	 * Gets a tile's neighbour given its coordinates and a direction.
	 * @param {number} x The X coordinate of the tile.
	 * @param {number} y The Y coordinate of the tile.
	 * @param {string} dir A direction. One of: north, northeast, east,
	 * southeast, south, southwest, west, northwest.
	 * @return {object|null} The neighbouring tile.
	 */
	HexGrid.prototype.getNeighbourByCoords = function(x, y, dir) {
		if (this.isValidDirection(dir) === false) {
			throw new Error('Not a valid direction: ' + dir);
		}

		// TODO: It might be good to reduce this using maths.
		switch (this.layout) {
		case 'odd-q':
			// Flat-top.
			switch (dir) {
			case 'north':
				return this.getTileByCoords(x, y - 1);
			case 'northeast':
				if (x % 2 === 0) {
					return this.getTileByCoords(x + 1, y - 1);
				}
				return this.getTileByCoords(x + 1, y);
			case 'southeast':
				if (x % 2 === 1) {
					return this.getTileByCoords(x + 1, y + 1);
				}
				return this.getTileByCoords(x + 1, y);
			case 'south':
				return this.getTileByCoords(x, y + 1);
			case 'southwest':
				if (x % 2 === 1) {
					return this.getTileByCoords(x - 1, y + 1);
				}
				return this.getTileByCoords(x - 1, y);
			case 'northwest':
				if (x % 2 === 0) {
					return this.getTileByCoords(x - 1, y - 1);
				}
				return this.getTileByCoords(x - 1, y);
			}
			break;
		case 'even-q':
			// Flat-top.
			switch (dir) {
			case 'north':
				return this.getTileByCoords(x, y - 1);
			case 'northeast':
				// On even col Idx, y does not change.
				if (x % 2 === 0) {
					return this.getTileByCoords(x + 1, y);
				}
				return this.getTileByCoords(x + 1, y - 1);
			case 'southeast':
				// On odd col Idx, y does not change.
				if (x % 2 === 1) {
					return this.getTileByCoords(x + 1, y);
				}
				return this.getTileByCoords(x + 1, y + 1);
			case 'south':
				return this.getTileByCoords(x, y + 1);
			case 'southwest':
				// On odd col Idx, y does not change.
				if (x % 2 === 1) {
					return this.getTileByCoords(x - 1, y);
				}
				return this.getTileByCoords(x - 1, y + 1);
			case 'northwest':
				// On even col Idx, y does not change.
				if (x % 2 === 0) {
					return this.getTileByCoords(x - 1, y);
				}
				return this.getTileByCoords(x - 1, y - 1);
			}
			break;
		case 'odd-r':
			// Pointy-top.
			switch (dir) {
			case 'northeast':
				// On even rows, x doesn't change.
				if (y % 2 === 0) {
					return this.getTileByCoords(x, y - 1);
				}
				return this.getTileByCoords(x + 1, y - 1);
			case 'east':
				return this.getTileByCoords(x + 1, y);
			case 'southeast':
				// On even rows, x doesn't change.
				if (y % 2 === 0) {
					return this.getTileByCoords(x, y + 1);
				}
				return this.getTileByCoords(x + 1, y + 1);
			case 'south':
				return this.getTileByCoords(x, y + 1);
			case 'southwest':
				// On odd rows, x doesn't change.
				if (y % 2 === 1) {
					return this.getTileByCoords(x, y + 1);
				}
				return this.getTileByCoords(x - 1, y + 1);
			case 'west':
				return this.getTileByCoords(x - 1, y);
			case 'northwest':
				// On odd rows, x doesn't change.
				if (y % 2 === 1) {
					return this.getTileByCoords(x, y - 1);
				}
				return this.getTileByCoords(x - 1, y - 1);
			}
			break;
		case 'even-r':
			// Pointy-top.
			switch (dir) {
			case 'northeast':
				// On odd rows, x doesn't change.
				if (y % 2 === 1) {
					return this.getTileByCoords(x, y - 1);
				}
				return this.getTileByCoords(x + 1, y - 1);
			case 'east':
				return this.getTileByCoords(x + 1, y);
			case 'southeast':
				// On odd rows, x doesn't change.
				if (y %  2 === 1) {
					return this.getTileByCoords(x, y + 1);
				}
				return this.getTileByCoords(x + 1, y + 1);
			case 'south':
				return this.getTileByCoords(x, y + 1);
			case 'southwest':
				// On even rows, x doesn't change.
				if (y % 2 === 0) {
					return this.getTileByCoords(x, y + 1);
				}
				return this.getTileByCoords(x - 1, y + 1);
			case 'west':
				return this.getTileByCoords(x - 1, y);
			case 'northwest':
				// On even rows, x doesn't change.
				if (y % 2 === 0) {
					return this.getTileByCoords(x, y - 1);
				}
				return this.getTileByCoords(x - 1, y - 1);
			}
			break;
		}

	};

	/**
	 * Gets a tile's neighbour given the tile's ID and a direction.
	 * @param {string} tileId The tile's ID.
	 * @param {string} dir A direction. One of: north, northeast, east,
	 * southeast, south, southwest, west, northwest.
	 * @return {object|null} The neighbouring tile.
	 */
	HexGrid.prototype.getNeighbourById = function(tileId, dir) {
		var coords = this.getCoordsById(tileId);
		if (coords === null) {
			throw new Error('Invalid tile ID: ' + tileId);
		}

		return this.getNeighbourByCoords(coords.x, coords.y, dir);
	};

	/**
	 * Gets all neighbours of a tile given the tile's ID.
	 * @param {string} tileId The tile's ID.
	 * @return {object[]} The neighbouring tiles.
	 */
	HexGrid.prototype.getNeighboursById = function(tileId) {
		var coords = this.getCoordsById(tileId);
		if (coords === null) {
			throw new Error('Invalid tile ID: ' + tileId);
		}

		return _validDirs[this.orientation].map(function (dir) {
			return this.getNeighbourByCoords(coords.x, coords.y, dir);
		}.bind(this)).filter(function (tile) {
			return tile !== null;
		});
	};

	/**
	 * Gets the position of a tile by its coordinates. Due to the way
	 * hexagonal grids work, the position of half of the tiles are offset by
	 * 0.5.
	 * @param {number} x The X coordinate of the tile.
	 * @param {number} y The Y coordinate of the tile.
	 * @return {object} An object with x and y properties.
	 */
	HexGrid.prototype.getPositionByCoords = function(x, y) {
		var xPos = x,
			yPos = y;

		switch (this.layout) {
		// Flat top.
		case 'odd-q':
			// Odd columns are offset by half.
			if (x % 2 === 1) {
				yPos = y + 0.5;
			}
			break;

		case 'even-q':
			// Even columns are offset by half.
			if (x % 2 === 0) {
				yPos = y + 0.5;
			}
			break;

		// Pointy top.
		case 'odd-r':
			// Odd rows are offset by half.
			if (y % 2 === 1) {
				xPos = x + 0.5;
			}

			break;

		case 'even-r':
			// Even rows are offset by half.
			if (y % 2 === 0) {
				xPos = x + 0.5;
			}

			break;
		default:
			throw new Error(
				'getPositionByCoords is not implemented for ' + this.layout + '.');
		}

		return {
			x: xPos,
			y: yPos
		};
	};

	/**
	 * Gets the position of a tile by its ID.
	 * @param {string} tileId The tile's ID.
	 * @return {object} An object with x and y properties.
	 */
	HexGrid.prototype.getPositionById = function(tileId) {
		var coords = this.getCoordsById(tileId);
		return this.getPositionByCoords(coords.x, coords.y);
	};

	/**
	 * Gets all shortest paths from a given starting tile.
	 *
	 * @param {string} tileId The tile's ID.
	 * @param {object} options An options object.
	 * @param {number} options.maxCost The maximum allowed cost of a path,
	 * or POSITIVE_INFINITY if not specified. If specified, a pathCost function
	 * must be provided.
	 * @param {number|function} options.moveCost The cost of moving from one
	 * tile to another. If a function is provided, it is called like
	 * `options.pathCost(fromTile, toTile)` and it should return the cost of
	 * moving from fromTile to toTile. Defaults to 1.
	 * @return {object} An object where the keys are the final tileId in a path
	 * and the values are Path objects. The Path object looks like this:
	 * {
	 *     tileIds: [tileId1, tileId2, ..., tileIdN],
	 *     cost: 0
	 * }
	 *
	 * The tileIds are the tile IDs traversed in order, including the starting
	 * and final tile.
	 *
	 * The cost it the total cost of traversing the path. The cost of each step
	 * of the path is determined by calling options.pathCost(fromTile, toTile),
	 * or 0 if options.pathCost is not supplied.
	 *
	 * The zero-length path from a tile to itself is not returned.
	 */
	HexGrid.prototype.getShortestPathsFromTileId = function(tileId, options) {
		if (typeof(tileId) !== 'string') {
			throw new Error('tileId must be a string, got: ' + tileId);
		}

		options = options || {};
		var maxPathCost = options.maxCost;
		if (maxPathCost === undefined) {
			maxPathCost = Number.POSITIVE_INFINITY;
		}

		var moveCost = options.moveCost;
		if (moveCost === undefined) {
			moveCost = 1;
		}

		// Start with the input tile as the frontier tile and explore from there.
		var frontierTiles = [this.getTileById(tileId)];

		// For each tile, record the previous tile.
		var from = {};
		from[tileId] = null;

		// For each destination tile store a Path object.
		var path = {};

		while (frontierTiles.length) {
			var frontierTile = frontierTiles.pop();
			if (path[frontierTile.id] === undefined) {
				path[frontierTile.id] = {
					tileIds: [frontierTile.id],
					cost: 0
				};
			}

			this.getNeighboursById(frontierTile.id).forEach(function (neighbourTile) {
				// Path is too costly.
				if (path[frontierTile.id].cost > maxPathCost) {
					return;
				}

				// Already found a path to tile.id. Breadth-first search
				// guarantees it is shorter.
				if (from[neighbourTile.id] !== undefined) {
					return;
				}

				// Tile is not pathable.
				if (typeof(options.isPathable) === 'function' &&
					options.isPathable(neighbourTile) === false
				) {
					return;
				}


				var cost = null;
				if (typeof moveCost === 'function') {
					cost = moveCost(frontierTile, neighbourTile);
					if (typeof cost !== 'number') {
						throw new Error(
							'options.moveCost(fromTile, toTile) did not return a number.'
						);
					}
				} else {
					cost = moveCost;
				}

				var pathCost = path[frontierTile.id].cost + cost;
				if (pathCost > maxPathCost) {
					return;
				}

				from[neighbourTile.id] = frontierTile.id;
				path[neighbourTile.id] = {
					cost: pathCost,
					tileIds: path[frontierTile.id].tileIds.concat([neighbourTile.id])
				};

				frontierTiles.push(neighbourTile);
			});
		}

		// Exclude the 0 length path.
		delete path[tileId];

		return path;
	};

	return HexGrid;
})();