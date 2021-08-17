function tabs(tabItems, tabContent, tabHeader) {
	// TABS

	const tabs						= document.querySelectorAll(tabItems),
			tabsContent				= document.querySelectorAll(tabContent),
			tabsParent				= document.querySelector(tabHeader);

	function hideTabsContents() {

		tabsContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show');
		});

		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');
		});
	}

	function showTabContents(i = 0) {
		tabs[i].classList.add('tabheader__item_active');
		tabsContent[i].classList.add('show');
		tabsContent[i].classList.remove('hide');
	}

	tabsParent.addEventListener('click', (e)=> {

		const target = e.target;

		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i)=> {
				if (target == item) {
					hideTabsContents();
					showTabContents(i);
				}
			});
		}
	});
	
	hideTabsContents();
	showTabContents();
}

export default tabs;