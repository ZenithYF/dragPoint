<template>
   <div id="main">
    <canvas id="relation" :style="{width: '100%', height: '100%'}">
    </canvas>
    </div>
</template>

<script>
    export default {
        name: 'relation',
        data() {
            return {
                familyData: [{
                        x: 250,
                        y: 15,
                        family: 0,
                        color:'#E4B160'
                    }, {
                        x: 50,
                        y: 50,
                        family: 1,
                        color:'#C23531'
                    }, {
                        x: 200,
                        y: 90,
                        family: 1,
                        color:'#C23531'
                    }, {
                        x: 100,
                        y: 100,
                        family: 2,
                        color:'#409EFF'
                    }, {
                        x: 150,
                        y: 20,
                        family: 2,
                        color:'#409EFF'
                    },

                ]
            }
        },
        components: {

        },
        created() {},
        mounted() {
            this.initCanvas();
            //this.initAction();
            this.getMouse();            
        },


        
        methods: {
            getMouse:function(){
                let canvas = document.getElementById('relation')
                let pen = canvas.getContext('2d');               
                canvas.addEventListener('mousedown',this.clickPoint)    
            },

            clickPoint(e){
                let canvas = document.getElementById('relation')
                let pen = canvas.getContext('2d'); 
                // let x= e.clientX;
                // let y=e.clientY;
                console.log(e.pageX)
                console.log(canvas.getBoundingClientRect().left)
                let x=e.pageX-canvas.getBoundingClientRect().left;
                let y=e.pageY-canvas.getBoundingClientRect().top;

             console.log(x);
            //   console.log(y)
            //    console.log(pen.isPointInPath(x,y))
              // this.cal(e.clientX,e.clientY,this.familyData)
            },


            cal:function(x,y,data){
                for(let i=0; i<data.length; i++){
                      var line = Math.abs(Math.sqrt(Math.pow((data[i].x - x), 2) + Math.pow((data[i].y - y), 2)))
                      console.log(line)
                      if (line>5){
                          console.log(false)
                      }else{
                          console.log(true)
                      }
                }

            },
              



            initCanvas: function() {
                let canvas = document.getElementById('relation')
                let ctx = canvas.getContext('2d');
                //this.drawPoint(ctx, this.familyData);
                
               // this.drawRelation(ctx, this.familyData);
               this.drawTest();
            },
             

            drawTest:function(){
                let canvas = document.getElementById('relation')
                let pen = canvas.getContext('2d');
                   pen.beginPath();
                    pen.strokeStyle='red';
                    pen.moveTo(245, 15)
                    pen.arc(250, 15, 5, 0, Math.PI * 2, true);
                    pen.stroke();
                    pen.fillStyle='blue';
                    pen.fill();
            },
            drawPoint: function(pen, data) {
                for (let i = 0; i < data.length; i++) {
                    pen.beginPath();
                    pen.strokeStyle=data[i].color;
                    pen.moveTo(data[i].x-5, data[i].y)
                    pen.arc(data[i].x, data[i].y, 5, 0, Math.PI * 2, true);
                    pen.stroke();
                    pen.fillStyle=data[i].color;
                    pen.fill();
                }
            },

            drawRelation: function(pen, data) {
                pen.beginPath();
                for (let i = 0; i < data.length; i++) {
                    for (let j = 0; j < data.length; j++) {
                        if (data[j].family == data[i].family) {
                            pen.beginPath();
                            pen.moveTo(data[j].x, data[j].y);
                            pen.lineTo(data[i].x, data[i].y);
                            pen.strokeStyle = 'red';
                            pen.stroke();
                        } else if (data[j].family < data[i].family && (data[i].family - data[j].family) == 1) {
                            this.drawArrow(pen, data[j].x, data[j].y, data[i].x, data[i].y, 10, 0.5,'blue')
                        } else if (data[j].family > data[i].family && (data[j].family - data[i].family) == 1) {
                            this.drawArrow(pen, data[i].x, data[i].y, data[j].x, data[j].y, 10, 0.5, 'blue')
                        }
                    }
                }

            },

            drawArrow: function(pen, fromX, fromY, toX, toY, headlen, lineWidth, color) {
                pen.beginPath();
                pen.lineWidth=lineWidth;
                var dx = toX - fromX;
                var dy = toY - fromY;
                var angle = Math.atan2(dy, dx);
                pen.moveTo(fromX, fromY);
                pen.lineTo(toX, toY);
                pen.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
                pen.moveTo(toX, toY);
                pen.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
                pen.strokeStyle = color;
                pen.stroke()
            },



            testDraw:function(x,y,pen){
                pen.beginPath();
                pen.fillStyle='green'
                pen.arc(x,y,20,0,Math.PI*2,false);
                pen.fill();
            },

            initAction:function(){ 
                let canvas = document.getElementById('relation')
                let pen = canvas.getContext('2d');               
               this.testDraw(20,20,pen);
                document.body.addEventListener('mousedown',function(e){             
                document.body.addEventListener('mousemove',this.penMove)
                document.body.addEventListener('mouseup',this.penUp)
                  })                   
            },

            penMove:function(e){  
                console.log(e.clientX)         
                let canvas = document.getElementById('relation')
                let pen = canvas.getContext('2d');    
                this.testDraw(e.clientX,e.clientY,pen)
            },

            
            penUp:function(e){
                document.body.removeEventListener('mousemove',this.penMove)
                document.body.removeEventListener('mouseup',this.penUp)
            },

        },

        watch: {}
    }
</script>

// <style scoped lang="scss">
#main{
    height:80%;
    width:80%;
    border:1px solid #72b8f7;
    margin:0 auto;
     #relation {
        height: 100%;
        width: 100%;
    }
}

</style>
<style lang="scss">

</style>