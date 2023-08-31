let pokeball = document.querySelector('#pokeball');
let sideMenu = document.querySelector('.filters');
let exitMenu = document.querySelector('.exitFilters');
let loadMore = document.querySelector('.expand_more');

pokeball.addEventListener('click', () => {
    sideMenu.classList.toggle('hidden')
})

exitMenu.addEventListener('click', () => {
    sideMenu.classList.toggle('hidden')
})