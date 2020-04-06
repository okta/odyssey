# Deletion & deactivation

When things are removed or deactivated in Okta, there is often some impact to other settings. To ensure predicatability and reduce risk, our system behavior should be consistent and conservative with regards to these references. Five cases will be discussed.

## When Settings are removed

Deactivating a setting

* When: There is a high level "Inactive" state, within which sub-settings remain visible. e.g. Setting a policy to be inactive
* Behavior: Save the settings. Any direct or indirect changes to the sub-settings should simply happen, with no validation until the setting is reactivated.
* Notes: The addition of an active/inactive state toggle implies that we expect settings will need to be reviewed and configured before becoming active or that they will need to be toggled frequently. The settings continue to be visible, reducing the chance that a future user will assume they are brand new (and therefore default settings).  

Hiding a setting

* When: A setting is toggled, causing sub-settings to be hidden. e.g. When unchecking App requests, all the related settings disappear.
* Behavior: On the backend, we will save the settings. This matches our API standard of non-destruction and allows the old settings to be queried via the API. However, when the setting is turned back on, it should be in a default state.
* Notes: Our reasoning is that when something new appears in the UI, it is reasonable to assume that it is in a default state. Because it could be dangerous to reinstate something with non-default settings, Okta should revert settings back to our best practice default. If we expect frequent on/off behavior, we should use an activation state.

## When Objects are removed

Deleting an object that is depended upon by something else

* Example: Removing a user who is the only approver on an approval workflow.
* Behavior: Warn them about any things that will break, but don't stop them from removing the item. Log the warning, including the list of things that would break, to the Syslog.
* Notes: When a change would break something, we should communicate that clearly. However, the change being made may be time sensitive (and more important than the impact of whatever will break). Therefore, we should help the user prevent and deal with the impact of their action, but we shouldn't stop them.

Deleting an object when there are other things that only exist to service the deleted object

* Example: Removing a group when it's the only group a group rule assigns to.
* Behavior: Keep the other item in a deactivated state. No warning.
* Notes: No harm is caused by leaving an inactive or useless policy/rule/other item. However, the logic contained in it might still have an intended use or be useful for some reason. We should let admins clean these items up manually.

Deleting an object that is referenced by something else but can work without it

* Example: Removing a group that is one of the groups used to apply a policy.
* Behavior: Silently remove the referenced object.
* Notes: Here nothing breaks and nothing is left in an odd or unuseful state. It is okay to silently clean up references to the object which no longer exists.
