



//  Attach FastClick to remove the 300ms delay on sites where 
//  drag or long-touch detection is not needed: https://ftlabs.github.io/fastclick/
$(function() {
    FastClick.attach(document.body);
});
// OR, if no jQuery:   
// window.addEventListener('load', function() {
//     new FastClick(document.body);
// }, false);


 $(function() {
  // detect if we support scroll snap or not (not the best but should work)
  var scrollSnap = false;
  scrollSnap = 'webkitScrollSnapType' in document.documentElement.style;
  scrollSnap = 'scrollSnapType' in document.documentElement.style;

  if (scrollSnap === true) {
    $('#supports').append('<h3 class="success">It looks like your browser does support scroll snap!</h3>');
  } else {
    $('#supports').append('<h3 class="failure">It looks like your browser might not support scroll snap properties</h3>');
  }
});

/* allow :active styles to work in your CSS on a page in Mobile Safari: 
because this was previously effected by this line in css:  -webkit-tap-highlight-color: rgba(0,0,0,0); */
document.addEventListener("touchstart", function(){}, true);



