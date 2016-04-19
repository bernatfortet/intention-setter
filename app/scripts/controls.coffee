class @Controls

#http://25.media.tumblr.com/ad80d557aee5736d7b01ca13846781f5/tumblr_n10n5ygMJI1st5lhmo1_1280.jpg

	text: null
	input: null

	state: "click"

	constructor: ->
		this.el = $('#Controls')
		this.text = $('#AddImageText')
		this.input = $('#AddImageInput')
		this.icon = $('#AddImageIcon')
		this.button = $('#AddImageButton')
		this.randomizeImage = $('#RandomizeImage')

		this.setListeners()

	appear: -> 
		this.el.animate(
			opacity: "1"
		,
			queue: false
			duration: 2000
		).transition
			y: "-15", duration: 2000, easing: 'easeOutQuart'



	setListeners: ->


		this.randomizeImage.on('click', =>
			$('body').trigger('RandomizeBackground')
		)


		this.button.on('click', =>

			if( this.state == 'remove')
				console.log 'asdf'
				app.background.setPreviousBackground()
				this.icon.attr('state', 'click')
				$('#AddImageText').text("Use image from url")
				this.state = "click"
				# Go Back to old image
		)

		this.input.on('focus', =>

			if( this.state == 'click')
				this.input.val('')
				this.text.text("Just press Ctrl + V")
				this.state = "paste"
		)

		this.input.on('blur', =>
			if( this.state == 'paste')
				$('#AddImageText').text("Use image from url")
				this.state = "click"
		)

		this.input.on('keydown', jwerty.event("ctrl+v/cmd+v", =>
			setTimeout ( => 
				pastedText = $('#AddImageInput').val()
				$('#AddImageInput').val('')
				app.background.setCustomBackground( pastedText )
				this.text.text("Remove Image")
				this.state = "remove"
				this.icon.attr('state', 'remove')
			), 200
		))


