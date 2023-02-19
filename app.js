async function getDashboardData(url = '/data') {
    const response = await fetch(url);
    const data = await response.json();
    
    return data;
}

class dashboardItem {
    static PERIODS = {
        daily: 'day',
        weekly: 'week',
        monthly: 'month',
    }

    constructor(data, container = '.dashboard_content', view = 'weekly') {
        this.data = data;
        this.container = document.querySelector(container);
        this.view = view;

        this.createMarkup();
    }

    createMarkup() {
        const {title, timeframes} = this.data;

        const id = title.toLowerCase().replace(/ /g, '-');
        const {current, previous} = timeframes(this.view.toLowerCase());

        this.container.insertAdjacentHTML('beforeend', `
        <div class="dashboard__item dashboard__item--${id}">
        <article class="tracking-card">
          <header class="tracking-card__header">
            <h4 class="tracking-card__title">${title}</h4>
            <img class="tracking-card__menu" src="images/icon-ellipsis.svg" alt="">
          </header>
          <div class="tracking-card__body">
            <div class="tracking-card__time">
              ${current}hrs
            </div>
            <div class="tracking-card__prev-period">
              Last ${dashboardItem.PERIODS[this.view]} - ${previous}hrs
            </div>
          </div>
        </article>
      </div>
      `);

      this.time = this.container.querySelector(`.dashboard-item--${id} .tracking-card__time`);
      this.prev = this.container.querySelector(`.dashboard-item--${id} .tracking-card__prev-period`);  
    };
}

document.addEventListener('DOMContentLoaded', () => {
    getDashboardData()
        .then(data => {
            const activities = data.map(activity => new dashboardItem(activity));
        
        })

})