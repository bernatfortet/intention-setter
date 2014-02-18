class @Database

	listLoaded: false
	currentIntention: null


	today: null
	dayStartSleepHour: 3
	dayEndSleepHour: 5

	constructor: ->
		this.mongoDB = new MongoLab('50b9ed0fe4b0afba6ecc5836');

		this.today = moment()

	checkIfThereIsIntentionAndGetIt: ->
		storedIntention = localStorage.getItem( 'current_intention' )

		if( storedIntention? )
			this.setIntention( JSON.parse(storedIntention) )
		else
			this.getIntentions()

	getIntentions: -> 
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
		this.mongoDB.insertDocuments "intentions", "intentions", intention, (data) =>
			console.log "Insert Documents : ", data

		localStorage.setItem( 'current_intention', JSON.stringify(intention) );