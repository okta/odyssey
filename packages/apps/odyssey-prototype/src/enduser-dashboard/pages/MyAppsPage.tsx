/*!
 * Copyright (c) 2026-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { Button } from "@okta/odyssey-react-mui";
import { AddCircleIcon, ChevronDownIcon } from "@okta/odyssey-react-mui/icons";
import { type ChangeEvent, useCallback, useEffect, useState } from "react";

import { ENDUSER_DASHBOARD_ADD_SECTION_EVENT } from "../shell/EnduserDashboardSideNavConfig";

type AppDefinition = {
  logoAlt: string;
  logoSrc: string;
  title: string;
};

const WORK_APPS: AppDefinition[] = [
  {
    logoAlt: "Okta Workflows logo",
    logoSrc: "/logos/okta-workflows.27df74eb53570679e5cc3a4b0f160602.png",
    title: "Okta Workflows",
  },
  {
    logoAlt: "Okta Access Requests logo",
    logoSrc: "/logos/access-requests.38f27b44fd1ce6437889d478b381f5b7.png",
    title: "Okta Access Requests",
  },
  {
    logoAlt: "Okta Access Certification Reviews logo",
    logoSrc:
      "/logos/iga_reviewer_app_logo.2c68be805203d9708e6bc63179a9e0ae.png",
    title: "Okta Access Certification Reviews",
  },
  {
    logoAlt: "Okta Privileged Access logo",
    logoSrc: "/logos/OPA_tile.0b6812aa21d6ee8f4700a1f6d7c27b56.png",
    title: "Okta Privileged Access",
  },
  {
    logoAlt: "Okta Org2Org logo",
    logoSrc: "/logos/okta-org2org.png",
    title: "Okta Org2Org",
  },
  {
    logoAlt: "Okta Advanced Server Access logo",
    logoSrc: "/logos/okta-advanced-server-access.png",
    title: "Okta Advanced Server Access",
  },
  {
    logoAlt: "OKTA API Connector logo",
    logoSrc: "/logos/okta-api-connector.png",
    title: "OKTA API Connector",
  },
  {
    logoAlt: "4QSurvey logo",
    logoSrc: "/logos/4qsurvey.0bcd3396ce115c2d31837ee01d05d42c.png",
    title: "4QSurvey",
  },
  {
    logoAlt: "Partner Admin Portal logo",
    logoSrc:
      "/logos/partner_portal_app_logo.ce18f2b3aa28cce6ce17e102f8db8e3b.svg",
    title: "Partner Admin Portal",
  },
];

// CSS captured verbatim from eng-unification-1.trexcloud.com/app/UserHome
const PAGE_CSS = `
  .dashboard--main {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .dashboard--chiclets {
    flex: 1 1 0%;
  }
  .dashboard--sort-apps-header {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    margin: 0 1.71429rem 0.857143rem;
  }
  .dashboard--my-apps-title {
    line-height: 1.71429;
    font-weight: 600;
    font-size: 1.1487rem;
    margin-bottom: 0;
  }

  .plugin-banner {
    background: #fff;
    padding: 1.71429rem;
    border: 1px solid #d7d7dc;
    margin: 0 1.71429rem 3.42857rem;
    border-radius: 4px;
    position: relative;
  }
  .plugin-banner.plugin-banner--small {
    padding: 0.857143rem 1.71429rem;
  }
  .plugin-banner .plugin-banner--header-flex {
    display: flex;
    align-items: center;
    margin-right: 2.57143rem;
  }
  .plugin-banner .plugin-banner--header-title-item {
    margin-right: 1.71429rem;
  }
  .plugin-banner .plugin-banner--header {
    margin: 0;
    font-size: 14px;
    font-weight: 400;
  }
  .plugin-banner .plugin-banner--header-btn-item {
    margin-right: auto;
  }
  .plugin-banner .plugin-banner--close-container {
    position: absolute;
    top: 1.5rem;
    right: 1.71429rem;
  }
  .plugin-banner .plugin-banner--close {
    width: 14px;
    height: 14px;
    margin: 0;
    padding: 0;
    border: 0;
    background: none;
    cursor: pointer;
    display: block;
  }

  .chiclet--container {
    position: relative;
    background-color: #fff;
    border-radius: 4px;
    border: 0;
    cursor: pointer;
    transition: box-shadow 0.1s linear;
    box-shadow: rgba(33, 33, 38, 0.2) 0px 2px 6px;
    min-height: 150px;
  }
  .chiclet--container:hover {
    box-shadow: rgba(33, 33, 38, 0.2) 0px 4px 18px;
  }
  .chiclet {
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 0.857143rem;
    text-align: center;
    text-decoration: none;
    color: inherit;
    height: 100%;
    box-sizing: border-box;
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
    width: 100%;
  }
  .chiclet .chiclet--article {
    display: flex;
    flex-direction: column;
    flex: 1 1 0%;
  }
  .chiclet--main {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 30px;
    margin: 2.14286rem 0 0.857143rem;
  }
  .chiclet--footer {
    display: flex;
    justify-content: center;
    flex-grow: 1;
    flex-direction: column;
    text-align: center;
  }
  .chiclet--title {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12.3px;
    color: #212126;
    max-width: 100%;
  }
  .chiclet--action {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.428571rem 0.857143rem 0.857143rem;
    border: none;
    border-radius: 0 4px;
    background: transparent;
    cursor: pointer;
  }
  .chiclet--action:hover {
    background: rgb(242, 245, 255);
  }
  .chiclet--action:hover .chiclet--action-kebab circle {
    fill: rgb(110, 110, 120);
  }
  .app-logo--image {
    max-height: 40px;
    max-width: 100%;
    flex-shrink: 0;
  }

  .section--header {
    padding: 0 0 0 24px;
    margin: 0 0 12px;
  }
  .section--controls {
    display: flex;
    align-items: center;
  }
  .section--collapse-btn {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 6px;
    padding: 1px 4px 1px 0;
    margin: 0 4px 0 0;
    background: transparent;
    border: 0;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    color: #212126;
    font-family: inherit;
  }
  .section--rename-btn {
    display: flex;
    align-items: center;
    padding: 1px 6px;
    background: transparent;
    border: 0;
    cursor: pointer;
  }

  .chiclet-area--add-section-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border: 0.8px solid #cbcbc8;
    border-radius: 4px;
    background: transparent;
    color: #212126;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    font-family: inherit;
  }
  .chiclet-area--add-section-btn:hover {
    background: rgba(0, 0, 0, 0.04);
  }

  .dashboard--footer {
    padding: 0 3.42857rem 3.42857rem;
    background: #f4f4f4;
    display: flex;
    flex-flow: wrap;
  }
  .dashboard--footer-support-info {
    line-height: 1.71429rem;
    margin-top: 3.42857rem;
    margin-right: 6.85714rem;
    font-weight: 600;
  }
  .dashboard--footer-support-title {
    margin-bottom: 0.428571rem;
    font-size: 1.1487rem;
  }
  .footer--help-link {
    font-weight: 400;
    display: block;
    margin-bottom: 0.857143rem;
  }

  .okta-link {
    color: #1662dd;
    text-decoration: underline;
  }
  .okta-btn-install {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 16px;
    border: 1px solid #1662dd;
    border-radius: 4px;
    background: transparent;
    color: #1662dd;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    font-family: inherit;
  }
  .okta-btn-install:hover {
    background: rgba(22, 98, 221, 0.05);
  }
  .okta-btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 16px;
    border: 1px solid rgba(0, 0, 0, 0.23);
    border-radius: 4px;
    background: white;
    color: #212126;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    font-family: inherit;
  }
  .okta-btn-secondary:hover {
    background: rgba(0, 0, 0, 0.04);
  }
  .okta-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 16px;
    border: none;
    border-radius: 4px;
    background: #1662dd;
    color: white;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    font-family: inherit;
  }
  .okta-btn-primary:hover {
    background: #0f4faf;
  }

  .create-section-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1300;
  }
  .create-section-dialog {
    background: white;
    border-radius: 4px;
    padding: 24px;
    min-width: 400px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }
  .create-section-dialog h2 {
    margin: 0 0 16px;
    font-size: 18px;
    font-weight: 600;
  }
  .create-section-dialog label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
  }
  .create-section-dialog input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid rgba(0, 0, 0, 0.23);
    border-radius: 4px;
    font-size: 14px;
    font-family: inherit;
    box-sizing: border-box;
    margin-bottom: 24px;
  }
  .create-section-dialog .dialog-actions {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
  }

  .external-link-icon {
    display: inline;
    margin-left: 2px;
    vertical-align: middle;
  }
`;

export const MyAppsPage = () => {
  const [isPluginBannerVisible, setIsPluginBannerVisible] = useState(true);
  const [isWorkSectionExpanded, setIsWorkSectionExpanded] = useState(true);
  const [isCreateSectionDialogOpen, setIsCreateSectionDialogOpen] =
    useState(false);
  const [newSectionName, setNewSectionName] = useState("");

  const dismissPluginBanner = useCallback(() => {
    setIsPluginBannerVisible(false);
  }, []);

  const toggleWorkSection = useCallback(() => {
    setIsWorkSectionExpanded((previousValue) => !previousValue);
  }, []);

  const openCreateSectionDialog = useCallback(() => {
    setIsCreateSectionDialogOpen(true);
  }, []);

  const closeCreateSectionDialog = useCallback(() => {
    setIsCreateSectionDialogOpen(false);
    setNewSectionName("");
  }, []);

  const updateNewSectionName = useCallback(
    (changeEvent: ChangeEvent<HTMLInputElement>) => {
      setNewSectionName(changeEvent.target.value);
    },
    [],
  );

  useEffect(() => {
    window.addEventListener(
      ENDUSER_DASHBOARD_ADD_SECTION_EVENT,
      openCreateSectionDialog,
    );
    return () => {
      window.removeEventListener(
        ENDUSER_DASHBOARD_ADD_SECTION_EVENT,
        openCreateSectionDialog,
      );
    };
  }, [openCreateSectionDialog]);

  return (
    <div className="dashboard--main">
      <style>{PAGE_CSS}</style>

      <section className="dashboard--chiclets" id="main-content">
        {/* Plugin banner */}
        {isPluginBannerVisible && (
          <section
            className="plugin-banner plugin-banner--small"
            data-se="plugin-banner"
          >
            <div className="plugin-banner--header-flex">
              <div className="plugin-banner--header-title-item">
                <h3
                  className="plugin-banner--header"
                  data-se="plugin-banner--header"
                >
                  Launch apps more quickly from any page with the Okta plugin
                </h3>
              </div>
              <div className="plugin-banner--header-btn-item">
                <button
                  className="okta-btn-install"
                  data-se="plugin-banner--install"
                  type="button"
                >
                  Install
                </button>
              </div>
              <div>
                <a
                  className="okta-link"
                  data-se="plugin-banner--header-help"
                  href="https://help.okta.com/okta_help.htm?type=eu&locale=en&id=ext_plugin_installation"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Need help?
                  <svg
                    className="external-link-icon"
                    fill="none"
                    height="12"
                    viewBox="0 0 16 16"
                    width="12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="m5.529 9.529 6.861-6.862H6.667V1.333h6.815c.08 0 .174 0 .258.007.097.008.235.028.38.102a1 1 0 0 1 .438.437c.074.146.094.284.102.381.007.084.007.178.007.258v6.815h-1.334V3.61l-6.862 6.862-.942-.942Zm5.163 3.827V8.124l1.333-1.361v7.926H1.349V3.977h7.886L7.874 5.311H2.683v8.045h8.009Z"
                      fill="currentColor"
                      fillRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div className="plugin-banner--close-container">
              <button
                aria-label="Close plugin message"
                className="plugin-banner--close"
                data-se="plugin-banner--close"
                onClick={dismissPluginBanner}
              >
                <svg
                  fill="none"
                  height="14"
                  viewBox="0 0 16 16"
                  width="14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M13.704 2.295a1.008 1.008 0 0 0-1.426 0L8 6.574 3.722 2.295a1.008 1.008 0 1 0-1.426 1.427L6.574 8l-4.279 4.278a1.008 1.008 0 1 0 1.426 1.426L8 9.427l4.278 4.279a1.008 1.008 0 1 0 1.427-1.427L9.426 8l4.278-4.278a1.008 1.008 0 0 0 0-1.427z"
                    fill="#212126"
                    fillRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </section>
        )}

        {/* My Apps header */}
        <header
          className="dashboard--sort-apps-header"
          data-se="dashboard-sort-apps-header"
        >
          <h1
            className="dashboard--my-apps-title"
            data-se="dashboard-my-apps-title"
            id="dashboard-my-apps-title"
          >
            My Apps
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Button
              endIcon={<ChevronDownIcon />}
              label="Sort"
              variant="secondary"
            />
            <Button label="Request access" variant="primary" />
          </div>
        </header>

        {/* Work section */}
        <section data-se="dashboard-section">
          <header className="section--header" data-se="section-header">
            <span
              className="section--controls"
              data-se="chiclet-grid-header-controls"
            >
              <button
                aria-label={
                  isWorkSectionExpanded
                    ? "Collapse Work section"
                    : "Expand Work section"
                }
                className="section--collapse-btn"
                data-se="section-toggle"
                onClick={toggleWorkSection}
              >
                <div>
                  <svg
                    fill="none"
                    height="16"
                    style={{
                      transform: isWorkSectionExpanded
                        ? "none"
                        : "rotate(180deg)",
                      transition: "transform 0.2s",
                    }}
                    viewBox="0 0 16 16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M7.54309 7.23955C7.79018 6.97481 8.20982 6.97481 8.45691 7.23955L11.0431 10.0105C11.2902 10.2752 11.7098 10.2752 11.9569 10.0105L11.977 9.98895C12.2011 9.74882 12.2011 9.37618 11.977 9.13605L8.46009 5.36795C8.21183 5.10196 7.78974 5.10342 7.54333 5.37111L4.02817 9.18988C3.80296 9.43454 3.81111 9.81337 4.04663 10.0481V10.0481C4.29458 10.2953 4.6979 10.288 4.93676 10.032L7.54309 7.23955Z"
                      fill="#212126"
                      fillRule="evenodd"
                    />
                    <circle
                      cx="8"
                      cy="8"
                      r="7.25"
                      stroke="#212126"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
                <span data-se="section-label">Work</span>
              </button>
              <button
                aria-label="Rename Work"
                className="section--rename-btn"
                data-se="section-rename"
              >
                <svg
                  fill="none"
                  height="12"
                  viewBox="0 0 12 12"
                  width="12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.5649 1.4178C8.69736 1.28534 8.85461 1.18027 9.02767 1.10858C9.20074 1.0369 9.38623 1 9.57355 1C9.76087 1 9.94636 1.0369 10.1194 1.10858C10.2925 1.18027 10.4497 1.28534 10.5822 1.4178C10.7147 1.55026 10.8197 1.70751 10.8914 1.88057C10.9631 2.05364 11 2.23913 11 2.42645C11 2.61377 10.9631 2.79926 10.8914 2.97233C10.8197 3.14539 10.7147 3.30265 10.5822 3.4351L3.7738 10.2435L1 11L1.75649 8.2262L8.5649 1.4178Z"
                    fill="#1662dd"
                    stroke="#1662dd"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            </span>
          </header>

          {isWorkSectionExpanded && (
            <section>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, 144px)",
                  gap: "24px",
                  padding: "12px 24px",
                }}
              >
                {WORK_APPS.map((app) => (
                  <div
                    className="chiclet--container"
                    draggable={true}
                    key={app.title}
                  >
                    <button
                      aria-label={`launch app ${app.title}`}
                      className="chiclet"
                      data-se="app-card"
                      type="button"
                    >
                      <article className="chiclet--article">
                        <section
                          className="chiclet--main"
                          data-se="app-card-main"
                        >
                          <img
                            alt={app.logoAlt}
                            className="app-logo--image"
                            src={app.logoSrc}
                          />
                        </section>
                        <footer
                          className="chiclet--footer"
                          data-se="app-card-footer"
                        >
                          <span
                            className="chiclet--title"
                            data-se="app-card-title"
                            title={app.title}
                          >
                            {app.title}
                          </span>
                        </footer>
                      </article>
                    </button>
                    <button
                      aria-label={`Settings for ${app.title}`}
                      className="chiclet--action"
                      data-se="app-card-settings-button"
                    >
                      <svg
                        className="chiclet--action-kebab"
                        fill="#B7BCC0"
                        height="4"
                        viewBox="0 0 20 4"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="2" cy="2" r="2" />
                        <circle cx="10" cy="2" r="2" />
                        <circle cx="18" cy="2" r="2" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}
        </section>

        {/* Add section */}
        <div style={{ padding: "0 1.71429rem", marginTop: "1.71429rem" }}>
          <Button
            id="chiclet-area--add-section"
            label="Add section"
            onClick={openCreateSectionDialog}
            startIcon={<AddCircleIcon />}
            variant="secondary"
          />
        </div>
      </section>

      {/* Support footer */}
      <footer className="dashboard--footer" data-se="dashboard-footer">
        <div
          className="dashboard--footer-support-info"
          data-se="footer-support-info"
        >
          <h2
            className="dashboard--footer-support-title"
            data-se="footer-support-title"
          >
            Support
          </h2>
          <span className="footer--help-link" data-se="footer-help-link">
            Help:&nbsp;
            <a
              className="okta-link"
              data-se="footer-support-link"
              href="mailto:ali.parsa@okta.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              ali.parsa@okta.com
              <svg
                className="external-link-icon"
                fill="none"
                height="12"
                viewBox="0 0 16 16"
                width="12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="m5.529 9.529 6.861-6.862H6.667V1.333h6.815c.08 0 .174 0 .258.007.097.008.235.028.38.102a1 1 0 0 1 .438.437c.074.146.094.284.102.381.007.084.007.178.007.258v6.815h-1.334V3.61l-6.862 6.862-.942-.942Zm5.163 3.827V8.124l1.333-1.361v7.926H1.349V3.977h7.886L7.874 5.311H2.683v8.045h8.009Z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </svg>
            </a>
          </span>
        </div>
      </footer>

      {/* Create section dialog */}
      {isCreateSectionDialogOpen && (
        <div className="create-section-overlay">
          <div className="create-section-dialog">
            <h2>Create section</h2>
            <label htmlFor="new-section-name">Section name</label>
            <input
              id="new-section-name"
              onChange={updateNewSectionName}
              type="text"
              value={newSectionName}
            />
            <div className="dialog-actions">
              <button
                className="okta-btn-secondary"
                onClick={closeCreateSectionDialog}
                type="button"
              >
                Cancel
              </button>
              <button
                className="okta-btn-primary"
                onClick={closeCreateSectionDialog}
                type="button"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
