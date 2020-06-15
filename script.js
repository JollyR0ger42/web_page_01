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
