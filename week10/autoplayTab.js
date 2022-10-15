class autoplayTab {
    constructor(el, conf) {
        this.el = el;
        this.conf = conf;

        this.render();
        this.firstUl = document.querySelector('.tabBox>ul:first-child');
        this.lastUl = document.querySelector('.tabBox>ul:last-child');

        this.addEventListener();

        this.currentNum = 0;
        this.timer = null;
        this.autoplay();
    }

    render() {
        let htmlStr = '<div class="tabBox">';

        this.conf.forEach((item, index) => {
            htmlStr += '<ul class="clearfix">';
            item.forEach(item => {
                htmlStr += `<li>${index === 0 ? item : `<img src="${item}"></img>`}</li>`;
            });
            htmlStr += '</ul>';
        });

        htmlStr += '</div>';

        this.el.innerHTML = htmlStr;
    }

    addEventListener() {
        this.imgLis = this.lastUl.querySelectorAll('li');
        const imgLis = this.imgLis;

        this.conf[0].forEach((eTag, index) => {
            imgLis[index].setAttribute('cxk', eTag);
        });

        this.firstUl.addEventListener('click', e => {
            if (e.target.nodeName === 'LI') {
                this.removeActive();
                e.target.classList.add('active');

                imgLis.forEach(imgli => {
                    imgli.style.opacity = 0;
                    if (imgli.getAttribute('cxk') === e.target.innerText) {
                        imgli.style.opacity = 1;
                    }
                });
            }
        });

        this.el.onmouseover = () => {
            this.stopAutoplay();
        };

        this.el.onmouseout = () => {
            this.autoplay();
        };
    }

    removeActive() {
        this.lis = this.firstUl.querySelectorAll('li');
        this.lis.forEach(li => {
            li.classList.remove('active');
        });
    }

    autoplay() {
        this.stopAutoplay();
        this.timer = setInterval(() => {
            this.removeActive();
            this.lis[this.currentNum].classList.add('active');

            this.imgLis.forEach(imgli => {
                imgli.style.opacity = 0;
            });
            this.imgLis[this.currentNum].style.opacity = 1;
            this.currentNum++;

            if (this.currentNum === this.lis.length) {
                this.currentNum = 0;
            }
        }, 1000);
    }

    stopAutoplay() {
        clearInterval(this.timer);
    }
}


const box = document.querySelector('.box');
const conf = [
    ['唱', '跳', 'rap', '篮球'],
    ["../img/唱.jpeg", "../img/跳.jpeg", "../img/rap.jpeg", "../img/篮球.jpeg"]
];
new autoplayTab(box, conf);