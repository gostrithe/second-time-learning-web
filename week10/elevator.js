/* 
      非月考题
      手封侧边栏/电梯组件：实现楼层配置 + 双向联动
      最后一格是回到顶部 
      滚动页面时，对应楼层高亮
      点击楼层，页面自动滚动到该楼层，使之顶格显示
      */
function fn14X() {
    class Elevator {
        constructor(confArr) {
            this.confArr = confArr;

            this.render();
            this.ul = document.querySelector('.elevatorBox>ul');

            this.setLisDataN();
            this.addEventListener();
            this.windowScrollEvent();
        }

        render() {
            const confArr = this.confArr;
            let lisStr = '';

            confArr.forEach(obj => {
                lisStr += `<li>${obj.name}</li>`;
            });

            let htmlStr = `
                            <div class="elevatorBox">
                                <ul>
                                    ${lisStr}
                                </ul>
                            </div>
                            `;

            document.body.innerHTML += htmlStr;
        }

        getFloorElements() {
            this.floorElements = [];
            this.confArr.forEach(obj => {
                this.floorElements.push(document.querySelector(obj.domSelector));
            });
        }

        setLisDataN() {
            this.getFloorElements();
            this.lis = document.querySelectorAll('.elevatorBox li');
            this.lis.forEach((li, index) => {
                li.setAttribute('data-n', this.floorElements[index].id);
            });
        }

        addEventListener() {
            this.ul.onclick = e => {
                if (e.target.nodeName === 'LI') {
                    this.floorElements.forEach(floor => {
                        if (floor.id === e.target.getAttribute('data-n')) {
                            let timer = setInterval(() => {
                                if (document.documentElement.scrollTop < floor.offsetTop) {
                                    document.documentElement.scrollTop += 77;

                                    if (document.documentElement.scrollTop >= floor.offsetTop) {
                                        clearInterval(timer);
                                        document.documentElement.scrollTop = floor.offsetTop;
                                    }
                                } else {
                                    document.documentElement.scrollTop -= 77;
                                    if (document.documentElement.scrollTop <= floor.offsetTop) {
                                        clearInterval(timer);
                                        document.documentElement.scrollTop = floor.offsetTop;
                                    }
                                }
                            }, 40);
                        }
                    });
                }
            };
        }

        windowScrollEvent() {
            const floorArr = []; //4
            this.floorElements.forEach((floor, index) => {
                floorArr[index] = floor.offsetTop;
            });
            window.onscroll = (e) => {
                floorArr.forEach((offsetTop, index) => {
                    if (window.scrollY >= offsetTop) {
                        this.lis.forEach(li => {
                            li.classList.remove('current');
                        });
                        this.lis[index].classList.add('current');
                    }
                });

            };
        }
    }



    new Elevator([
        { name: "楼层1", domSelector: "#floor1" },
        { name: "楼层2", domSelector: "#floor2" },
        { name: "楼层3", domSelector: "#floor3" },
        { name: "楼层4", domSelector: "#floor4" },
    ]);
}
fn14X();