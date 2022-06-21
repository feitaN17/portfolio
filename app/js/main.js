document.addEventListener('DOMContentLoaded', () => {
  const burgerBtn = document.querySelector('.burger-btn')
  const burgerMenu = document.querySelector('.burger-menu')
  const overlay = document.querySelector('.overlay')
  burgerBtn.addEventListener('click', () => {
    if (!burgerMenu.classList.contains('burger-menu--active')) {
      document.querySelector('html').style.overflowY = 'hidden'
    } else {
      console.log(1)
      document.querySelector('html').style.overflowY = 'auto'
    }
    burgerMenu.classList.toggle('burger-menu--active')
    burgerBtn.classList.toggle('burger-btn--active')
    overlay.classList.toggle('overlay--active')
  })
  overlay.addEventListener('click', () => {
    burgerMenu.classList.remove('burger-menu--active')
    burgerBtn.classList.remove('burger-btn--active')
    overlay.classList.remove('overlay--active')
    document.querySelector('html').style.overflowY = 'auto'
  })
})
