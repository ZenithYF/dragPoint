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
                config:{
                    maxSpeed:30,
                    minSpeed:5
                },

                mouseX:'',
                mouseY:'',
                array:[],
                colorArray:[
                    '#C23531',
                    '#409EFF',
                    '#E4B160'
                ],
                pause:false,
                mouseX:'',
                mouseY:'',
                onmove:false,
            }
        },
        components: {

        },
        created() { },
        mounted() {
            this.initData();
            this.getMouse();
            this.repeatRoll()
        },

        
beforeDestroy() {
    clearInterval(this.timer);        

},

        methods: {
            //init mouse
            getMouse: function () {
                let canvas = document.getElementById('relation')
                let pen = canvas.getContext('2d');
                canvas.addEventListener('mousedown', this.clickPoint)
                canvas.addEventListener('mouseup', this.unpause)
                canvas.addEventListener('mousemove', this.move)
            },

            clickPoint(e) {
                // this.pause=true;
                this.mouseX = e.offsetX;
                this.mouseY = e.offsetY;
                this.check(e.offsetX, e.offsetY)
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

            unpause(e){
                // this.pause=false;
                this.drag=''
            },
            
            //init canvas map
            initCanvas: function () {
                let canvas = document.getElementById('relation')
                let ctx = canvas.getContext('2d');
            },

            
            ball: function (x, y, r, color, pen, canvas) {
                pen.beginPath();
                pen.strokeStyle = color;
                pen.moveTo(x, y)
                pen.arc(x, y, r, 0, Math.PI * 2, true);
                pen.stroke();
                pen.fillStyle = color;
                pen.fill();
            },

            pd() {   
                if(!this.pause){             
                let canvas = document.getElementById('relation')
                let ctx = canvas.getContext('2d');                
                ctx.clearRect(0, 0, canvas.width, canvas.height)        

                for (let i = 0; i < this.data.length; i++) {
                    if (this.data[i].x > canvas.width || this.data[i].x < this.data[i].r) {
                        this.data[i].speedX = -this.data[i].speedX
                    }
                    if (this.data[i].y > canvas.height || this.data[i].y < 8) {
                        this.data[i].speedY = -this.data[i].speedY
                    }                                   
                    
                    this.data[i].x = this.data[i].x + this.data[i].speedX
                    this.data[i].y = this.data[i].y + this.data[i].speedY

                    for(let j=i+1; j<this.data.length; j++){
                        let dx = this.data[i].x-this.data[j].x
                        let dy = this.data[i].y-this.data[j].y
                        let dl = Math.sqrt(dx*dx+dy*dy)
                        if(dl<=this.data[i].r+this.data[j].r){
                            this.data[i].speedX*=-0.95;
                            this.data[i].speedY*=-1;
                            this.data[j].speedX*=-0.8;
                            this.data[j].speedY*=-1;
                           if(this.data[i].speedX<this.config.minSpeed){
                              this.data[i].speedX=this.config.minSpeed
                           }
                            if(this.data[j].speedX>this.config.maxSpeed){
                              this.data[j].speedX=this.config.maxSpeed
                           }
                           if(this.data[i].speedY<this.config.minSpeed){
                              this.data[i].speedY=this.config.minSpeed
                           }
                            if(this.data[j].speedY>this.config.maxSpeed){
                              this.data[j].speedY=this.config.maxSpeed
                           }
                          
                        }
                    }


                    //zoom in
                    if(this.mouseX-this.data[i].x<10&&this.mouseX-this.data[i].x>-10&&this.mouseY-this.data[i].y<10&&this.mouseY-this.data[i].y>-10){
                        let r=this.data[i].r*2     
                         this.ball(this.data[i].x, this.data[i].y, r, this.data[i].color, ctx, canvas)                
                    } else{
                          this.ball(this.data[i].x, this.data[i].y, this.data[i].r, this.data[i].color, ctx, canvas)
                    } 

                }
                }
            },

            // move(e){
            //     console.log(e)
            //    this.mouseX=e.offsetX;
            //    this.mouseY=e.offsetY;

            // },

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

                        //redraw map
                        pen.clearRect(0, 0, canvas.width, canvas.height)
                        for (let j = 0; j < this.data.length; j++) {
                            this.ball(this.data[j].x, this.data[j].y, this.data[j].r, this.data[j].color, pen, canvas)
                        }
                    }
                }
            },

            initData:function(){
                clearInterval(this.timer)
                
             for(let i=0; i<100;i++){
                let canvas = document.getElementById('relation')
                let pen = canvas.getContext('2d');
                let element={};
                element.x=Math.random()*canvas.width;
                element.y=Math.random()*canvas.height;
                element.speedX=(Math.random()-0.5)*10;
                element.speedY=(Math.random()-0.5)*10;
                element.r=Math.random()*15;
                element.color=this.colorArray[Math.floor(Math.random()*3)]
                this.data.push(element)
             }
            },

            repeatRoll: function () {
                this.timer = setInterval(this.pd, 50)
            }
        },

        watch: {}
    }
</script>

<style scoped lang="scss">

    #relation {
        //border: 1px solid black;
        margin:0 auto;
        background:#333;

    }
</style>
<style lang="scss">

</style>