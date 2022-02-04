let constants = require('consts');
let roleHarvester = {
    /** @param {Creep} creep **/
    run: function (creep, method) {
        if (creep.memory.harvesting && creep.store.getFreeCapacity() === 0) {
            creep.memory.harvesting = false;
        }

        if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.harvesting = true;
        }


        if (creep.memory.harvesting) {
            let sourceIndex = Math.floor(method / 2);
            let sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[sourceIndex]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[sourceIndex], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else {
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_EXTENSION ||
                        structure.structureType === STRUCTURE_SPAWN ||
                        structure.structureType === STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};

module.exports = roleHarvester;