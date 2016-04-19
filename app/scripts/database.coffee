class @Database

	listLoaded: false
	currentIntention: null

	intentionsList: {}


	today: null
	dayStartSleepHour: 2
	dayEndSleepHour: 5

	constructor: ->
		this.mongoDB = new MongoLab('50b9ed0fe4b0afba6ecc5836');

		this.today = moment()

	checkIfThereIsIntentionAndGetIt: ->
		storedIntentions = localStorage.getItem( 'intentions' )

		if( storedIntentions? )
			this.parseLocalStorageIntentions( storedIntentions )
		#else
		#	this.getMongoIntentions()

	parseLocalStorageIntentions: ( storedIntentions )->

		this.intentionsList = JSON.parse(storedIntentions)

		lastIntention = this.getLatestIntention( this.intentionsList )
		this.parseIntention( lastIntention )

	getMongoIntentions: -> 
		this.mongoDB.listDocuments "intentions", "intentions", { s:'{"_id": -1}' }, (intentions) => #, l: '1'

			this.intentionsList = intentions

			this.listLoaded = true

			for key, intention of intentions
				if( key == 0)
					this.parseIntention( intention )

	parseIntention: ( intention ) ->
		if( this.dateIsBetweenTodaysAwakeHours( intention.time ) )
			this.setIntention( intention )


	setIntention: ( intention ) ->
		app.intention.setIntention( intention )
		this.currentIntention = intention

	dateIsBetweenTodaysAwakeHours: ( date ) ->
		date = moment.unix(date)
		isBetweenAwakeHours = !( date.hour() >= this.dayStartSleepHour && date.hour() <= this.dayEndSleepHour )
		isInToday = date.dayOfYear() == this.today.dayOfYear()

		return isBetweenAwakeHours && isInToday

	
	addIntention: ( intention ) ->
		#use a Json Object
		#this.mongoDB.insertDocuments "intentions", "intentions", intention, (data) =>
			#console.log "Insert Documents : ", data

		this.intentionsList[intention.time] = intention

		localStorage.setItem( 'intentions', JSON.stringify(this.intentionsList) );



	# Tools #######


	getLatestIntention: ( intentions ) ->
		latest = null
		for key, intention of intentions
			if( key > latest )
				latest = key

		return intentions[latest]