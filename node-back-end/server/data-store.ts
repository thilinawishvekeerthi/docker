export let TILES: any = [
    {id : 0,text: 'One', cols: 1, rows: 2, color: 'blue', selected : false,   merged: true},
    {id : 0,text: 'Two', cols: 1, rows: 1, color: 'blue', selected : false, merged: true},
    {id : 0,text: 'Three', cols: 2, rows: 1, color: 'blue', selected : false, merged: true},
    {id : 0,text: 'Four', cols: 1, rows: 2, color: 'blue', selected : false, merged: true},
    {id : 0,text: 'One', cols: 1, rows: 1, color: 'blue', selected : false, merged: true},
    {id : 0,text: 'Two', cols: 1, rows: 1, color: 'blue', selected : false, merged: true},
    {id : 0,text: 'Three', cols: 1, rows: 1, color: 'blue', selected : false, merged: true},
    {id : 0,text: 'Four', cols: 2, rows: 2, color: 'blue', selected : false, merged: true},
    {id : 0,text: 'Four', cols: 1, rows: 1, color: 'blue', selected : false, merged: true},
    {id : 0,text: 'Four', cols: 1, rows: 1, color: 'blue', selected : false, merged: true},
];

export let CONFIG : any = {
    id: 0,
    colCount: 4,
    rowCount: 10
}

export function saveTiles(tiles: any){
    TILES = tiles;
}

export function saveConfig(config: any){
    CONFIG = config;
}

export function getTile(){
    return TILES;
}

export function getConfig(){
    return CONFIG;
}
