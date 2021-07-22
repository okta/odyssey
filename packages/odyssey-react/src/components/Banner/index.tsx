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

import React from 'react';
import type { FunctionComponent, ReactNode } from 'react';
import { useCx, useOmit } from '../../utils';
import Button from '../Button';

export type BannerVariants = 'info' | 'danger' | 'caution';

type ComponentProps = {
  /**
   * Actions, or links to be rendered on the right side of 
   * the component.
   */
  children: ReactNode,
  
  /**
   * The visual variant to be displayed to the user.
   * @default info
   */
  variant?: BannerVariants,

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
  visible: boolean,

  /**
   * function callback which enables the display of the dismiss button.
   */
  onDismiss?: () => void,

  /**
   * Applies an aria-label to the dismiss button. This is required if an 
   * onDismiss callback is provided.
   */
  dismissButtonLabel?: string
};

export type Props = ComponentProps;

/**
 * Banners let users know important messages related to their overall experience
 * on the website. They can be purely informational messages or critical errors 
 * to act upon.
 *
 * @component
 * @example
 * <Banner 
 *  variant="primary"
 *  visible={isVisible}
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
    visible,
    variant = "info",
    onDismiss,
    dismissButtonLabel,
    ...rest
  } = props;

  const componentClass = useCx(
    "ods-banner",
    variant && `is-ods-banner-${variant}`,
    !visible && "is-ods-banner-dismissed",
    onDismiss && "is-ods-banner-dismissable"
  );

  const omitProps = useOmit(rest);

  return (
    <aside
      className={componentClass}
      role="status"
      {...omitProps}
    >
      <span className="ods-banner--icon">
        {/* @todo Insert <Icon> component */}
        ‽
      </span>
      {title && <h1 className="ods-banner--title">{title}</h1>}
      {content && <p className="ods-banner--content">{content}</p>}
      {children && <section className="ods-banner--actions">{children}</section>}
      {onDismiss &&
        <span className="ods-banner--dismiss">
          <Button variant="dismiss" onClick={onDismiss} aria-label={dismissButtonLabel}>
            {/* @todo Insert <Icon> component, dismiss variant */}
            ‽
          </Button>
        </span>
      }
    </aside>
  );
};

export default Banner;
