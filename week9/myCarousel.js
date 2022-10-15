class Carousel {
    constructor(rootEl, imgData, interval) {
        this.rootEl = rootEl;
        this.imgData = imgData;
        this.interval = interval;

        this.render();
        this.getELements();
        this.cloneImg();

        this.init();

        this.addBtnListener();

        // this.autoPlay();
    }

    render() {
        let ulStr = '';
        let olStr = '';
        this.imgData.forEach((imgSrc, index) => {
            ulStr += `<li class="slider"><img src="${imgSrc}"></li>`;

            olStr += `<li class="${index === 0 ? 'active' : ''}"></li>`;
        });

        let htmlStr = `
                        <div class="carousel">
                            <ul class="imgBox clearfix">${ulStr}</ul>

                            <ol class="pointBox">${olStr}</ol>

                            <div class="leftRightTabs">
                                <a class="prev">&lt;</a>
                                <a class="next">&gt;</a>
                            </div>
                        </div>
        `;

        this.rootEl.innerHTML = htmlStr;
    }


    getELements() {
        this.carouselBox = this.rootEl.firstElementChild;
        this.ul = this.carouselBox.firstElementChild;
        this.ol = this.ul.nextElementSibling;
        this.ul_lis = this.ul.querySelectorAll('li');
        this.ol_lis = this.ol.querySelectorAll('li');
        this.rightBtn = this.carouselBox.lastElementChild.lastElementChild;
        this.leftBtn = this.carouselBox.lastElementChild.firstElementChild;
    }

    cloneImg() {
        const fistImgCopy = this.ul_lis[0].cloneNode(true);
        const lastImgCopy = this.ul_lis[this.ul_lis.length - 1].cloneNode(true);

        this.ul.style.width = `${(this.imgData.length + 2) * 100}%`;
        this.ul.appendChild(fistImgCopy);
        this.ul.insertBefore(lastImgCopy, this.ul_lis[0]);
    }

    init() {
        this.boxWidth = parseFloat(window.getComputedStyle(this.carouselBox).width);
        this.ul.style.left = -this.boxWidth + 'px';

        this.currentIndex = 1;  // 当张数，第一张本体图片。
    }

    autoPlay() {
        setInterval(() => {
            this.btnHandler();
        }, this.interval);
    }

    btnHandler(whichBtn = 'right') {
        this.transition(true);
        if (whichBtn === 'left') {
            this.resetIndex(1, this.imgData.length);
            this.currentIndex--;
        }
        this.updateCircles(this.currentIndex);

        if (whichBtn === 'right') {
            this.resetIndex(this.imgData.length, 1);
            this.currentIndex++;
        }

        this.move(this.currentIndex);
    }

    updateCircles(currentIndex) {
        this.ol_lis.forEach((circle, index) => {
            circle.className = '';

            index === currentIndex && circle.classList.add('active');
        });
    }

    resetIndex(currentIndex, targetIndex) {
        if (this.currentIndex === currentIndex) {
            this.updateCircles(targetIndex - 1);
            setTimeout(() => {
                this.currentIndex = targetIndex;
                this.transition(false);
                this.move(this.currentIndex);
            }, 500);
        }
    }

    transition(yes) {
        yes ? (this.ul.style.transition = 'all 0.5s ease') : (this.ul.style.transition = 'none');
    }

    move(i) {
        this.ul.style.left = -this.boxWidth * i + 'px';
    }

    addBtnListener() {
        // this.rightBtn.addEventListener('click', this.rightBtnHandler);

        this.carouselBox.lastElementChild.onclick = e => {
            const eTarget = e.target;
            if (eTarget.className === 'next') {
                this.btnHandler();
            }
            if (eTarget.className === 'prev') {
                this.btnHandler('left');
            }
        };
    };
}