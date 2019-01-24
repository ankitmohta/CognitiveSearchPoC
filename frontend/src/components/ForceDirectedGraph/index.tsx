import * as d3 from 'd3';
import * as React from 'react';
import { Id3Node, IGraph } from '../../types/graph';

export interface IForceDirectedGraphProps {
    width: (width: number) => number,
    height: (height: number) => number,
    graph: IGraph,
}

export default class ForceDirectedGraph extends React.Component<IForceDirectedGraphProps, any> {
    public svgRef: SVGSVGElement;

    public drawGraph() {
      d3.select('g.nodes').remove();
      d3.select('g.links').remove();
      const context: any = d3.select(this.svgRef);
      let {height, width} = context.node().getBoundingClientRect();
      const color = d3.scaleOrdinal(d3.schemeCategory10);
  
      const collideMultiplier = (window.innerWidth < 500 ? 15 : 30);
      const chargeStrengthMultiplier = (window.innerWidth < 500 ? -37 : -150);
      const colors = {
        link: '#888888',
        nodeFill: (d: Id3Node) => color(String(d.group)),
        nodeStroke: '#222',
        text: '#EEE',
      }
      const simulation: any = d3.forceSimulation()
        .force("link", d3.forceLink().id((d: Id3Node) => d.id))
        .force("charge", (d3.forceManyBody<Id3Node>().strength(d=>chargeStrengthMultiplier*d.group)))
        .force("collide", (d3.forceCollide<Id3Node>(d => collideMultiplier).strength(1).iterations(1)))
        .force("center", d3.forceCenter(width / 2, height / 2));
  
      const link = context.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(this.props.graph.links)
        .enter().append("line")
        .attr("stroke-width", 1)
        .attr("stroke", colors.link);
  
      const node = context.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(this.props.graph.nodes)
        .enter().append("circle")
        .attr("r", 20)
        .attr("fill", colors.nodeFill)
        .attr("stroke", colors.nodeStroke)
        .attr("stroke-width", 1)
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

        const text = context.append("g")
        .attr("class", "labels")
        .selectAll("text")
        .data(this.props.graph.nodes)
        .enter().append("text")
        .attr("font-size", "12px")
        .attr("font-family", "sans-serif")
        .attr("fill", colors.text)
        .attr("stroke", colors.text)
        .attr("stroke-width", 1)
        .text((d: Id3Node) => d.id);
        
        node.append("title")
          .text((d: Id3Node) => d.id);
  
      simulation.nodes(this.props.graph.nodes).on("tick", ticked);
      simulation.force("link").links(this.props.graph.links);
  
      function dragstarted(d: any) {
        if (!d3.event.active) {
          simulation.alphaTarget(0.3).restart();
        }
        d.fx = d.x;
        d.fy = d.y;
      }
  
      function dragged(d: any) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }
  
      function dragended(d: any) {
        if (!d3.event.active) {
          simulation.alphaTarget(0);
        }
        d.fx = null;
        d.fy = null;
      }
      
      function ticked() {
        link
          .attr("x1", (d: any) => d.source.x)
          .attr("y1", (d: any) => d.source.y)
          .attr("x2", (d: any) => d.target.x)
          .attr("y2", (d: any) => d.target.y)
  
        node
          .attr("cx", (d: any) => d.x)
          .attr("cy", (d: any) => d.y)

        const textOffset: number = 20;
        text
          .attr("transform", (d: any) => `translate(${d.x+textOffset}, ${d.y+textOffset})`)
      }

      const resize = () => {
          width = this.props.width(window.innerWidth), height = this.props.height(window.innerHeight);
          context.attr("width", width).attr("height", height);
          simulation.force("center", d3.forceCenter(width / 2, height / 2));
      }
      d3.select(window).on('resize', resize);
      d3.select(window).on('orientationchange', resize);
      resize();
    }

    public componentDidMount() {
      this.drawGraph();
    }
    
    public componentWillReceiveProps(nextProps: IForceDirectedGraphProps) {
      if(JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
        this.drawGraph();
      }
    }

    public render() {
      const setSVGRef = (ref: SVGSVGElement) => this.svgRef = ref; 
      return <svg width={this.props.width(window.innerWidth)} height={this.props.height(window.innerHeight)} ref={setSVGRef}/>
  }
}