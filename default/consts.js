/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('constants');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    // basic creeps role name
    harvester: 'harvester',
    builder: 'builder',
    upgrader: 'upgrader',
    repairer: 'repairer',
    spawn: ['Charles'],
    // init param
    maxInitRetryTimes: 3,

    // consign max number of creeps
    maxHarvester: 2,
    maxBuilder: 2,
    maxUpgrader: 3,
    maxRepairer: 1,

    worker: 'worker',
    moveWorker: 'moveWorker',

    low: 1,
    medium: 2,
    high: 3

};