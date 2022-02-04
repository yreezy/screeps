let constants = require('consts');
let roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.building && creep.store.getFreeCapacity() === 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if (creep.memory.building) {
            let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            let targetNum = 0;
            if (targets.length) {
                for (let i = 0; i < targets.length; i++) {
                    if (targets[i].structureType === STRUCTURE_EXTENSION) {
                        targetNum = i;
                        break;
                    }
                }
                if (creep.build(targets[targetNum]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[targetNum], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        } else {
            let sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[1]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleBuilder;