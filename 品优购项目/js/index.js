window.addEventListener('load', function () {
    // this.alert(1)
    var arrow_l = document.querySelector('.arrow-l')
    var arrow_r = document.querySelector('.arrow-r')
    var focus = document.querySelector('.focus')
    var focusWidth = focus.offsetWidth
    // 鼠标经过，显示按钮
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block'
        arrow_r.style.display = 'block'
        clearInterval(timer)
        timer = null  //清除定时器变量
    })
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none'
        arrow_r.style.display = 'none'
        timer = setInterval(function () {
            // 手动调用右侧按钮点击事件
            arrow_r.click()
        }, 2000)
    })

    var ul = focus.querySelector('ul')
    var ol = focus.querySelector('.circle')
    console.log(ul.children.length);
    for (var i = 0; i < ul.children.length; i++) {
        // 创建li，插入到ol
        // 记录当前圆圈的索引号，通过自定义属性来做
        var li = this.document.createElement('li')
        li.setAttribute('index', i)
        ol.appendChild(li)
        // 排他思想，将当前点击的li设置类名
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ''
            }
            this.className = 'current'

            // 点击圆圈，移动图片,ul的移动距离就是圆圈的索引号*图片宽度，负值
            // 点击某个li得到其索引号
            var index = this.getAttribute('index')
            // 点击了圆圈li，就要把索引号给num,circle
            num = index
            circle = index
            console.log(focusWidth);
            console.log(index);
            animate(ul, -index * focusWidth)

        })
    }
    // 把ol第一个li设置类名curren
    ol.children[0].className = 'current'

    // 克隆第一张图片放到最后
    var first = ul.children[0].cloneNode(true)
    ul.appendChild(first)
    // 点击右侧按钮，图片滚动
    var num = 0
    // circle控制圆圈播放
    var circle = 0
    // flag节流阀
    var flag = true
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false

            // 如果走到了最后复制的图片，此时，ul要立刻复原，left=0
            if (num == ul.children.length - 1) {
                ul.style.left = 0
                num = 0
            }
            num++
            animate(ul, -num * focusWidth, function () {
                flag = true
            })

            // 点击右侧按钮，圆圈一起变化
            circle++
            // 如果circ=4，说明走到最后克隆的这张图片,复原
            if (circle == ol.children.length) {
                circle = 0
            }
            circleChange()
        }
    })

    // 左侧按钮
    arrow_l.addEventListener('click', function () {

        if (num == 0) {
            num = ul.children.length - 1
            ul.style.left = -num * focusWidth + 'px'

        }
        num--
        animate(ul, -num * focusWidth)


        circle--

        if (circle < 0) {
            circle = ol.children.length - 1
        }
        circleChange()
    })
    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = ''
        }
        ol.children[circle].className = 'current'
    }

    // 自动播放轮播图,类似于点击右侧按钮
    var timer = this.setInterval(function () {
        // 手动调用右侧按钮点击事件
        arrow_r.click()
    }, 2000)
})