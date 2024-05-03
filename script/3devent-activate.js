
$('.my-flipster').flipster({
    loop: true
}); 

$('.my-flipster').flipster('jump', 0);//goes to first image on page load

setInterval(function() {
    $('.my-flipster').flipster('next');
}, 3000);
