import VuexORM, { Model, Database } from '@vuex-orm/core';
import { Plugin } from 'vuex';

export class ORMDatabase {
    private static _ormDatabase = new VuexORM.Database();
    
    private static _installed = <typeof Model[]>[];

    public static install(options: any): Plugin<any> {
        const plugins = options.plugins;
        if (plugins && plugins.length) {
            plugins.forEach((plugin: any) => VuexORM.use(plugin))
        }
        return VuexORM.install(ORMDatabase._ormDatabase);
    }

    public static registerEntity(model: typeof Model) {
        if (this._installed.indexOf(model) !== -1) {
            console.error(`Unable to register entity ${model.name}.  Entity already registered.`)
            return;
        }
        ORMDatabase._ormDatabase.register(model);
    }
}