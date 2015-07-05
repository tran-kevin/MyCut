MyCut.Views.ShowShop = Backbone.CompositeView.extend({
  template: JST['shops/show_shop'],

  // events: {
  //   "click .shop-map-button": "openMapModal"
  // },

  initialize: function(){
    this.listenTo(this.model, "sync change", this.render);
    this.listenTo(this.model.reviews(), "add", this.addReviewSubview);
    this.listenTo(this.model.reviews(), "remove", this.removeReviewSubview);
    this.model.reviews().each(this.addReviewSubview.bind(this));
    // this.addMapModal();
  },

  addReviewSubview: function(review) {
    var reviewSubview = new MyCut.Views.ReviewIndexItem({
      model: review,
      author: review.author
    })
    this.addSubview('.review-items', reviewSubview, false);
  },

  addMapModal: function(){
    
    this.shopMap = new MyCut.Views.ShopMapModal({ model: this.model });
    $('body').append(this.shopMap.render().$el)
  },

  openMapModal: function(){
    this.shopMap.$el.show();
  },

  removeReviewSubview: function(review) {
    this.removeModelSubview('.review-items', review);
  },
  render: function(){
    var barbers = this.model.barbers();
    var cityStateZip = this.model.get('city') + ", " +
                       this.model.get("state") + " " +
                       this.model.get("zip");

    var renderedContent = this.template({
      mod_id: window.id,
      shop: this.model,
      barbers: barbers,
      cityStateZip: cityStateZip
    });
    this.$el.html(renderedContent)
    this.attachSubviews();
    this.$el.find('.shop.rating').raty({
      score: this.model.attributes.average_rating,
      path: 'assets/raty'
      })
    return this;
  }
});
