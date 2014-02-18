class @Background
	debug: true
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

	getImage: ->
		$.ajax
			dataType: "jsonp",
			url: this.getTumblrUrl()
			success: (data) =>
				console.log 'Tumblr', data

				imageUrl = data.response.posts[0].photos[0].original_size.url
				#console.log imageUrl

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
		url = "https://api.tumblr.com/v2/blog/#{this.config.tumblr.baseHostname}/posts/photo?api_key=#{this.config.tumblr.apiKey}&offset=30"
		return url