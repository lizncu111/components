const pieceBox = document.querySelectorAll(".piece-box")[0];
const container = document.querySelector(".container");
let pieces = document.querySelectorAll(".piece");
const tmp_pieces = []
for(let i=0;i<4;i++)
{
    tmp_pieces.push(pieces[i]);
}
pieces = tmp_pieces;
const card = document.querySelector(".card");
const pieceCount = pieces.length;
let forwardIndex = 0;
let timerId;
let active = true;
let x = 0;
let deg = 0;
const texts = ['<a>建立安全、便捷、开放的校园成长平台</a>', '<a>掌握储能核心技术，打造储能产业“中国芯”</a>', "<a>数字化移动营销解决方案和精准营销服务专家</a>", "<a>监管互动、分工合作、统一指挥、管理有序的城市管理新模式</a>"]

function initCuber(){
    bindEvents();
    startAutoPlay();
}

initCuber();

function changeForward(){
    
    if(x-(350/2) > 0){
        deg += 90;
        pieceBox.style.transform = `rotateY(${deg}deg)`;
        forwardIndex = forwardIndex-1;
        if(forwardIndex<0)forwardIndex = pieceCount-1;
    }
    if(x-(350/2) < 0){
        deg -= 90;
        pieceBox.style.transform = `rotateY(${deg}deg)`;
        forwardIndex = forwardIndex+1;
        if(forwardIndex>=pieceCount)forwardIndex = 0;
    }
    if(deg > 90*9999 || deg<-90*9999){
        deg = 0;
    }
    console.log(forwardIndex)
    cardView();
    resetAnimation();
}

function cardView(){
    card.innerHTML = `${texts[forwardIndex]}`;  
}
function resetAnimation() {
    card.classList.remove("card-letters-anime")
     //重新定位，因为动画只会在游览器第一次渲染时播放
    void card.offsetWidth;
    card.classList.add("card-letters-anime");
  }

function bindEvents() {
    for (let i = 0; i < pieceCount; i++) {
        (function(index) {
            pieces[index].addEventListener('click', function (e) {
                forwardIndex = index;
                clearInterval(timerId);
                timerId = -1;
                if (active) {
                    x = e.clientX - pieces[index].getBoundingClientRect().left;
                }
                changeForward();
                
            });
            container.addEventListener('mouseenter', function () {
                clearInterval(timerId);
                timerId = -1;
            });
            container.addEventListener('mouseout', function () {
                startAutoPlay();
            });
        })(i);
    }
}

function startAutoPlay() {
    if (timerId < 0) {
        timerId = setInterval(function () {
            changeForward();
        }, 2000);
    }
}
