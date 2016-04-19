class @Background
	debug: true

	totalLocalPhotos: 77
	totalPosts: null

	config:
		tumblr:
			#baseHostname: 'anydolandscape.tumblr.com'
			baseHostname: 'unsplash.com'
			apiKey: 'HkbfV4z6wZdiMtmPu8Xo3ejkUoxHUXwKpMfcywPukVSUGw4UJq'

	totalPosts: null

	previousImageUrl: null
	currentImageUrl: null

	constructor: ->
		this.getImage()
		#this.setRandomBackground()

		this.setListeners()

	setListeners: ->

		$('body').on('IntentionSet', =>
			$('#Overlay').delay(2000).animate( opacity: 0.2, 4000 )
		)
		$('body').on('RandomizeBackground', this.setRandomBackground )

	setRandomBackground: =>
		#randNumber = Math.round( Math.random(0,71)*71 )
		#this.setCustomBackground( "../images/photos/#{randNumber}.jpg")
		this.currentImageUrl = null
		this.getImage()

	getImage: =>
		$.ajax
			dataType: "jsonp",
			url: this.getTumblrUrl()
			success: this.getImageCallback

	getImageCallback: ( data ) =>
		console.log 'Tumblr', data
		imageUrl = data.response.posts[0].photos[0].original_size.url
		if( this.currentImageUrl == null )
			this.setBackground( imageUrl )


	setBackground: ( imageUrl ) ->
		if( this.previousImageUrl == null )
			this.previousImageUrl = imageUrl

		this.currentImageUrl = imageUrl

		$('#Background').css( "background-image", "url(#{imageUrl})" )
		$('#Background').animate( opacity: 1, 700 )



		
		

	setCustomBackground: ( imageUrl ) ->
		$('#Background').animate( opacity: 0, 700, =>
			this.setBackground( imageUrl )
		)
		

	setPreviousBackground: ->

		this.setBackground( this.previousImageUrl )

	getTumblrUrl: ->
		randNumber = Math.round( Math.random(0,180)*180 )
		url = "https://api.tumblr.com/v2/blog/#{this.config.tumblr.baseHostname}/posts/photo?api_key=#{this.config.tumblr.apiKey}&offset=#{randNumber}"
		return url



		{"1392919244":{"string":"Focus on what matters at the moment.","time":1392919244,"image_url":"http://24.media.tumblr.com/517307e7e38640827087e5d71b6f4694/tumblr_mzgz2dmpvq1st5lhmo1_1280.jpg"},"1393002717":{"string":"Execution excellence.","time":1393002717,"image_url":"http://farm4.staticflickr.com/3080/2775233719_53bee7b79d_o.jpg"}}