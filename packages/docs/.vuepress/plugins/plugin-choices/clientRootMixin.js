export default {
  updated() {
    import('choices.js').then((module) => {
      const Choices = module.default;
      setTimeout(() => {
        var selectExamples = document.querySelectorAll('[data-js-choices]');
        if (selectExamples) {
          selectExamples.forEach((element) => {
            new Choices(element, {
              searchEnabled: false,
              shouldSort: false,
              itemSelectText: '',
              removeItemButton: true,
              classNames: {
                containerOuter: 'ods-select',
                containerInner: 'ods-select--inner',
                input: 'ods-select--input',
                inputCloned: 'ods-select--input--cloned',
                list: 'ods-select--list',
                listItems: 'ods-select--list--multiple',
                listSingle: 'ods-select--list--single',
                listDropdown: 'ods-select--list--dropdown',
                item: 'ods-select--item',
                itemSelectable: 'ods-select--item--selectable',
                itemDisabled: 'ods-select--item--disabled',
                itemChoice: 'ods-select--item--choice',
                placeholder: 'ods-select--placeholder',
                group: 'ods-select--group',
                groupHeading: 'ods-select--heading',
                button: 'ods-select--button',
                activeState: 'is-ods-select-active',
                focusState: 'is-ods-select-focused',
                openState: 'is-ods-select-open',
                disabledState: 'is-ods-select-disabled',
                highlightedState: 'is-ods-select-highlighted',
                selectedState: 'is-ods-select-selected',
                flippedState: 'is-ods-select-flipped',
                loadingState: 'is-ods-select-loading',
                noResults: 'has-no-ods-select-results',
                noChoices: 'has-no-ods-select-choices'
              }
            });
          });
        }
      }, 500)
    });
  }
}
