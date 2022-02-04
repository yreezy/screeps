let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');
let roleBuilder = require('role.builder');
let roleRepairer = require('role.repairer');
let base = require('base');
let constants = require('consts');


module.exports.loop = function () {
    let currentSpawn = constants.spawn[0];
    // clear memory
    for (let name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    // init harvester

    base.autoInit(currentSpawn, constants.harvester, constants.maxHarvester, constants.medium);
    // init upgrader
    base.autoInit(currentSpawn, constants.upgrader, constants.maxUpgrader, constants.medium);
    // init builder
    base.autoInit(currentSpawn, constants.builder, constants.maxBuilder, constants.medium);
    // init repairer
    base.autoInit(currentSpawn, constants.repairer, constants.maxRepairer, constants.medium);


    if (Game.spawns['Spawn1'].spawning) {
        let spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }

    let farSource = 1;
    for (let name in Game.creeps) {
        let creep = Game.creeps[name];
        let memoryRole = creep.memory.role;
        if (memoryRole === constants.harvester) {
            roleHarvester.run(creep, farSource);
            farSource++;
            continue;
        }
        if (memoryRole === constants.upgrader) {
            roleUpgrader.run(creep);
            continue;
        }
        if (memoryRole === constants.builder) {
            roleBuilder.run(creep);
            continue;
        }
        if (memoryRole === constants.repairer) {
            roleRepairer.run(creep);
            continue;
        }
    }
};