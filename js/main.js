

//  Attach FastClick to remove the 300ms delay on sites where 
//  drag or long-touch detection is not needed: https://ftlabs.github.io/fastclick/
$(function() {
    FastClick.attach(document.body);
});



/* allow :active styles to work in your CSS on a page in Mobile Safari: 
because this was previously effected by this line in css:  -webkit-tap-highlight-color: rgba(0,0,0,0); */
document.addEventListener("touchstart", function(){}, true);



