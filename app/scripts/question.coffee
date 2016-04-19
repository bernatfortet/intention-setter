class @Question
	state: 'init'

	el: null
	text: null

	constructor: ->
		this.el = $('#Question')
		this.text = $('#QuestionText')

		this.setListeners()

	setListeners: ->

		$('body').on('IntentionSet', this.onIntentionSet )
		$('body').on('NoTextOnIntention', this.onNoTextOnIntention )
		$('body').on('StartWriting', this.onStartWriting )

	appear: ->
		###
		this.el.animate(
			opacity: "1"
		,
			queue: false
			duration: 1100
		).transition
			y: "50", duration: 900, easing: 'easeOutQuart'

		###


	onNoTextOnIntention: =>	
		this.text.text("What's your intention for today?")
		this.el.animate(
			opacity: "1"
		,
			duration: 800
		)

	onStartWriting: =>
		this.text.text('My intention for today is...')
		this.el.animate(
			opacity: "0.3"
		,
			duration: 300
		)

	onIntentionSet: =>
		
		this.text.text('My intention for today is...')

		move( '#Question' ).set('opacity',1).scale(0.5).translate(0,-180).duration(1100).end()
		###
		this.el.animate(
			opacity: "1"
		,
			queue: false
			duration: 1100
		).transition(
			scale: 0.5
		,
			duration: 1100
			queue: false
		).transition
			y: "-180", duration: 900, easing: 'easeOutQuart'

			###