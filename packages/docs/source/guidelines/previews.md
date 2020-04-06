# Previewing changes

**Aspirational. We do not yet do this reliably.**

When users make changes to production orgs in Okta, they need to be able to see the impact of the change before it takes effect. The strategy used will depend on the case. Three cases are discussed below.

Changes to objects
* When: When one or more objects in Okta will be created, updated, or deleted based on a change. e.g. Imports, Provisioning, Mappings, OU changes in AD
* Behavior: Two options
** Summary: Allow a user to see how many objects would be created, updated, and deleted right now if this change were implemented.
** Specific: Allow a user to see what would happen to a specific object if this change were implemented.

Changes to rules or other logic
  
* When: When a policy, rule, or automation is updated, affecting how the system determines what action to take in future situations. e.g. Auth / Sign-on Policies, Group Rules, MFA Policies.
* Behavior: Two options
** Allow the admin to select an object/situation and see what decision would be made
** Allow the admin to see a list of similar recent decisions and the difference between how the current settings and the new settings would evaluate them

Requests sent to other systems
* When: When the primary action affected by the setting is that Okta sends a request or token to an external system. e.g. OAuth tokens, Webhooks, SAML tokens
* Behavior: Allow the user to select an object/situation and see an example of the request that would be generated with the new settings.
