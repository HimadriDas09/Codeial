// script tag for home page : for textarea
const form = document.getElementById('new-posts-form');
const textarea = document.getElementById('post-textarea');

textarea.addEventListener('keydown', function(event) {
    if(event.key == 'Enter' && !event.shiftKey) {
        event.preventDefault();
        form.submit();//submit the form when we click enter
    }
});
