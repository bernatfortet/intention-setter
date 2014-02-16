class @Question
	state: 'init'

	el: null
	text: null

	constructor: ->
		this.el = $('#Question')
		this.text = $('#QuestionText')

		this.onEnter()

	onEnter: ->
		this.el.animate(
			opacity: "1"
		,
			queue: false
			duration: 1100
		).transition
			y: "50", duration: 900, easing: 'easeOutQuart'


	onNoTextOnIntention: ->	
		this.text.text("What's your intention for today?")
		this.el.animate(
			opacity: "1"
		,
			duration: 800
		)


	onIntentionSet: ->	

	onStartWriting: ->
		this.text.text('My intention for today is...')
		this.el.animate(
			opacity: "0.3"
		,
			duration: 800
		)
