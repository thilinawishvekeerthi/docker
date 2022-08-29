import { Config } from "./Config";
import { Tile } from "./Title";

export interface GridDataResponse{
    payload: GridData
}

export interface GridData{
    Tiles: Tile[] ,
    Config: Config
}