<template>
    <canvas id="relation" width='800' height='600'>
    </canvas>
</template>

<script>
    export default {
        name: 'relation',
        data() {
            return {
                data: [
                    
                ],

                mouseX: '',
                mouseY: '',
                array: [],
                colorArray: [
                    '#C23531',
                    '#409EFF',
                    '#E4B160'
                ],
                drag: '',
                onmove: false,
                gx:''


            }
        },
        components: {

        },
        created() { },
        mounted() {
            this.initData();
            this.initCanvas();
            this.getMouse();
        },



        methods: {
            //add mouse listener
            getMouse: function () {
                let canvas = document.getElementById('relation')
                let pen = canvas.getContext('2d');
                canvas.addEventListener('mousedown', this.clickPoint)
                canvas.addEventListener('mousemove', this.move);
                canvas.addEventListener('mouseup', this.end)
            },

            clickPoint(e) {
                this.mouseX = e.offsetX;
                this.mouseY = e.offsetY;
                this.check(e.offsetX, e.offsetY)
            },

            move(e) {
                let i = this.drag;
                this.mx = e.offsetX;
                this.my = e.offsetY;

                let canvas = document.getElementById('relation')
                let pen = canvas.getContext('2d');
                if (this.onmove) {
                    if (i) {
                        //define checked circle new data
                        let dx=this.mx-this.data[i].x;
                        let dy=this.my-this.data[i].y;
                        this.data[i].x = this.mx;
                        this.data[i].y = this.my
                        // this.calData(i,dx,dy);
                        // this.gx = setInterval(this.gxElement(i,dx,dy), 10)

                        //redraw map
                        pen.clearRect(0, 0, canvas.width, canvas.height)
                        for (let j = 0; j < this.data.length; j++) {
                            this.ball(this.data[j].x, this.data[j].y, this.data[j].r, this.data[j].color, pen, canvas)
                            if (j + 1 < this.data.length) {
                                this.line(this.data[j].x, this.data[j].y, this.data[j + 1].x, this.data[j + 1].y, pen, canvas);
                            }
                        }
                    }
                }
            },

            pyElement:function(i,dx,dy){

            },

            gxElement:function(i,dx,dy){
                let spX=dx*0.95;
                let spY=dy*0.95;
                this.data[i].x+=spX;
                this.data[i].y+=spY;
                if(Math.abs(spX)<1)spX=0;
                if(Math.abs(spY)<1)spY=0;
                if(spX==0&&spY==0){
                    clearInterval(this.gxElement)
                }
            },


            calData:function(index,dx,dy){               
                for(let i=0;i<this.data.length;i++){
                   if(i!=index){
                        let a=Math.abs(i-index)*1.5                      
                        this.data[i].x=this.data[i].x+dx/a
                        this.data[i].y=this.data[i].y+dy/a
                    }
                }                            
            },

            //check mouse in circle
            check(dx, dy) {
                this.onmove = true;
                for (let i = 0; i < this.data.length; i++) {
                    if (this.mouseX - this.data[i].x < this.data[i].r && this.mouseX - this.data[i].x > -this.data[i].r  && this.mouseY - this.data[i].y < this.data[i].r  && this.mouseY - this.data[i].y > -this.data[i].r ) {
                        this.drag = i    //location which circle
                    }
                }
            },
           
           //mouse up stop animation
            end(e) {
                let i = this.drag;
                this.mx = e.offsetX;
                this.my = e.offsetY;
                let dx=this.mx-this.data[i].x;
                let dy=this.my-this.data[i].y;

                let canvas = document.getElementById('relation')
                let pen = canvas.getContext('2d');
                if (i) {
                    //fall back animation
                    this.data[i].x = this.mx - this.data[i].r * 5;
                    this.data[i].y = this.my - this.data[i].r * 5
                    pen.clearRect(0, 0, canvas.width, canvas.height)
                    for (let j = 0; j < this.data.length; j++) {
                        this.ball(this.data[j].x, this.data[j].y, this.data[j].r, this.data[j].color, pen, canvas)
                        if (j + 1 < this.data.length) {
                            this.line(this.data[j].x, this.data[j].y, this.data[j + 1].x, this.data[j + 1].y, pen, canvas);
                        }
                    }
                    
                }
                this.onmove = false;
                this.drag = ''
            },

            initCanvas: function () {
                let canvas = document.getElementById('relation')
                let ctx = canvas.getContext('2d');
                this.drawMap(ctx, canvas);
            },

            drawMap: function (pen, canvas) {
                for (let i = 0; i < this.data.length; i++) {
                    this.ball(this.data[i].x, this.data[i].y, this.data[i].r, this.data[i].color, pen, canvas);
                    if (i + 1 < this.data.length) {
                        this.line(this.data[i].x, this.data[i].y, this.data[i + 1].x, this.data[i + 1].y, pen, canvas);
                    }
                }
            },


            //draw line
            line: function (fx, fy, tx, ty, pen, canvas) {
                pen.beginPath();
                pen.moveTo(fx, fy);
                pen.lineTo(tx, ty);
                pen.strokeStyle = 'red';
                pen.stroke();
            },

            //draw circle
            ball: function (x, y, r, color, pen, canvas) {
                pen.beginPath();
                pen.strokeStyle = color;
                pen.moveTo(x, y)
                pen.arc(x, y, r, 0, Math.PI * 2, true);
                pen.stroke();
                pen.fillStyle = color;
                pen.fill();
            },


            initData: function () {
                for (let i = 0; i < 15; i++) {
                    let canvas = document.getElementById('relation')
                    let pen = canvas.getContext('2d');
                    let element = {};
                    element.x = Math.random() * canvas.width;
                    element.y = Math.random() * canvas.height;
                    element.speedX = (Math.random() - 0.5) * 10;
                    element.speedY = (Math.random() - 0.5) * 10;
                    element.r = Math.random() * 15;
                    element.color = this.colorArray[Math.floor(Math.random() * 3)]
                    this.data.push(element)
                }
            },

        },

        watch: {}
    }
</script>

<style scoped lang="scss">

    #relation {
        border: 1px solid black;

    }
</style>
<style lang="scss">

</style>