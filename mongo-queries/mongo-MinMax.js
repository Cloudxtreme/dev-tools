replication:PRIMARY> db.INTERACTION.aggregate([ { $group: { _id:0, eventDateTime: { $min: "$eventDateTime"} } } ])
{
	"result" : [
		{
			"_id" : 0,
			"eventDateTime" : ISODate("2013-11-26T12:25:58.314Z")
		}
	],
	"ok" : 1
}
replication:PRIMARY> db.INTERACTION.aggregate([ { $group: { _id:0, eventDateTime: { $max: "$eventDateTime"} } } ])
{
	"result" : [
		{
			"_id" : 0,
			"eventDateTime" : ISODate("2013-11-26T13:14:24.762Z")
		}
	],
	"ok" : 1
}
replication:PRIMARY> db.FOLLOW_ON_ACTION.aggregate([ { $group: { _id:0, eventDateTime: { $min: "$eventDateTime"} } } ])
{
	"result" : [
		{
			"_id" : 0,
			"eventDateTime" : ISODate("2013-11-26T12:25:59.652Z")
		}
	],
	"ok" : 1
}
replication:PRIMARY> db.FOLLOW_ON_ACTION.aggregate([ { $group: { _id:0, eventDateTime: { $max: "$eventDateTime"} } } ])
{
	"result" : [
		{
			"_id" : 0,
			"eventDateTime" : ISODate("2013-11-26T13:14:24.767Z")
		}
	],
	"ok" : 1
}


replication:PRIMARY> db.TRANSACTION.aggregate([ { $group: { _id:0, eventDateTime: { $min: "$eventDateTime"} } } ])
{
	"result" : [
		{
			"_id" : 0,
			"eventDateTime" : ISODate("2013-11-26T12:25:59.422Z")
		}
	],
	"ok" : 1
}
replication:PRIMARY> db.TRANSACTION.aggregate([ { $group: { _id:0, eventDateTime: { $max: "$eventDateTime"} } } ])
{
	"result" : [
		{
			"_id" : 0,
			"eventDateTime" : ISODate("2013-11-26T13:03:39.267Z")
		}
	],
	"ok" : 1
}
replication:PRIMARY> 
