/*!
 * Copyright (c) 2021-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import type { FunctionComponent, ReactNode } from 'react';
import Title from '../Title';
import { useCx, useOmit } from '../../utils';
import Button from '../Button';
import styles from './Banner.module.scss';

export type BannerVariants = 'info' | 'danger' | 'caution';
interface ComponentProps {
  /**
   * Actions, or links to be rendered on the right side of 
   * the component.
   */
  children: ReactNode;
  
  /**
   * The visual variant to be displayed to the user.
   * @default info
   */
  variant?: BannerVariants;

  /**
   * Human-readable title for the banner.
   */
  title: string;

  /**
   * Human-readable descriptive content for the banner.
   */
  content: string;

  /**
   * Determines whether the banner should be displayed to the user.
   */
  open: boolean;
}

type DismissableComponentProps =
| { onDismiss?: never; dismissButtonLabel?: never }
| { onDismiss: () => void; dismissButtonLabel: string }


export type Props = ComponentProps & DismissableComponentProps;

/**
 * Banners let users know important messages related to their overall experience
 * on the website. They can be purely informational messages or critical errors 
 * to act upon.
 *
 * @component
 * @example
 * <Banner 
 *  variant="primary"
 *  open={isOpen}
 *  title="New launch scheduled"
 *  content="The mission to Sagitarius A has been set for January 7."
 *  onDismiss={handleBannerDismiss}
 * >
 *    <Link href="/fuel">Visit fueling console</Link>
 * </Banner>
 */

 const Banner: FunctionComponent<Props> = (props) => {
  const {
    children,
    title,
    content,
    open,
    variant = "info",
    onDismiss,
    dismissButtonLabel,
    ...rest
  } = props;

  const variantClass = `variant${variant[0].toUpperCase()}${variant.slice(1)}`
  const componentClass = useCx(
    styles.root,
    variant && styles[variantClass],
    !open && styles.isDismissed,
    onDismiss && styles.isDismissable
  );
  const omitProps = useOmit(rest);

  return (
    <aside
      {...omitProps}
      className={componentClass}
      role="status"
    >
      <span className={styles.icon}>
        {/* @todo Insert <Icon> component */}
        &#8253;
      </span>
      {title && <div className={styles.title}><Title visualLevel="6" lineHeight="title" noEndMargin children={title} /></div> }
      {content && <p className={styles.bannerContent}>{content}</p>}
      {children && <section className={styles.bannerActions}>{children}</section>}
      {onDismiss &&
        <span className={styles.dismiss}>
          <Button variant="dismiss" onClick={onDismiss} aria-label={dismissButtonLabel}>
            {/* @todo Insert <Icon> component, dismiss variant */}
            &#8253;
          </Button>
        </span>
      }
    </aside>
  );
};

export default Banner;
