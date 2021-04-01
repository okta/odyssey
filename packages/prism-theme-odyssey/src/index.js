import '@okta/odyssey';

import "prismjs";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-c";
import "prismjs/components/prism-go";
import "prismjs/components/prism-http";
import "prismjs/components/prism-java";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-python";
import "prismjs/components/prism-objectivec";
import 'prismjs/components/prism-markup-templating';
import "prismjs/components/prism-php";
import "prismjs/components/prism-swift";

import './demo.scss';
import './theme.scss';

import CustomPropertyInspector from './utils/CustomPropertyInspector.js'


const urlParams = new URLSearchParams(window.location.search);
const hasInspector = urlParams.get('inspector');

if (hasInspector) {
  new CustomPropertyInspector({
    propertiesElement: document.body
  });
}
