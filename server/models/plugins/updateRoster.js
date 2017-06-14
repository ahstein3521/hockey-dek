
module.exports = function(seasonId, playersObject, cb){
	const _this = this;
	const { added, removed } = playersObject;

  const update1 = {
    $push: { 
      players: {$each: added}, 
      formerPlayers: {$each: removed} 
    }
  };

 const update2 = {
    $pull: {
      players: {$in: removed}, 
      formerPlayers: {$in: added} 
    }
  };

  const UpdateSeason = update => 
    _this
      .findByIdAndUpdate(seasonId , update)
      .exec()
  

	return UpdateSeason(update1)
		.then(() => UpdateSeason(update2))
		.then(() => cb(seasonId))
    .then(team => Promise.resolve(team))
		.catch(err => { throw err})
}	