function tabs(tabItems, tabContent, tabHeader, tabActive) {
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
			item.classList.remove(tabActive);
		});
	}

	function showTabContents(i = 0) {
		tabs[i].classList.add(tabActive);
		tabsContent[i].classList.add('show');
		tabsContent[i].classList.remove('hide');
	}

	tabsParent.addEventListener('click', (e)=> {

		const target = e.target;

		if (target && target.classList.contains(tabItems.slice(1))) {
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