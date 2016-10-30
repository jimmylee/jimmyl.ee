import React from 'react';
import Footer from '../../components/footer/index';
import Code from '../../components/code/index';
import Content from '../../components/content/index';
import Header from '../../components/header/index';
import PipelineDiagram from '../../components/diagram-pipeline/index';
import TwoThreadDiagram from '../../components/diagram-two-threads/index';
import StatsTable from '../../components/diagram-stats-table/index';
import List from '../../components/diagram-column-list/index';
import {
  diagramOne,
  diagramTwo,
  diagramThree,
  diagramFour,
  diagramFive,
  supportTableOne,
  supportTableTwo,
  supportTableThree,
  supportTableFour,
  supportTableFive
} from './diagrams';

const pageCSSAnimations = React.createClass({
  render() {
    return (
      <Content>
        <Header>
          <h1>{this.props.description}</h1>
        </Header>

        <p>
          Fast animation performance is a common topic amongst engineers. When we finish a client side feature, fixing animations becomes harder depending on the complexity of our HTML. Therefore the natural progression for an engineer is to understand the rendering process and create tactics for themselves to deploy on their projects.
        </p>

        <p>
          For some big picture context: Events get handled in an event loop. Then threads are called upon to process and execute client instructions. There is only one thread per window or browser tab that handles rendering and JavaScript. We call that thread the main thread.
        </p>

        <p>
          Below are the operations the main thread has to execute when an event callback triggers and an element's style properties have changed:
        </p>

        <PipelineDiagram tree={diagramOne} />

        <p>
          After these tasks are complete, another thread we will discuss, the compositor thread will be able to execute instructions to use the bitmaps in memory to draw the layers to the screen whenever necessary.
        </p>

        <p>
          To achieve sixty frames per second, There is a window of ~16.7-milliseconds for both threads to finish executing instructions and draw the updates. In the diagram below, I've decided to use red to decorate an operation as expensive.
        </p>

        <TwoThreadDiagram tree={diagramFour} />

        <p>
          Unfortunately, the time cost is unavoidable when the page first loads, so we can infer to avoid this process for our animations if possible. Also, the rest these notes work under the assumption that loading bitmaps into memory are expensive but going deep on that topic is another set of notes (schedulers, commits, and low-level programming specifics).
        </p>

        <h2>Dive into compositing</h2>

        <p>
          Compositing is the process of using buffers to cache and associate graphic layers of the render layer tree. Once the bitmaps exist in memory, the compositor thread draws all of the graphic layers into a final screen image.
        </p>

       <p>
          Note: The layer assembly implementation which turns layers into "tiles" is complicated, but it is not necessary to dive into that topic for our purposes.
        </p>

        <p>
          The importance of compositing is apparent when a user triggers document scrolling. If compositing is absent, every time a user triggers the event, a layout and paint operation would have to occur to satisfy the changes in the render tree. Instead, the compositor thread can invalidate and update its tree. Afterward, the compositor thread will update the main thread of the changes to keep our layer trees in sync.
        </p>

        <p>
          Because of compositing, the user can see immediate visual changes during a scroll event. This capability is made possible by the existence of two separate trees.
        </p>

        <h2>Two trees to make it work</h2>

        <p>
          As discussed before, the main thread produces the render tree, and each of its nodes is known as render objects. Render objects possess data on which elements overlap each other, and is used to create a tree of render layers. After creating the render layer tree, the compositor thread executes instructions for producing another tree with graphic layers. This tree takes up memory on the GPU and is stored separately from the render layers.
        </p>

        <p>
          The graphic layers tree is managed independently from the render layer tree.  The compositor thread has its tree copy to produce frames without interaction with the main thread. This nuance explains how the main thread can run the pipeline shown before while the GPU redraws at the same time.
        </p>

        <p>
          Each render layer has its graphics layer or uses one of its ancestors. So the relationship of graphic layers to render layers are one-to-many, and there will always be one (for the document root node). More importantly, invalidating one of these layers only results in either repainting or compositing that layer alone.
        </p>

        <h2>Our eureka moment</h2>

        <p>
          TL, DR; We unearthed some strategies for improving animation performance.
        </p>

        <p>
          First, the main thread utilizes the CPU, and the compositor thread the GPU. Since each thread has its tree, executing instructions in parallel will help code run faster and keep us within our 16-millisecond window for frame updates.
        </p>

        <p>
          Second, avoiding the reconstruction of the render tree through layouts and paints will keep the main thread unlocked and available to execute other necessary instructions.
        </p>

        <p>
          Third, depending on the devices of your target audience, focusing on writing code that changes only the composited layers can improve performance if there is no shortage of memory. This knowledge is responsible for the cannibalized "use hardware acceleration" strategy seen all over the internet.
        </p>

        <h2>Example cases</h2>

        <p>
          I have provided two cases. Both cases assume that all the bitmaps have undergone their first paint, the DOM tree has been parsed to produce the render tree and the compositing of the graphic layer tree.
        </p>

        <h2>Changing an element's height</h2>

        <p>
          Height is a common type of style property to animate. Sometimes you will need to animate an expanding menu or subpage. Let's have a look at what the work entails here:
        </p>

        <TwoThreadDiagram tree={diagramTwo} />

        <p>
          The main thread gets frequently locked to execute calls from the render object changing. For each render object change, the main thread runs operations for layout and paint, producing a new render layer tree. Then the compositor will take the render layer tree and create a graphic layer tree before compositing can finally occur. As an aside, height can also affect an element's siblings and children, which can cause subsequent render object changes too.
        </p>

        <h2>Changing an element's CSS transform</h2>

        <p>
          Here is an example of when we animate the CSS property transform by changing translateY:
        </p>

        <TwoThreadDiagram tree={diagramThree} />

        <p>
          There is an absence of red here! Because we altered a property that does not modify the render object and it only invalidates a graphic layer, the main thread does not have to perform a layout or paint operation. Also, the main thread can execute other instructions.
        </p>

        <h2>Getting into the code</h2>

        <p>
          Here is a CSS animation. It is not bad! This CSS excerpt forces the browser to create a composited layer for an element when the page loads. When a user hovers, the browser does not have to perform a layout or paint operation and can animate the change in transform smoothly.
        </p>

<Code language="scss">
{`.element {
  transform: translate3d(0, 0, 0);
  transition: 200ms ease transform;

  &:hover {
    transform: translateY(-32px);
  }
}`}
</Code>

        <p>
          To understand the choices, let's get into some of the tactics for writing CSS animations.
        </p>

        <h2>
          Tactic: avoiding unnecessary paint and layout operations
        </h2>

        <StatsTable data={supportTableOne}/>

        <p>
          We know paint and layout are expensive and updating CSS transform properties will not cause those operations.
        </p>

        <p>
          Animating these arguments of transform will only invalidate graphic layers and trigger page compositing:
        </p>

<Code language="scss">
{`transform: scale();
transform: scaleX();
transform: scaleY();
transform: scaleZ();
transform: rotate();
transform: rotate3d();
transform: rotateX();
transform: rotateY();
transform: rotateZ();
transform: translate3d();
transform: translateX();
transform: translateY();
transform: translateZ();`}
</Code>

        <p>
          Animating these properties will call layout and paint, followed by page compositing:
        </p>

<Code language="scss">
{`bottom
border
border-width
clear
display
float
font-family
font-size
font-weight
height
left
line-height
margin
min-height
padding
position
overflow
overflow-y
overflow-x
right
top
text-align
white-space
vertical-align
width`}
</Code>

        <p>
          Animating these properties will only cause paint, followed by page compositing.
        </p>

<Code language="scss">
{`background
background-color
background-image
background-position
background-repeat
background-size
border-radius
border-style
box-shadow
color
outline
outline-color
outline-style
outline-width
text-decoration
visibility`}
</Code>

        <h2>Tactic: preparing elements for animations in advance</h2>

        <StatsTable data={supportTableTwo} />

        <p>
          If there is no need to be frugal with memory, adding the CSS transform property to your CSSOM will initialize qualifying render layer with a backing surface (compositing layer), making those elements easier to animate.
        </p>

        <p>
          Here are some typical examples of the syntax used:
        </p>

<Code language="scss">
{`transform: translate3d(0, 0, 0);
transform: translateZ(0);`}
</Code>

        <p>
          On the internet, this tactic is the "transform hardware acceleration hack." The intent is to set up optimizations ahead of time before the property has to change.
        </p>

        <p>
          A more simple alternative is "will-change" which allows you to specify the exact property to optimize.
        </p>

        <StatsTable data={supportTableThree} />

<Code language="scss">
{`will-change: auto;
will-change: scroll-position;
will-change: contents;
will-change: transform;
will-change: opacity;
will-change: left, top;`}
</Code>

        <p>
          The only problem with this option is browser support.
        </p>

        <h2>Tactic: only apply composite layers before the user interacts</h2>

        <StatsTable data={supportTableFour} />

        <p>
          I have created websites that have a lot of DOM elements possessing compositing layers. Sometimes the maximum amount of memory consumed is surpassed, and the page is forced to close. An example of this is a news feed with many social interactions and nested comments.
        </p>

        <p>
          If GPU memory or system VRAM consumption is high, we can use JavaScript to create a graphic layer before the user clicks on an animation. After the animation finishes, a callback executes to delete the optimization code, conserving memory.
        </p>

<Code language="javascript">
{`const el = document.querySelector('.element');

const prepare = () => {
  el.style.willChange = 'transform';
}

const cleanup = () => {
  el.style.willChange = 'auto';
}

el.addEventListener('mouseenter', prepare);
el.addEventListener('animationEnd', cleanup);`}
</Code>

        <p>
          You can also use transform instead of "will-change" if you need to support Microsoft Edge browser.
        </p>

<Code language="javascript">
{`const el = document.querySelector('.element');

const prepare = () => {
  el.style.transform = 'translate3d(0, 0, 0)';
}

const cleanup = () => {
  el.style.transform = 'none';
}

el.addEventListener('mouseenter', prepare);
el.addEventListener('animationEnd', cleanup);`}
</Code>

        <h2>Tactic: taking advantage of the human eye.</h2>

        <StatsTable data={supportTableFive}/>

        <p>
          Human research tells us that there is a 100-millisecond window before the user notices anything. If you trigger an animation within 100-milliseconds, you can still create the feeling on an immediate response.
        </p>

        <p>
          To our advantage, 100ms is a long enough window to include a layout and paint operation. Although this tactic counter-intuitive to previous tactics, this window allows us to conserve limited memory if needed.
        </p>

        <p>
          This tactic is perfect for elements that don't have to appear on the screen initially. Here is an example:
        </p>

<Code language="scss">
{`@keyframes slide-down {
  0% {
    transform: translateY(-32px);
  }

  100% {
    transform: none;
  }
}

.element {
  display: none;
}

.is-visible {
  display: block;
  animation-name: slide-down;
  animation-duration: 200ms;
  animation-iteration-count: 1;
}`}
</Code>

        <p>
          You can use JavaScript to add and remove the .is-visible class.
        </p>

        <h2>That's it</h2>

        <p>
          Now you are equipped with everything you need to improve your CSS animations. If you are exploring imperative animations (JavaScript), you should also check out requestAnimationFrame which is a useful alternative to setTimeout and setInterval.
        </p>

        <p>
          Have fun &amp; good luck!
        </p>

        <Footer>
          <List data={diagramFive} />
        </Footer>
      </Content>
    );
  }
});

export default pageCSSAnimations;
