let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');
let roleBuilder = require('role.builder');
let roleRepairer = require('role.repairer');
let base = require('base');
let constants = require('consts');
let spawnOperation = require('./spawn.operation');
let memoryOperation = require('./memory.operation');

module.exports.loop = function () {
    // Game.spawns 中是以spawnName为key 内容为value的map形式
    memoryOperation.clearCreeps();

    spawnOperation.batchExecute();

    // let currentSpawn = constants.spawn[0];
    // // clear memory

    // // init harvester

    // base.autoInit(currentSpawn, constants.harvester, constants.maxHarvester, constants.medium);
    // // init upgrader
    // base.autoInit(currentSpawn, constants.upgrader, constants.maxUpgrader, constants.medium);
    // // init builder
    // base.autoInit(currentSpawn, constants.builder, constants.maxBuilder, constants.medium);
    // // init repairer
    // base.autoInit(currentSpawn, constants.repairer, constants.maxRepairer, constants.medium);


    // if (Game.spawns['Charles'].spawning) {
    //     let spawningCreep = Game.creeps[Game.spawns['Charles'].spawning.name];
    //     Game.spawns['Charles'].room.visual.text(
    //         '🛠️' + spawningCreep.memory.role,
    //         Game.spawns['Charles'].pos.x + 1,
    //         Game.spawns['Charles'].pos.y,
    //         {align: 'left', opacity: 0.8});
    // }

    // let farSource = 1;
    // for (let name in Game.creeps) {
    //     let creep = Game.creeps[name];
    //     let memoryRole = creep.memory.role;
    //     if (memoryRole === constants.harvester) {
    //         roleHarvester.run(creep, farSource);
    //         farSource++;
    //         continue;
    //     }
    //     if (memoryRole === constants.upgrader) {
    //         roleUpgrader.run(creep);
    //         continue;
    //     }
    //     if (memoryRole === constants.builder) {
    //         roleBuilder.run(creep);
    //         continue;
    //     }
    //     if (memoryRole === constants.repairer) {
    //         roleRepairer.run(creep);
    //         continue;
    //     }
    // }
};