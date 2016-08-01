# Dynamic-link
[![Dependency Status](https://david-dm.org/asross/dynamic-link.svg)](https://david-dm.org/asross/dynamic-link)
[![Build Status](https://api.travis-ci.org/asross/dynamic-link.svg?branch=master)](https://travis-ci.org/asross/dynamic-link)

Demo: [http://asross.github.io/dynamic-link/](http://asross.github.io/dynamic-link/)

`dynamic-link` is an alternative to the `link-to` helper that provides more
flexibility for dynamic parameters, including actions and literal hrefs.

## Installation

To install, run:
```
ember install dynamic-link
```

## Usage

`dynamic-link` accepts parameters for `route`, `action`, `model`, `models`,
`queryParams`, and `href`. It uses these parameters to generate the `<a>` tag's
`href` and determine what happens when it is clicked.

It also supports the html attributes `title`, `rel`, `target`, and `class`
either directly or via `className`.

This is helpful, for example, when implementing breadcrumbs or navbars, with
lists of links that freely mix Ember routes, actions, and literal hrefs:

```js
// .js
export default Ember.Controller.extend({
  editMode: false,
  currentUser: null,

  linkBar: Ember.computed('editMode', 'currentUser', function() {
    if (this.get('editMode')) {
      return [
        { action: 'cancelEdit', className: 'cancel-link', text: 'Cancel' },
        { action: 'saveChanges', className: 'submit-link', text: 'Done' }
      ];
    } else {
      return [{
        href: 'https://corporate-site.com',
        target: '_blank',
        text: 'Home'
      }, {
        route: this.get('currentUser') ? 'user.edit' : 'sign-in',
        model: this.get('currentUser'),
        text: this.get('currentUser') ? 'Edit Profile' : 'Sign In',
        queryParams: this.get('currentUser') ? null : { foo: 'bar' }
      }];
    }
  })
});
```

```hbs
{{!-- .hbs --}}
{{#each linkParams in linkBar}}
  {{#dynamic-link params=linkParams}}
    {{linkParams.text}}
  {{/dynamic-link}}
{{/each}}
```

This will produce either

```html
<a href='#' class='cancel-link'>Cancel</a>
<a href='#' class='submit-link'>Done</a>
```

if `editMode` is true, or else

```html
<a href='https://corporate-site.com' target='_blank'>Home</a>
<a href='/users/1/edit'>Edit Profile</a>
```

if `currentUser` is present (with an `id` of 1), or else

```html
<a href='https://corporate-site.com' target='_blank'>Home</a>
<a href='/sign_in?foo=bar'>Sign In</a>
```

Clicking the route-based links will transition the route without refreshing the
page, while clicking action links will bubble actions properly. Literal links
will work normally.

### Passing Params Directly

Note that in addition to being able to pass all of these parameters in via the
`params` object, you can also pass them in directly:

```hbs
{{dynamic-link route=someRoute model=someModel queryParams=someQueryParams}}
```

If any of the parameters are falsey, they will be ignored.

### Multiple Dynamic Segments

You can use `dynamic-link` with multiple dynamic segments by passing in an
array of models and/or ids to `model` or `params.model`. For example,

```js
export default Ember.Controller.extend({
  commentLinkParams: Ember.computed('photo.comment', function() {
    if (this.get('photo.comment')) {
      return {
        route: 'photo.comment.edit',
        model: [this.get('photo'), this.get('photo.comment')],
        text: 'Edit Comment'
      };
    } else {
      return {
        route: 'photo.comments.new',
        model: this.get('photo'),
        text: 'Add Comment'
      };
    }
  });
});
```

```hbs
{{#dynamic-link params=commentLinkParams}}
  {{commentLinkParams.text}}
{{/dynamic-link}}
```

might produce

```html
<a href="/photos/1/comments/2/edit">Edit Comment</a>
```

or just

```html
<a href="/photos/1/comments/new">Add Comment</a>
```

### Active Class

Route-based `dynamic-link`s have basic support for automatically adding the
`'active'` class to the `<a>` tag if their parameters match the current route.
You can customize the class name by passing a string to `activeClass` or
`params.activeClass`, and you can also set a default for all `dynamic-link`s by
reopening the component and overriding `defaultActiveClass`.

If you don't wish to apply any class at all, you can pass `activeClass=false`
to a particular link or set `defaultActiveClass: false` on the component.

If you want to customize how `dynamic-link` decides when the active class
should be added, you can pass a property to `activeWhen`/`params.activeWhen`:

```hbs
{{#dynamic-link activeWhen=sortDescending activeClass='highlight' action=makeSortAscending}}
  Sort ascending
{{/dynamic-link}}
```

## Running Tests

* `git clone git@github.com:asross/dynamic-link.git`
* `npm install && bower install`
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
