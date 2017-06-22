var Controller = {
    musicRoute: function() {
        return Model.getMusic().then(function(music) {
            results.innerHTML = View.render('music', {list: music});
        });
    },
    friendsRoute: function() {
        return Model.getFriends().then(function(friends) {
             console.dir(friends);
            results.innerHTML = View.render('friends', {list: friends});
        });
    },
    friendsRequestsRoute: function() {
        return Model.getRequestsFriends().then(function(friends) {
             console.dir(friends &  8192);
            results.innerHTML = View.render('friendsRequests', {list: friends});
        });
    },
    newsRoute: function() {
        return Model.getNews().then(function(news) {
            console.log(news);
            results.innerHTML = View.render('news', {list: news});
            console.dir(jQuery(".content__main-text"));
            jQuery(".content__main-text").each(function(){
	var review_full = jQuery(this).html();
	var review = review_full;

	if( review.length > 1500 )
	{
		review = review.substring(0, 1500);
		jQuery(this).html( review + '<div class="read_more"> читать полностью &rarr;</div>' );
	}
	jQuery(this).append('<div class="full_text" style="display: none;">' + review_full + '</div>');
});

jQuery(".read_more").click(function(){
	jQuery(this).parent().html( jQuery(this).parent().find(".full_text").html() );
});
        });
    },
    groupsRoute: function() {
        return Model.getGroups().then(function(groups) {
            results.innerHTML = View.render('groups', {list: groups});
        });
    }
};
