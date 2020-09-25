import { storiesOf } from '@storybook/html';
import { boolean, text } from '@storybook/addon-knobs';

function setup({ type, slot, icon, href, size = 'regular' }) {
  const knobType = text('type', type);
  const knobIcon = text('icon', icon);
  const knobSlot = text('slot', slot);
  const knobHref = text('href', href);
  const knobDisabled = boolean('disabled', false);
  const knobSize = text('size', size);
  return `
    <o-button
      ${knobType ? `type="${knobType}"` : ''}
      ${knobIcon ? `icon="${knobIcon}"` : ''}
      ${knobHref ? `href="${knobHref}"` : ''}
      ${knobDisabled ? 'disabled' : ''}
      ${knobSize ? `size="${knobSize}"` : ''}>
      ${knobSlot || ''}
    </o-button>
  `;
}

storiesOf('Button/Types', module)
  .add('Primary (default)', () => setup({ type: 'primary', slot: 'Primary (default)' }))
  .add('Secondary', () => setup({ type: 'secondary', slot: 'Secondary' }))
  .add('Danger', () => setup({ type: 'danger', slot: 'Danger' }))
  .add('Overlay', () => {
    return `
      <div style="padding: 1rem; background: #00b478;">
        ${setup({ type: 'overlay', slot: 'Overlay' })}
      </div>
    `
  })
  .add('Clear', () => setup({ type: 'clear', slot: 'Clear' }));

storiesOf('Button/Icon', module)
  .add('Icon only', () => setup({ icon: 'info' }))
  .add('Icon with Text', () => setup({ slot: 'Icon with Text', icon: 'info' }))
  .add('Button Link', () => setup({ slot: 'www.okta.com', href: 'https://www.okta.com' }));
