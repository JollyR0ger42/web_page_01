const filters = document.getElementsByClassName('filters')[0].children;
const latestWorks = document.getElementsByClassName('latest-works')[0].children;

function filterWorks(category){
	if(category === 'all'){
		for(let work of latestWorks){
			work.style.display = 'flex'
		}
	}
	else {
		for(let work of latestWorks){
			if(work.classList.contains(category)){
				work.style.display = 'flex'
			} else {
				work.style.display = 'none'
			}
		}
	}
}

for(let el of filters){
	el.addEventListener('click', (event) => {
		document.getElementsByClassName('active-filter')[0].classList.remove('active-filter')
		const category = event.target.classList[0]
		filterWorks(category)
		event.target.classList.add('active-filter')
	})
}


function paginate(collection, len){
	const result = [];
	for(let i = 0; i < collection.length; i += len){
		result.push(Array.prototype.slice.call(collection, i, i+len))
	}
	return result
}

function showPage(cardsArray, pageNumber){
	cardsArray.forEach((page, index) => {
		if(index === pageNumber){
			page.forEach(card => {
				card.classList.remove('display-hidden')
			})
		} else {
			page.forEach(card => {
				card.classList.add('display-hidden')
			})
		}
	})
}

function createDots(dotsElement, amount){
	const dot = dotsElement.children[0];
	const dotsArray = [];
	dot.remove()

	for(let i = 0; i < amount; i++){
		let newDot = dot.cloneNode(true);
		newDot.setAttribute('data-page', i)
		dotsElement.appendChild(newDot)
		dotsArray.push(newDot)
	}
	dotsArray[0].classList.add('active-dot')
	return dotsArray
}

function carousel({target, cardsInBlock, dotsClass}){
	const cardsCollection = document.getElementsByClassName(target)[0].children;
	const dotsElement = document.getElementsByClassName(dotsClass)[0];

	const cardsArray = paginate(cardsCollection, cardsInBlock);
	const dotsArray = createDots(dotsElement, cardsArray.length);

	showPage(cardsArray, 0)
	dotsArray.forEach(dot => {
		dot.addEventListener('click', event => {
			dotsArray.forEach(dot => dot.classList.remove('active-dot'))
			event.target.classList.add('active-dot')
			let page = parseInt(event.target.getAttribute('data-page'));
			showPage(cardsArray, page)
		})
	})
}

carousel({target: 'team', cardsInBlock: 3, dotsClass: 'nav-dots'})