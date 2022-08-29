import {Request, Response} from 'express';
import {saveConfig,saveTiles,getConfig, getTile} from "./data-store";
import {setTimeout} from 'timers';

export function saveGridData(req:Request, res: Response){
    const emitError = req.params["emit_error"];
    if(emitError=="1"){
        res.status(500).json({message: 'Programmatically Caused Error'});
    }else{
        setTimeout(() => {
            let gridData = req.body;
            saveTiles(gridData.Tiles);
            saveConfig(gridData.Config)
            res.status(200).json({payload:
                { Tiles : Object.values(getTile()),
                  Config : getConfig() }
            });
       }, 1500);
    }
}