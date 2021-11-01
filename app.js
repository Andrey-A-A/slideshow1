const upBtn = document.querySelector('.up-button') //кнопка вверх
const downBtn = document.querySelector('.down-button') //кнопка вниз
const sidebar = document.querySelector('.sidebar') // весь div sidebar
const mainSlide = document.querySelector('.main-slide') //div который содержит дивы с картинками
const slideCount = mainSlide.querySelectorAll('div').length //получаем длину массива mainSlide, состоящего из некоторого количества дивов, в нашем случае 4 дива 
let container = document.querySelector('div.container') 
let activeSlideIndex = 0 // это номер активного слайда, по умолчанию равное нулю

//sidebar.style.top = `-300vh`  //сместили наш сайдбар на 3 экрана, чтобы получить соответствие поцвету с картинкой
//sidebar.style.top = `-${3*100}vh` // то же самое, но в цифровом варианте
sidebar.style.top = `-${(slideCount - 1)*100}vh`

upBtn.addEventListener('click', () => {
	changeSlide('up')
})

downBtn.addEventListener('click', () => {
	changeSlide('down')
})

//добавим возможность перемещат слайды не только мышкой, но и клавишами
document.addEventListener('keydown', event => {
	//console.log(event.key) //в консоли выдает код нажатой кнопки на клавиатуре, при этом нажимая на стрелку вверх на клавиатуре получаем ArrowUp, стрелка вниз соответсвует коду ArrowDown. Используем эти коды
	if (event.key === 'ArrowUp') {
		changeSlide('up')
	}else if(event.key === 'ArrowDown') {
		changeSlide('down')
	}
})

//функция отвечающая за смещение слайдера
function changeSlide(direction) { //передаем параметром direction - направление смещения слайдера вверх или вниз
	if (direction === 'up') {
		activeSlideIndex++ //к текущему номеру слайда прибавляем 1
		if (activeSlideIndex === slideCount) { //если текущий индекс слайда равен количеству слайдов (в нашем случае 4), то индекс уже превысил максимально допустимый, так как индексы начинаются с 0, то есть это уже как бы 5 элемент.
		//поэтому нужно индекс обнулить, как бы зациклить, то есть сменять слайды при нажатии кнопки up начнем сначала
			activeSlideIndex = 0
		}
	} else if (direction === 'down') { //если опускаем, то индекс уменьшается
		activeSlideIndex--
		if (activeSlideIndex < 0) { //но индекс текущего дива находится в интервале от 0 до 3, поэтому если текущий индекс равен 0 и мы нажимаек кнопку down, то надо зациклить это дело
			activeSlideIndex = slideCount - 1
		}
	}

	//теперь анимируем наш слайдер

	const height = container.clientHeight //Свойство clientHeight содержит высоту элемента внутри границ вместе с padding, но без border и прокрутки).
	
	//нам нужно при нажатии на кнопку сместить картинку на один экран величина эта получится из индекса слайда activeSlideIndex умноженного на высоту контейнера height
	//mainSlide.style.transform = `translateY(-1000px)`
	mainSlide.style.transform = `translateY(-${activeSlideIndex * height}px)`

	//также будем одновременно смещать сайдбар в противоположную сторону
	sidebar.style.transform = `translateY(${activeSlideIndex * height}px)` //соответственно минус убираем
}