class @Intention

	intentionSetDivMarginTop: 40

	string: null

	input: null
	text: null


	constructor: ->
		this.el = $('#Intention')
		this.input = $('#IntentionInput')
		this.text = $('#IntentionText')


		this.setListeners()

		this.appear()

	appear: ->

		this.el.animate(
			opacity: "1"
		,
			queue: false
			duration: 1100
		).transition
			y: "-50", duration: 900, easing: 'easeOutQuart'


	setListeners: ->

		this.input.bind('keydown', jwerty.event('enter', => 
			console.log 'User Presses Enter'
			this.captureIntention()
		));

		this.input.on('keydown', =>
			app.question.onStartWriting()
		)

		this.input.on('keyup', =>
			if( this.input.val() == '')
				app.question.onNoTextOnIntention()
		)

	setIntention: ( intention ) ->
		console.log intention
		this.input.val( intention.string )
		this.input.hide()
		this.text.text( intention.string )
		this.text.show()

		intentionSetDivPosition = $('#IntentionText').offset().top - this.intentionSetDivMarginTop

		$('#IntentionText').transition( y: -intentionSetDivPosition, duration: 2500, easing: 'easeOutQuart' )
		app.background.setBackground( intention.image_url )


	captureIntention: =>

		intentionString = $('#IntentionInput').val()

		# Return if intention is Empty
		if( intentionString == '')
			return

		intention =
			string: intentionString
			time: moment().unix()
			image_url: app.background.currentImageUrl

		app.db.addIntention( intention )
		this.setIntention( intention )