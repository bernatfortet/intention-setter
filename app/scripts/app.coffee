class @App
	debug: false

	constructor: ->
		this.background = new Background( )
		this.db = new Database()
		this.question = new Question()
		this.controls = new Controls()
		this.intention = new Intention()

	init: ->
		this.setListeners()

		if( this.debug )
			localStorage.clear();

		this.db.checkIfThereIsIntentionAndGetIt()

		setTimeout( this.showElements, 0 )

	showElements: =>
		this.question.appear()
		this.controls.appear()
		this.intention .appear()

	setListeners: ->

		$('#More').on('click', =>
			if( $('#More').attr('state') == 'open' )
				$('#More').attr('state', 'close')
				$('#Credits').animate( opacity: 0, -> 
					$('#Credits').css( 'display': 'none' )
				)
			else
				$('#More').attr('state', 'open')
				$('#Credits').css( 'display': 'block' )
				$('#Credits').animate( opacity: 1 )
		)