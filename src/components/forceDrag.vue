<template>
    <div id='force_graph'>
        <div id='graph_canvas'>
            <canvas ref="canvas" height='600' width='800' class="map"></canvas>
        </div>
    </div>
</template>

<script>
    import * as d3 from 'd3'

    export default {
        name: 'forceGraph',
        data() {
            return {
                nodes: [
                    { id: 1, name: 'life', color: 'pink' },
                    { id: 2, name: 'love', color: 'red' },
                    { id: 3, name: '张冬冬', color: 'blue' },
                    { id: 4, name: '大腚', color: 'grey' },
                    { id: 5, name: '黎书记', color: 'orange' }
                ],
                edges: [
                    { source: 1, target: 5 },
                    { source: 2, target: 5 },
                    { source: 3, target: 5 },
                    { source: 4, target: 5 }
                ],
                graph: null,
                width: '',
                height: '',
                strength: -20,
                link_distance: 100,
                canvas: document.querySelector('canvas'),
                e: null
            }
        },
        methods: {
            render: function () {
                let e = this.e;
                e.clearRect(0, 0, this.width, this.height)
                this.edges.forEach(function (a) {
                    e.beginPath()
                    e.moveTo(a.source.x, a.source.y)
                    e.lineTo(a.target.x, a.target.y)
                    e.stroke()
                })

                this.nodes.forEach(function (a) {
                    e.fillStyle = a.color
                    e.beginPath()
                    e.arc(a.x, a.y, 20, 0, 2 * Math.PI)
                    e.fill()
                    e.stroke()
                })
                e.font = '14px Comic Sans MS'
                e.fillStyle = 'black'
                e.textAlign = 'center'
                this.nodes.forEach(function (a) {
                    e.fillText(a.name, a.x, a.y + 2.5 * 12)
                });
            },


            force_graph_init() {
                const canvas = document.querySelector('canvas')

                //this.nodes.push({ id: 6, name: 'c', color: 'brown' })
                this.e = canvas.getContext('2d')
                this.width = canvas.width
                this.height = canvas.height

                this.graph = d3.forceSimulation()
                    .force('center', d3.forceCenter(this.width / 2, this.height / 2))
                    .force('charge', d3.forceManyBody())
                    .force('collide', d3.forceCollide(1.2 * 12))
                    .force('link', d3.forceLink().id(function (d) { return d.id }).distance(this.link_distance))
                // console.log('be:nodes')
                // console.log(this.nodes)
                this.graph.nodes(this.nodes).on('tick', this.render)
                this.graph.force('link', d3.forceLink().id(function (a) { return a.id }).distance(this.link_distance))
                this.graph.force('link').links(this.edges)

                // console.log(this.graph.find(d3.event.x, d3.event.y) )

                let _this = this;

                console.log(this.graph)
                d3.select(canvas).call(d3.drag()
                    .container(canvas)
                    .subject(function () {
                        console.log(_this.graph)
                        return _this.graph.find(d3.event.x, d3.event.y)
                    })
                    .on('start', function () {
                        console.log(_this.graph)
                        if (!d3.event.active) {
                            _this.graph.alphaTarget(0.3).restart()
                        }

                        //_this.graph.alphTarget(0.3).restart()
                        d3.event.subject.fx = d3.event.subject.x
                        d3.event.subject.fy = d3.event.subject.y
                    })
                    .on('drag', function () {
                        d3.event.subject.fx = d3.event.x
                        d3.event.subject.fy = d3.event.y
                    })
                    .on('end', function () {
                        d3.event.active || _this.graph.alphaTarget(0)
                        d3.event.subject.fx = null
                        d3.event.subject.fy = null
                    }))
                this.restart()
                // this.pause()
            },

         

            dragsubject: function () {
                return this.graph.find(d3.event.x, d3.event.y, 5)
            },

            dragstarted: function () {
                if (!d3.event.active) this.graph.alphaTarget(0.3).restart();
                d3.event.subject.fx = d3.event.subject.x;
                d3.event.subject.fy = d3.event.subject.y;

            },

            dragged: function () {
                d3.event.subject.fx = d3.event.x;
                d3.event.subject.fy = d3.event.y;

            },

            dragended: function () {
                if (!d3.event.active) this.graph.alphaTarget(0);
                d3.event.subject.fx = null;
                d3.event.subject.fy = null;
            },

            initDrag() {

            },
            run() {
                this.graph.restart()
            },
            restart() {
                this.graph.alpha(1)
                this.run()
            },
            pause() {
                this.graph.stop()
            }
        },
        mounted() {
            this.force_graph_init()
        }
    }
</script>

<style lang='scss' scoped>
    #graph_canvas {
        width: 100%;
        margin: 20px auto;

        .map {
           border: 1px solid #409EFF;
            background:#fff;
        }


    }
</style>

<style lang="scss">

</style>