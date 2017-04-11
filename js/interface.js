(function(){

  var state = "off";
  var stateTop = 0;
  var pane;

  var cards = document.querySelectorAll('.js-card');
  var pane1 = document.querySelector('.pane-1');
  var pane2 = document.querySelector('.pane-2');
  var label = document.querySelector('.card-options__label');
  var backBtn = document.querySelector('.js-back');

  cards.forEach(function(card){
    card.addEventListener('click', function(e){
      var type = this.dataset.type;
      setActive(type);
    });
  });

  backBtn.addEventListener('click', function(e){
    e.preventDefault();
    setNormal();
  });


  var setActive = function(type) {
    pane = document.querySelector('.pane-' + type);
    pane.classList.toggle('active');

    animate({
      el: pane1,
      translateX: -320,
      opacity: 0,
      duration: 175,
      easing: 'easeOutQuad'
    });
 
    animate({
      el: pane2,
      translateX: [320,0],
      opacity: [0, 1],
      duration: 225,
      delay: 75,
      easing: 'easeOutCirc'
    });
  };

  var setNormal = function() {
    pane.classList.toggle('active');

    animate({
      el: pane2,
      translateX: 320,
      opacity: [1, 0],
      duration: 175,
      easing: 'easeOutQuad'
    });
    animate({
      el: pane1,
      translateX: [-320, 0],
      opacity: 1,
      duration: 175,
      delay: 75,
      easing: 'easeOutQuad'
    });
  };

})();