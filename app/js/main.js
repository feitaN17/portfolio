// import Scrollbar from 'smooth-scrollbar'
import SmoothScroll from 'smooth-scroll'
import IMask from 'imask'

document.addEventListener('DOMContentLoaded', () => {
	// 111
	$(document).ready(function () {
		let list = $('.portfolio__list .portfolio__item')
		let numToShow = 2 //сколько показывать элементов
		let button = $('.portfolio__more')
		let numInList = list.length
		list.hide()
		if (numInList > numToShow) {
			button.show()
		}
		list.slice(0, numToShow).show()
		button.click(function () {
			let showing = list.filter(':visible').length
			list.slice(showing - 1, showing + numToShow).fadeIn()
			let nowShowing = list.filter(':visible').length
			if (nowShowing >= numInList) {
				button.hide()
			}
		})
	})
	// 111

	document.querySelectorAll('.phone-mask').forEach((e) => {
		const phoneMask = IMask(e, { mask: '+{7} (000)000-00-00' })
	})
	$(window).scroll(function () {
		let target = $(this).scrollTop()

		if (target == 0) {
			$('.up').removeClass('up--active')
		} else {
			$('.up').addClass('up--active')
		}
	})

	const scroll = new SmoothScroll('a[href*="#"]', {
		speed: 1500,
		speedAsDuration: true,
	})

	const elts = {
		text1: document.getElementById('text1'),
		text2: document.getElementById('text2'),
	}

	// The strings to morph between. You can change these to anything you want!
	const texts = ['Спасибо', 'за', 'просмотр', '❤️']

	// Controls the speed of morphing.
	const morphTime = 1
	const cooldownTime = 0.25

	let textIndex = texts.length - 1
	let time = new Date()
	let morph = 0
	let cooldown = cooldownTime

	elts.text1.textContent = texts[textIndex % texts.length]
	elts.text2.textContent = texts[(textIndex + 1) % texts.length]

	function doMorph() {
		morph -= cooldown
		cooldown = 0

		let fraction = morph / morphTime

		if (fraction > 1) {
			cooldown = cooldownTime
			fraction = 1
		}

		setMorph(fraction)
	}

	// A lot of the magic happens here, this is what applies the blur filter to the text.
	function setMorph(fraction) {
		// fraction = Math.cos(fraction * Math.PI) / -2 + .5;

		elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`
		elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`

		fraction = 1 - fraction
		elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`
		elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`

		elts.text1.textContent = texts[textIndex % texts.length]
		elts.text2.textContent = texts[(textIndex + 1) % texts.length]
	}

	function doCooldown() {
		morph = 0

		elts.text2.style.filter = ''
		elts.text2.style.opacity = '100%'

		elts.text1.style.filter = ''
		elts.text1.style.opacity = '0%'
	}

	// Animation loop, which is called every frame.
	function animate() {
		requestAnimationFrame(animate)

		let newTime = new Date()
		let shouldIncrementIndex = cooldown > 0
		let dt = (newTime - time) / 1000
		time = newTime

		cooldown -= dt

		if (cooldown <= 0) {
			if (shouldIncrementIndex) {
				textIndex++
			}

			doMorph()
		} else {
			doCooldown()
		}
	}

	// Start the animation.
	animate()

	SmoothScroll({
		// Время скролла 400 = 0.4 секунды
		animationTime: 800,
		// Размер шага в пикселях
		stepSize: 75,

		// Дополнительные настройки:

		// Ускорение
		accelerationDelta: 30,
		// Максимальное ускорение
		accelerationMax: 2,

		// Поддержка клавиатуры
		keyboardSupport: true,
		// Шаг скролла стрелками на клавиатуре в пикселях
		arrowScroll: 50,

		// Pulse (less tweakable)
		// ratio of "tail" to "acceleration"
		pulseAlgorithm: true,
		pulseScale: 4,
		pulseNormalize: 1,

		// Поддержка тачпада
		touchpadSupport: true,
	})
})
