function whenImagesLoaded(images) {
  return Promise.all(images.map((image) => {
    return new Promise((fulfill, reject) => {
      // Listener should be removed
      image.addEventListener('load', function() {
        fulfill();
      }, true);

      image.addEventListener('error', function() {
        reject();
      }, true);
    });
  }));
}

function PageView(){
  var self        = this;
  self.products   = [];

  self.getProducts = function(url) {
    return $.getJSON(url, function(response) {
        for(i=0; i<response.sales.length ; i++) {
          self.products.push( new Product(response.sales[i])  );
        }
    });
  }

  self.updateProductHTML = function(template) {
    for( i=0; i< self.products.length ; i++) {
      self.products[i].updateHTML(template);
    }
  }

  self.updateDOM = function() {
    var i=0
    html ='';
    for( i=0; i< self.products.length ; i++) {
      if (i % 3 == 0 ) {
        html += "<div class='row'>";
        console.log("START");
      }
      html += self.products[i].htmlView;
      if ((i % 3 == 2) || i == (self.products.length-1) ) {
        html += "</div>";
        console.log("FINISH");
      }
    }
    $("#content").append(html)
  }

}

function Product(product) {
  var self          = this;
  self.photo        = product.photos.medium_half
  self.title        = product.name
  self.tagline      = product.tagline
  self.url          = product.url
  self.description  = product.description
  self.htmlView     = ""

  // Removed custom column classes. Flex box from bootstrap aligns columns.
  self.updateHTML = function(template) {
    self.htmlView = template
      .replace('{image}', self.photo)
      .replace('{title}', self.title)
      .replace('{tagline}', self.tagline)
      .replace('{url}', self.url)
      .replace('{custom_class}', self.custom_class)
      .replace('{description}', self.description);
  }
}

var page = new PageView();
// Use promises to chain async events. Refactored this first because
// nothing was showing up in my browser due to race conditions
$.when(page.getProducts('data.json'), $.get('product-template.html'))
  .then(function(_, template) {
    console.log('building html');
    page.updateProductHTML(template[0]);
    page.updateDOM()

    $('#content').on('click', '.dismiss-btn', function() {
      event.preventDefault();
      $(event.target)
        .closest('.product-container')
        .addClass('product-removed');
    });

    // Hide loading screen when images are loaded
    // Prefix class with 'js' so it's clear in markup it's a hook
    var images = $('.js-product-image').toArray();
    whenImagesLoaded(images).then(
      // success
      () => {
        console.log('images loaded');
        $('body').addClass('loaded');
      },
      // This error cb might execute before all promises resolve
      // Show page so user can interact even for failed loads
      () => {
        $('body').removeClass('loaded');
      }
    );
  });
