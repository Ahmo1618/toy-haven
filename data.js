// Fictional catalogue. All prices are sample LKR amounts.
// Each object represents ONE product. Other pages use this same array.
const products = [
    {
        "id": 1,
        "name": "Lunar Explorer Figure",
        "category": "Figurines",
        "price": 4500,
        "image": "assets/images/astronaut.webp",
        "description": "A cream-suited astronaut with an amber visor and a dark display base. A calm centrepiece for a space-inspired shelf.",
        "type": "Display figurine"
    },
    {
        "id": 2,
        "name": "Crimson Knight Figure",
        "category": "Figurines",
        "price": 5200,
        "image": "assets/images/knight.webp",
        "description": "Steel-coloured armour, a burgundy cape and a textured display base for a medieval-inspired collection.",
        "type": "Display figurine"
    },
    {
        "id": 3,
        "name": "Classic Teddy Bear",
        "category": "Toys",
        "price": 2800,
        "image": "assets/images/teddy.webp",
        "description": "A tan teddy with a forest-green bow. A familiar companion for a reading corner or a thoughtful gift.",
        "type": "Soft toy"
    },
    {
        "id": 4,
        "name": "Mint Explorer Robot",
        "category": "Toys",
        "price": 3900,
        "image": "assets/images/robot.webp",
        "description": "A retro-style mint and cream robot with warm orange eyes. Made for a shelf with a little personality.",
        "type": "Robot toy"
    },
    {
        "id": 5,
        "name": "Sunday Trail Game",
        "category": "Board Games",
        "price": 6500,
        "image": "assets/images/boardgame.webp",
        "description": "A colourful path, wooden pawns and dice set the scene for a relaxed evening around the table.",
        "type": "Tabletop game"
    },
    {
        "id": 6,
        "name": "Walnut Chess Set",
        "category": "Board Games",
        "price": 4000,
        "image": "assets/images/chess.webp",
        "description": "Warm wooden pieces and a walnut-coloured board for slow evenings and thoughtful moves.",
        "type": "Strategy game"
    },
    {
        "id": 7,
        "name": "Crimson Roadster Model",
        "category": "Diecast Cars",
        "price": 5000,
        "image": "assets/images/roadster.webp",
        "description": "An open-top red roadster with chrome-coloured details, imagined for a classic-car collection.",
        "type": "Diecast model"
    },
    {
        "id": 8,
        "name": "Golden Track Coupe",
        "category": "Diecast Cars",
        "price": 6000,
        "image": "assets/images/racer.webp",
        "description": "A mustard-yellow coupe with a low stance and dark wheels for the miniature garage.",
        "type": "Diecast model"
    },
    {
        "id": 9,
        "name": "Emerald Dragon Figure",
        "category": "Figurines",
        "price": 5800,
        "image": "assets/images/dragon.webp",
        "description": "An emerald dragon with folded wings, gold-coloured details and a dark display base. A fantasy-inspired addition to the shelf.",
        "type": "Display figurine"
    },
    {
        "id": 10,
        "name": "Vintage Aviator Figure",
        "category": "Figurines",
        "price": 4900,
        "image": "assets/images/pilot.webp",
        "description": "A goggle-wearing aviator in a brown flying jacket and tan scarf, standing on a round display base.",
        "type": "Display figurine"
    },
    {
        "id": 11,
        "name": "Little Builder Blocks",
        "category": "Toys",
        "price": 3200,
        "image": "assets/images/blocks.webp",
        "description": "Natural wood and muted colour blocks arranged as a miniature castle. A simple set for imaginative building.",
        "type": "Building toy"
    },
    {
        "id": 12,
        "name": "Woodland Express Train",
        "category": "Toys",
        "price": 4200,
        "image": "assets/images/train.webp",
        "description": "A teal wooden locomotive with two connected carriages and natural wood details. A classic playroom-inspired design.",
        "type": "Wooden toy"
    },
    {
        "id": 13,
        "name": "Classic Domino Set",
        "category": "Board Games",
        "price": 2900,
        "image": "assets/images/domino.webp",
        "description": "Cream domino tiles with dark pips, presented in a walnut-coloured box for tabletop evenings.",
        "type": "Tile game"
    },
    {
        "id": 14,
        "name": "Heritage Draughts Set",
        "category": "Board Games",
        "price": 3600,
        "image": "assets/images/checkers.webp",
        "description": "A warm wooden checkerboard with light and dark round counters for a two-player strategy collection.",
        "type": "Strategy game"
    },
    {
        "id": 15,
        "name": "Forest Camper Model",
        "category": "Diecast Cars",
        "price": 5500,
        "image": "assets/images/van.webp",
        "description": "A forest-green camper van with a cream roof and vintage-inspired details for the miniature garage.",
        "type": "Diecast model"
    },
    {
        "id": 16,
        "name": "Midnight Rally Model",
        "category": "Diecast Cars",
        "price": 6200,
        "image": "assets/images/rally.webp",
        "description": "A navy rally hatchback with white stripes, white wheels and a rear spoiler for a motorsport-inspired shelf.",
        "type": "Diecast model"
    }
];
