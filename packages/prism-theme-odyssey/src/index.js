import '@okta/odyssey';
import 'prismjs';
import './theme.scss';

const Storage = window.localStorage;

class CustomPropertyInspector {
  constructor({propertiesElement, inspectorElement}) {
    this.properties = this.setCustomProperties(propertiesElement);

    this.renderInspector()
  }

  setCustomProperties(element) {
    let prop
    const styles = getComputedStyle(element)
    const properties = {}

    for (prop in styles) {
      const name = styles[prop];
      const value = Storage.getItem(name) || styles.getPropertyValue(name);        

      if (styles.hasOwnProperty(prop) && styles[prop].includes('--')) { 
        properties[name] = value
      }

      if (Storage.getItem(name)) {
        document.documentElement.style.setProperty(name, value);
      }
    }

    return properties
  }


  renderInspector() {
    const { properties } = this
    const inspector = document.createElement('form');
    inspector.classList.add('custom-properties-inspector');
    inspector.style = `
      position: sticky;
      top: 0;
      background: #f5f5f6;
      padding:  3.42857rem 1.71429rem;
      max-height: 100vh;
      overflow: scroll;
    `

    const inspectorReset = document.createElement('button');
    inspectorReset.classList.add('ods-button', 'is-ods-button-danger', 'is-ods-button-full-width');
    inspectorReset.innerHTML = "Reset Theme";

    document.body.style = "display: flex;"

    for (const [key, value] of Object.entries(properties)) {
      const fieldset = document.createElement('fieldset');
      const fieldsetFlex = document.createElement('div');
      const input = document.createElement('input');
      const label = document.createElement('label');

      // Set Odyssey Fieldset
      fieldset.classList.add('ods-fieldset')

      // Set Odyssey Fieldset Flex
      fieldsetFlex.classList.add('ods-fieldset-flex')

      // Set Odyssey Label
      label.classList.add('ods-label');
      label.innerHTML = key;
      
      // Set Odyssey Text Input
      input.setAttribute('type', 'text');
      input.classList.add('ods-text-input');
      input.name = key
      input.value = value.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1");

      // Append all the elements
      fieldset.appendChild(fieldsetFlex)
      fieldsetFlex.appendChild(label);
      fieldsetFlex.appendChild(input);
      inspector.appendChild(fieldset);
      inspector.appendChild(inspectorReset)
    }

    // Prepend the inspector
    document.body.prepend(inspector);

    inspectorReset.addEventListener('click', () => {
      Storage.clear();
      this.setCustomProperties();
    })
    inspector.addEventListener('keyup', (e)=> {
      let name = e.target.name
      let value = e.target.value;

      this.properties = {
        ...this.properties,
        [name]: value
      }
      
      Storage.setItem(name, value);

      document.documentElement.style.setProperty(name, value);
    })
  }
}

new CustomPropertyInspector({
  propertiesElement: document.body
});
