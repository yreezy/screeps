let roleRepairer = {
    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.repairing = false;
            creep.say('🔄 R: Hrv');
        } else if (!creep.memory.repairing && creep.store.getFreeCapacity() === 0) {
            creep.memory.repairing = true;
            creep.say('🚧 repair');
        }

        if (creep.memory.repairing) {
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType !== STRUCTURE_CONTROLLER
                        && structure.structureType !== STRUCTURE_EXTENSION
                        && structure.hits !== structure.hitsMax
                        && structure.hits > (structure.hitsMax - 5000)
                }
            });
            if (targets.length) {
                if (creep.repair(targets[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    creep.say('repair');
                }
            }
        } else {
            let sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[1]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
}

module.exports = roleRepairer;