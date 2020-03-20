
// Home in milliseconds

increments = {
  "3h"  : 10800000,
  "12h" : 43200000,
  "1d"  : 86400000,
  "3d"  : 259200000,
  "1w"  : 604800000,
  "1M"  : 2592000000

}

module.exports.determine_endtime = (_start_t,_increment) => {
    //_start_t should be in ISO 8601 GMT
    let start_time_epoch = new Date(_start_t).getTime()
    let end_time= new Date(start_time_epoch += increments[_increment])
    return end_time.toUTCString()

}
