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

import { createContext, useContext, useState } from "react";
import type { FunctionComponent, ReactElement, AnimationEvent } from "react";
import { useCx, useOid, oid } from '../../utils';
import Button from '../Button';

export type ToastVariants = 'info' | 'success' | 'caution' | 'danger';

export interface PropsToast {
  /**
   * The title to be displayed on the toast. Provides quick context; one line max.
   */
  title: string,
  
  /**
   * Supplemental information. Be concise - less than three lines of content - as your Toast will soon vanish!
   */
  body?: string,

 /**
   * The visual variant to be displayed to the user.
   * @default info
   */
  variant?: ToastVariants,
  
 /**
   * The visual variant to be displayed to the user.
   * @default info
   */
  id?: string,
  
  onAnimationEnd?: (event: AnimationEvent) => void,

  onDismiss: () => void
}

export type PropsToastProvider = { 
  /**
   * Child react nodes which leverage the toast context. This is typically an entire app. 
   */
  children?: ReactElement | ReactElement[],

  /**
   * Callback function invoked when a toast exits the toast provider.
   */
  onToastExit?: (id: string) => void
}

export type StaticComponents = {
  Provider: FunctionComponent<PropsToastProvider>
}

export type ToastObject = {
  id?: string,
  title: string,
  body?: string,
  variant?: ToastVariants
}

export type AddToastType = (toastObj: ToastObject) => void
export interface Context {
  addToast: AddToastType
}

export const ToastContext = createContext<Context>({
  addToast: () => void 0
});

/**
 * Toasts are transient, non-disruptive messages that provide at-a-glance, 
 * asynchronous feedback or updates.
 * 
 * @component
 * @example  
 * <Toast>...</Toast>
 */
const Toast: FunctionComponent<PropsToast> & StaticComponents = (props) => {
  const { title, body, variant = 'info', id, onDismiss, ...rest } = props
  const componentClass = useCx(
    "ods-toast",
    `is-ods-toast-${variant}`
  );

  const xid = useOid(id);

  return (
    <aside role="status" id={xid} className={componentClass} {...rest}>
      <span className="ods-toast--icon">
        {/* @todo Insert <Icon> component */} &#8253;
      </span>
      <h1 className="ods-toast--title">{title}</h1>
      {body && <p className="ods-toast--body">{body}</p>}
      <span className="ods-toast--dismiss">
        <Button variant="dismiss" onClick={onDismiss} aria-label="Dismiss toast"> 
          {/* @todo Insert <Icon> component */} &#8253;
        </Button>
      </span>
    </aside>
  )
};

/**
 * Provides applications a way to add Toasts to their app 
 * via React's Context API.
 * 
 * @component
 * @example
 * <Toast.Provider>
 *  App with toast context.
 * </ToastProvider>
 */

Toast.Provider = ({ children, onToastExit }) => {
  const [toasts, setToasts] = useState<ToastObject[]>([]);
  
  const addToast = (toast: ToastObject) => {
    const id = toast.id || oid();
    setToasts([...toasts, {...toast, id}])
  }
  
  const handleDismiss = (id: string) => {
    if (typeof(onToastExit) === 'function') onToastExit(id);

    removeToast(id);
  }

  const removeToast = (id: string) => {
    setToasts([...toasts.filter(toast => toast.id !== id)]);
  }
  
  const handleAnimationEnd = (event: AnimationEvent) => {
    const { animationName, currentTarget } = event;
    
    if (animationName === "ods-toast-out") {
      handleDismiss(currentTarget.id);
    }
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="ods-toast-pen" data-testid="ods-toast-pen">
        {toasts.map(({ title, body, variant = 'info', id = oid() }) => (
          <Toast
            id={id}
            key={id}
            title={title}
            body={body}
            variant={variant}
            onDismiss={() => { handleDismiss(id); }}
            onAnimationEnd={handleAnimationEnd}
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = (): Context => {
  const context = useContext(ToastContext)

  if (Object.keys(context).length === 0) {
    throw new Error('useToast must be used within a Toast.Provider');
  }

  return context
}

export default Toast
