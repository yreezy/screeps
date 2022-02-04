/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('base');
 * mod.thing == 'a thing'; // true
 */
let constants = require('consts');

const ecoWorker = [WORK, CARRY, MOVE]

function getModel(roleName) {
    switch (roleName) {
        case constants.harvester:
            return constants.moveWorker;
        case constants.builder:
            return constants.worker;
        case constants.upgrader:
            return constants.moveWorker;
        case constants.repairer:
            return constants.moveWorker;
        default:
            return;
    }
}

function getCapacities(model, roleLevel) {
    switch (model) {
        case constants.worker:
            return getWorker(roleLevel);
        case constants.moveWorker:
            return getMoveWorker(roleLevel);
        default:
            return;
    }
}

function getWorker(roleLevel) {
    switch (roleLevel) {
        case constants.low:
            return [WORK, CARRY, MOVE];
        case constants.medium:
            return [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE];
        default:
            return;
    }
}


function getMoveWorker(roleLevel) {
    switch (roleLevel) {
        case constants.low:
            return [WORK, CARRY, MOVE];
        case constants.medium:
            return [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
        default:
            return;
    }
}


module.exports = {
    autoInit: function (currentSpawn, roleName, maxNumber, roleLevel) {
        // check maxNumber
        let roles = _.filter(Game.creeps, (creep) => creep.memory.role === roleName);
        if (roles.length >= maxNumber) {
            return;
        }
        // get suitable role
        thisSpawn = Game.spawns[currentSpawn];
        console.log(Game.spawns)
        let totalResource = thisSpawn.room.energyAvailable;
        let low = Math.floor(totalResource / 200);
        if (low === 0) {
            return;
        }

        let model = getModel(roleName);
        if (!model) {
            return;
        }
        let capacities = getCapacities(model, roleLevel);
        if (!capacities) {
            return;
        }

        let newName = roleName + Game.time;
        let res = Game.spawns[currentSpawn].spawnCreep(capacities, newName, {memory: {role: roleName}});
        if (res === 0) {
            console.log('Spawning new ' + roleName + ': ' + newName);
        }
    }
};