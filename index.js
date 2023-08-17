window.onload = function () {
    // 元素获取
    const canvas = document.querySelector("canvas")
    const ctx = canvas.getContext("2d");
    const canvasIn = document.createElement('canvas');
    canvasIn.width = window.innerWidth;
    canvasIn.height = window.innerHeight;
    const inCtx = canvasIn.getContext("2d")
    // 设定画布大小
    function resizeCanvas() {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    }
    resizeCanvas();
    // 页面缩放改变画布大小
    window.addEventListener("resize", resizeCanvas)
    // 清屏
    function clearCanvas() {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    // 烟花
    let fireworks = [];
    let fireworks2 = [];
    let fireworks3 = [];
    let fireworks4 = [];
    setInterval(() => {
        //可以多调用几次用来增加烟花的数量
        addFires2(Math.random() * canvas.width, Math.random() * canvas.height, 1);
        // addFires2(Math.random() * canvas.width, Math.random() * canvas.height);
    }, 1000);
    // 获取鼠标点击位置
    function clickSite(e) {
        // 获取当前鼠标的坐标
        let x = e.clientX;
        let y = e.clientY;
        // 绘制
        let type = Math.floor(Math.random() * 12 + 1)
        if (type >= 9){
            addFires2(x, y, 3);
        }else{
            addFires2(x, y, 4);
        }
        // addFires4(x,y);
    }
    document.addEventListener('click', clickSite);

    function addFires2(x,y,type){
        // 爆炸扩散的半径
        // 定制颜色，这是通过色域方式定义的
        let hue = Math.random() * 360;
        let hueVariance = 60;
        function setColors(firework) {
            firework.hue = Math.floor(Math.random() * ((hue + hueVariance) - (hue - hueVariance))) + (hue - hueVariance);
            firework.brightness = Math.floor(Math.random() * 21) + 30;
            firework.alpha = (Math.floor(Math.random() * 60) + 40) / 100;
        }

        let firework = {};
        firework.type = type;
        firework.x = x;
        firework.y = canvasIn.height;
        firework.end = y;
        firework.size = 2;
        firework.speed = Math.random() * 5 + .4;
        setColors(firework)
        fireworks2.push(firework)
    }

    function addFires3(x, y) {
        // 填充字体样式
        let font = 150
        ctx.font = font + "px '微软雅黑'"
        ctx.fillStyle = "#000001"
        // 内容
        let text = '帅波'
        // 获取字体的宽度
        let textWidth = ctx.measureText(text).width
        // 在左上角填充字体
        ctx.fillText(text, 0, font)
        // 当成图片来获取
        let imgData = ctx.getImageData(0, 0, textWidth, font * 1.2)
        console.log(imgData);
        clearCanvas()
        // ctx.fillStyle = "#000"
        // // 清画布
        // ctx.fillRect(0, 0, canvas.width, canvas.height);
        // 重新渲染
        // 爆炸扩散的半径
        // 定制颜色，这是通过色域方式定义的
        let hue = Math.random() * 360;
        let hueVariance = 60;

        function setColors(firework) {
            firework.hue = Math.floor(Math.random() * ((hue + hueVariance) - (hue - hueVariance))) + (hue - hueVariance);
            firework.brightness = Math.floor(Math.random() * 21) + 50;
            firework.alpha = (Math.floor(Math.random() * 60) + 40) / 100;
        }
        for (let h = 0; h < font * 1.2; h += 6) {
            for (let w = 0; w < textWidth; w += 6) {
                let position = (textWidth * h + w) * 4;
                // 返回的数组是rgba的方式存储
                let r = imgData.data[position],
                    g = imgData.data[position + 1],
                    b = imgData.data[position + 2],
                    a = imgData.data[position + 3];
                if (r + g + b == 0) {
                    continue
                }
//                 let fx = x+ w-textWidth/2;
//                 let fy = y +h -font/2
// ctx.fillStyle ='#ffffff'
// ctx.fillRect(fx,fy,1,1)

                let firework = {};
                firework.x = x;
                firework.y = y;
                firework.end = y;
                firework.fx = x + w - textWidth / 2;
                firework.fy = y + h - font / 2;
                firework.size = Math.floor(Math.random() * 2) + 1;
                firework.speed = 1;
                setColors(firework);
                fireworks3.push(firework);
            }
        }
    }

    function addFires4(x, y) {
        let img1 = new Image();
        img1.src = Math.floor(Math.random() * 8 + 1) + '.jpg'
        // 一定要在图片加载完后再获取
        img1.onload = function () {
            let imgWidth = 400
            let imgHeight = 400
            inCtx.drawImage(img1, 0, 0, imgWidth, imgHeight)
            let imgData = inCtx.getImageData(0, 0, imgWidth, imgHeight)
            clearCanvas()
            for (let h = 0; h < imgHeight; h += 8) {
                for (let w = 0; w < imgWidth; w += 8) {
                    let position = (imgWidth * h + w) * 4;
                    // 返回的数组是rgba的方式存储
                    let r = imgData.data[position],
                        g = imgData.data[position + 1],
                        b = imgData.data[position + 2],
                        a = imgData.data[position + 3];
                    if (r + g + b == 0) {
                        continue;
                    }
                    let firework = {};
                    firework.x = x;
                    firework.y = y;
                    firework.fx = x + w - imgWidth / 2;
                    firework.fy = y + h - imgHeight / 2;
                    firework.size = 1; // Math.floor(Math.random() * 2) + 1
                    firework.speed = 5;
                    firework.alpha = 1;
                    firework.r = r;
                    firework.g = g;
                    firework.b = b;
                    firework.color = "rgba(" + r + "," + g + "," + b + "," + a + ")";
                    fireworks4.push(firework);
                }
            }
        }
        // 当成图片来获取
    }

    // 将单个烟花保存到烟花数组中
    function addFires(x, y) {
        // 烟花爆开的粒子数量
        let count = 100;
        // 爆炸扩散的半径
        // 定制颜色，这是通过色域方式定义的
        let hue = Math.random() * 360;
        let hueVariance = 60;
        function setColors(firework) {
            firework.hue = Math.floor(Math.random() * ((hue + hueVariance) - (hue - hueVariance))) + (hue - hueVariance);
            firework.brightness = Math.floor(Math.random() * 21) + 50;
            firework.alpha = (Math.floor(Math.random() * 60) + 40) / 100;
        }
        for (let i = 0; i < count; i++) {
            // 使粒子均匀分开一个角度，例如第一个粒子就占一份的均分角
            let angle = 360 / count * i;
            // 通过角度计算弧度
            let radians = angle * Math.PI / 180;
            // 将单个烟花信息保存到数组
            let firework = {};
            firework.x = x;
            firework.y = y;
            firework.radians = radians;
            firework.size = 2;
            // 各个粒子随机速度
            firework.speed = Math.random() * 5 + .4;
            firework.radius = firework.speed;
            // 设置颜色
            setColors(firework)
            // 加入数组
            fireworks.push(firework);
        }
    }
    // 绘制烟花
    function drawFires() {
        // 清屏
        clearCanvas();
        for (let i = 0; i < fireworks.length; i++) {
            // 渲染出当前数据
            let firework = fireworks[i];
            // 下面是点数学题
            // moveX，moveY是粒子开始的坐标，画个三角形，角度半径知道很容易就得出方程
            let moveX = Math.cos(firework.radians) * firework.radius;
            let moveY = Math.sin(firework.radians) * firework.radius + 1;
            firework.x += moveX;
            firework.y += moveY;
            // 更新数据,让圆扩散开来
            firework.radius *= 1 - firework.speed / 120
            firework.alpha -= 0.01;
            // 如果透明度小于0就删除这个粒子
            if (firework.alpha <= 0) {
                fireworks.splice(i, 1);
                // 跳过这次循环，不进行绘制
                continue;
            }
            // 开始路径
            ctx.beginPath();
            ctx.arc(firework.x, firework.y, firework.size, Math.PI * 2, false);
            // 结束
            ctx.closePath();
            ctx.fillStyle = 'hsla(' + firework.hue + ',100%,' + firework.brightness + '%,' + firework.alpha + ')';
            ctx.fill();
        }
        for (let i = 0; i < fireworks2.length; i++) {
            // 渲染出当前数据
            let firework = fireworks2[i];
            // 下面是点数学题
            let moveY = firework.speed;
            firework.y -= moveY;
            // 如果透明度小于0就删除这个粒子
            if (firework.end >= firework.y) {
                fireworks2.splice(i, 1);
                if (firework.type === 1){
                    addFires(firework.x,firework.end);
                }else if (firework.type === 3){
                    addFires3(firework.x, firework.end);
                }else if (firework.type === 4){
                    addFires4(firework.x, firework.end);
                }

                // 跳过这次循环，不进行绘制
                continue;
            }
            // 开始路径
            ctx.beginPath();
            ctx.arc(firework.x, firework.y, firework.size, Math.PI * 2, false);
            // 结束
            ctx.closePath();
            ctx.fillStyle = 'hsla(' + firework.hue + ',100%,' + firework.brightness + '%,' + firework.alpha + ')';
            ctx.fill();
        }
        for (let i = 0; i < fireworks3.length; i++) {
            // 渲染出当前数据
            let firework = fireworks3[i];
            // 下面是点数学题
            firework.x += (firework.fx - firework.x) / 10;
            firework.y += (firework.fy - firework.y) / 10 - (firework.alpha - 1) * firework.speed;
            firework.alpha -= 0.01;
            // 如果透明度小于0就删除这个粒子
            if (firework.alpha <= 0) {
                fireworks3.splice(i, 1);
                // 跳过这次循环，不进行绘制
                continue;
            }
            // 开始路径
            ctx.beginPath();
            ctx.arc(firework.x, firework.y, firework.size, Math.PI * 2, false);
            // 结束
            ctx.closePath();
            ctx.fillStyle = 'hsla(' + firework.hue + ',100%,' + firework.brightness + '%,' + firework.alpha + ')';
            ctx.fill();
        }
        for (let i = 0; i < fireworks4.length; i++) {
            // 渲染出当前数据
            let firework = fireworks4[i];
            // 下面是点数学题
            firework.x += (firework.fx - firework.x) / 10;
            firework.y += (firework.fy - firework.y) / 10 - (firework.alpha - 1.8) * firework.speed;
            firework.alpha -= 0.02;
            // 如果透明度小于0就删除这个粒子
            if (firework.alpha <= 0) {
                fireworks4.splice(i, 1);
                // 跳过这次循环，不进行绘制
                continue;
            }
            // 开始路径
            ctx.beginPath();
            ctx.arc(firework.x, firework.y, firework.size, Math.PI * 2, false);
            // 结束
            ctx.closePath();
            ctx.fillStyle = "rgba(" + firework.r + "," + firework.g + "," + firework.b + "," + firework.alpha + ")"
            ctx.fill();
        }
    }
    // 渲染,更新粒子的信息
    function tick() {
        // 设置拖影
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0,0,0,' + 10 / 100 + ')';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'lighter';
        // 更新画布
        drawFires();

        requestAnimationFrame(tick);
    }
    tick()
}