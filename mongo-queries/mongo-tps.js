// TR 2013-09-02
// MONGO DB MONITOR SCRIPT
// VERSION 1.1
// OBJECT ORIENTED JAVASCRIPT ONLY

// var_dump required only for debugging
function var_dump(element, depth, tab)
{
	if(!depth)
		depth = 0;
	if(!tab)
		tab = '';
	tab += '\t';
	string = '';
	//Loop through all the child objects in element
	for(property in element)
	{
		//Add the name and value of the child object
		string += tab + "\""+property+"\""
		//Check if the child is an object
		if(typeof element[property] == 'object')
			string += '\n'+ var_dump(element[property], depth+1, tab) + '\n';
		else
			string += ': '+ element[property] + ''+ '\n';
	}
	//Ouput the result
	//if(depth == 0) ret(string);	
	//return string;
	print(string);
}

// class mongoMonitor
mongoMonitor={
	version:1.1,
	spc:"\t|",
	//how often query the mongo
	secDiff:1,
	//how often then show the column names
	showMiniHeaderDelay:15,

	// welcome header
	showHeader:function() {
		if(db.isMaster().ismaster==true) {
			var msg="MASTERR";
		}
		else {
			var msg="SLAVE";
			//allow querying whatever
			db.getMongo().setSlaveOk();	
		}
		print("# ===================== Welcome to Mongo TPS Monitor ======================");
		print("# Connected to: "+this.spc+db.isMaster().me);
		print("# Replication hosts:"+this.spc+db.isMaster().hosts+"\n# Replication passives:"+this.spc+db.isMaster().passives);
		print("----------------------------- Summary -----------------------------------");
	},

	// show mini CSV header
	showMiniHeader:function() {
		print("#00:00:00|"+"Conn"+this.spc+"New"+this.spc+"Query"+this.spc+"Insert"+this.spc+"Update"+this.spc+"Delete"+this.spc+"Cmmds"+this.spc+"Moves");
	},

	// monitor queries mongo every n seconds and substracts output values to print the diff
	startMongoMonitor:function() {
		//spacer
		var spc="\t|";

		//zeros
		var iconn=0;
		var inetin=0;
		var inetout=0;
		var iinsert=0;
		var iquery=0;
		var iupdate=0;
		var idelete=0;
		var igetmore=0;
		var icommand=0;
		var imoves=0;
		var miniHeaderCount=0;
		var ipagefaults=0;

		//inifinite loop
		while (true) {
			if(miniHeaderCount==0) 	{
				this.showMiniHeader();
			}
			var d = new Date();
			var dhh = (d.getHours()<10) ? "0"+d.getHours() : d.getHours();		
			var dmm = (d.getMinutes()<10) ? "0"+d.getMinutes() : d.getMinutes();	
			var dss = (d.getSeconds()<10) ? "0"+d.getSeconds() : d.getSeconds();
			var timenow = dhh+":"+dmm+":"+dss+" |";
			var connPool=db.runCommand({ connPoolStats: 1 });
			// get minified status from the db
			var status=db.runCommand({ serverStatus: 1, backgroundFlushing: 0, cursors: 0, dur: 0, connections: 1, extra_info: 0, globalLock: 0, opcounters: 1, network: 1, repl: 0, indexCounters: 0, metrics: 1, locks: 0, recordStats: 1});
			//printjson(status);
			// count difference between now and previous records
			var conn=status.connections.current+"/"+connPool.numDBClientConnection;
			var connDiff=(status.connections.current-iconn)/this.secDiff;
			var netInDiff=(status.network.bytesIn-inetin)/this.secDiff;
			var netOutDiff=(status.network.bytesOut-inetout)/this.secDiff;
			var insertDiff=(status.opcounters.insert-iinsert)/this.secDiff;
			var queryDiff=(status.opcounters.query-iquery)/this.secDiff;
			var updateDiff=(status.opcounters.update-iupdate)/this.secDiff;
			var deleteDiff=(status.opcounters.delete-idelete)/this.secDiff;

			var commDiff=(status.opcounters.command-icommand)/this.secDiff;
			var getmoreDiff=(status.opcounters.getmore-igetmore)/this.secDiff;

			var movesDiff=(status.metrics.record.moves-imoves)/this.secDiff;
			var pagesDiff=(status.recordStats.pageFaultExceptionsThrown-ipagefaults)/this.secDiff;
			// dont display 1st record
			if(inetin == 0) {
				//print(timenow+" no previous connections - diff skipped");
			}
			else {
				print(timenow+conn+this.spc+connDiff+this.spc+queryDiff+this.spc+insertDiff+this.spc+updateDiff+this.spc+deleteDiff+this.spc+commDiff+this.spc+movesDiff);
			}

			//remember current settings
			iconn=status.connections.current;
			inetin=status.network.bytesIn;
			inetout=status.network.bytesOut;
			iinsert=status.opcounters.insert;
			iquery=status.opcounters.query;
			iupdate=status.opcounters.update;
			idelete=status.opcounters.delete;
			igetmore=status.opcounters.getmore;
			icommand=status.opcounters.command;
			igetmore=status.opcounters.getmore;
			imoves=status.metrics.record.moves;
			ipagefaults=status.recordStats.pageFaultExceptionsThrown;

			//decide whether display the banner
			if(miniHeaderCount==this.showMiniHeaderDelay) {
				miniHeaderCount=0;
			}
			else {
				miniHeaderCount++;
			}

			//wait
			sleep(this.secDiff*1000);
		}
	},

	// main class
	main:function() {
		var startTime = new Date();
		this.showHeader();
		this.startMongoMonitor();
		var endTime = new Date();
		var timeDiff = endTime - startTime;
		print("Time required: "+this.spc+timeDiff/1000+"sec. Version "+this.version);
	}
}

/* Response from server: 
{
   "host": "unknown",
   "version": "2.4.5",
   "process": "mongod",
   "pid": NumberInt(3306),
   "uptime": 245802,
   "uptimeMillis": NumberLong(245801979),
   "uptimeEstimate": 244254,
   "localTime": ISODate("2013-08-30T11:02:03.381Z"),
   "asserts": {
     "regular": NumberInt(0),
     "warning": NumberInt(0),
     "msg": NumberInt(0),
     "user": NumberInt(0),
     "rollovers": NumberInt(0) 
  },
   "connections": {
     "current": NumberInt(12),
     "available": NumberInt(19988),
     "totalCreated": NumberLong(15) 
  },
   "network": {
     "bytesIn": NumberInt(7359),
     "bytesOut": NumberInt(41790),
     "numRequests": NumberInt(86) 
  },
   "opcounters": {
     "insert": NumberInt(1),
     "query": NumberInt(4108),
     "update": NumberInt(0),
     "delete": NumberInt(0),
     "getmore": NumberInt(0),
     "command": NumberInt(88) 
  },
   "opcountersRepl": {
     "insert": NumberInt(0),
     "query": NumberInt(0),
     "update": NumberInt(0),
     "delete": NumberInt(0),
     "getmore": NumberInt(0),
     "command": NumberInt(0) 
  },
   "ok": 1 
}*/

// PROGRAM STARTS HERE
mongoMonitor.main();
