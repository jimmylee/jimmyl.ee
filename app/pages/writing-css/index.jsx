import React from 'react';
import Content from '../../components/content/index';
import Header from '../../components/header/index';
import Code from '../../components/code/index';
import Footer from '../../components/footer/index';
import List from '../../components/diagram-column-list/index';
import { diagramSources } from './diagrams';

export default props => {
  return (
    <Content {...props}>
      <Header>
        <h1>{props.description}</h1>
      </Header>

      <p>
        In my experience, engineering teams often neglect writing performant CSS. This neglecting has an adequate reason because there are better areas to apply developer resources that have much greater ROI. However for large applications, using certain techniques can provide noticeable performance gains. Everyone can celebrate that.
      </p>

      <p>
        Luckily for us, this is a simple topic. And most likely you can still use your favourite preprocessor and postprocessor after reading this.
      </p>

      <h4>
        Creating The CSSOM
      </h4>

      <p>
        A tree is created called the CSSOM. It stands for the CSS Object Model. Here is a brief overview of how your browser creates the CSSOM:
      </p>

      <ol>
        <li>
          Read the raw bytes of the CSS or network and translate them into characters based on your system's encoding.
        </li>
        <li>
          Browser converts strings of characters into tokens.
        </li>
        <li>
          The browser transforms tokens into objects that hold properties and values.
        </li>
        <li>
          Objects are composed to form a tree based on their abstracted child, sibling, and parent relationship.
        </li>
      </ol>

      <p>
        The product is a tree that the browser can use to determine the most applicable rules for any given DOM tree node.
      </p>

      <h4>
        The Importance Of Speed
      </h4>

      <p>
        Building the CSSOM is render blocking on the browser's main thread because it locks to finish this task. It's usually fast, but there are a couple of caveats. First of, if there is a lot of CSS, this can take longer than expected. Second, the browser builds the CSSOM each time you load a new page (power to the single page apps!).
      </p>

      <p>
        So the point is: there are a couple of ways to improve this process regardless of what CSS church you belong to (Tachyons, OOCSS, ACSS, BEM, SMACSS or some other well thought out one). We are going to do this by reducing the amount of CSS we write, and making it easier for the browser to create the CSSOM.
      </p>

      <h4>
        Remove Unused Styles
      </h4>

      <p>
        Remove the duplicate properties, remove the empty rules, trim your CSS reset down, and remove any selectors that you are not using. This tactic is where you will find the most ROI on a large codebase.
      </p>

      <Code language="scss">
        {`/* divs are already blocks so delete this */
div {
  display: block;
}

/* delete empty cases like this */
.page {}
.element {}
span {}
`}
      </Code>

      <h4>
        Use a Flat Hierarchy
      </h4>

      <p>
        CSS selectors get evaluated from right to left, and for each selector, the browser checks the DOM tree until it reaches leftmost selector. Based on the complexity of selectors, this is a complexity for creating the render tree.
      </p>

      <p>
        Google page speed recommendations consider descendant selectors, and child or adjacent selectors to be slow. Therefore when it is possible, try to keep all of your class selectors at the top level to keep evaluation fast.
      </p>

      <p>
        Note: IDs are very performant in CSS, but this rule suggests that you should avoid styling ID in your CSS. I agree with this because each ID represents a unique instance of an element of your code, so its usage is counter intuitive towards reusability and modularity (debatable if you're using SASS mixins for reusability).
      </p>

      <Code language="scss">
        {`/* good practice */
.popover {
  opacity: 0;
}

.popover--active {
  opacity: 1;
}

/* also viable if using SASS preprocessor */
.popover {
  opacity: 0;

  &--active {
    opacity: 1;
  }
}
`}
      </Code>

      <h4>
        Avoid Depth and Traversal
      </h4>

      <p>
        Since we know the number of selectors used is a performance bottleneck. Do not write selectors that will cause the traversal of more nodes before the browser applies a style to the element.
      </p>

      <Code language="scss">
        {`/* do not do this */
.popover .popover-children .popover-children--active {}
.element element-item--pureVersion span:last-child {}
`}
      </Code>

      <h4>
        Remove Overqualified Elements
      </h4>

      <p>
        Removing overqualified elements improves performance by eliminating the need to match unnecessary elements and reducing the bytes used in your CSS file.
      </p>

      <Code language="scss">
        {`/* avoid */
figure.is-active {
  background-color: red;
}

/* avoid even more */
.list li.is-hidden {
  opacity: 0;
}
`}
      </Code>

      <h4>
        Careful With Universal Selectors
      </h4>

      <p>
        Since browsers evaluate selectors from right to left, a universal selector starts by matching every element in the document. Afterwards, it will attempt to match the next selector on the left. Since some developers enjoy the ease of universal selectors, I will not dismiss the validity of using a top level universal selector.
      </p>

      <Code language="scss">
        {`/* very bad */
span .dog * {
  color: red;
}

/* valid but debatable */
* {
  box-sizing: border-box;
}
`}
      </Code>

      <h4>
        Avoid Selectors By Attribute
      </h4>

      <p>
        Writing selectors by attributes match all the elements first and then match the attribute itself. So it is redundant and relatively slower than using classes as selectors.
      </p>

      <Code language="scss">
        {`/* targets all inputs */
[type="text"] {
  border: 0;
}

/* even more expensive after evaluating right to left */
input .my-input [type="text"] {
  border: 0;
}

/* can do the same thing */
.my-input {
  border: 0;
}
`}
      </Code>

      <h4>
        Appropriate CSS Properties
      </h4>

      <p>
        These extra lines are booby traps for future developers looking at your code, and these additional lines waste bytes and CSSOM building time.
      </p>

      <Code language="scss">
        {`display: inline;
/* avoid: width, height, margin, float */

display: inline-block;
/* avoid: float */

display: block;
/* avoid: vertical-align */

display: table-*;
/* avoid: margin, float; */
`}
      </Code>

      <h4>
        Shorthand Properties
      </h4>

      <p>
        You can often write multi-line CSS rules as a single rule to save bytes.
      </p>

      <Code language="scss">
        {`/* bad */
margin-left: 16px;
margin-right: 16px;
margin-top: 16px;
margin-bottom: 16px;

/* good */
margin: 16px;
`}
      </Code>

      <h4>
        Zero Values
      </h4>

      <p>
        There is no difference between 0px, 0em, and 0% or any zero-value. The browser knows what to do if you omit the unit. Save your bytes here.
      </p>

      <Code language="scss">
        {`/* same */
margin: 0px;
margin: 0em;
margin: 0%;
margin: 0;
`}
      </Code>

      <h4>
        Conquer The World
      </h4>

      <p>
        Once you get into the habit of writing performant CSS, which will feel nice because it means you're writing better CSS, you'll be on your way to building performant web apps and websites that load in sub-seconds.
      </p>

      <Footer>
        <List data={diagramSources} />
      </Footer>
    </Content>
  );
};
